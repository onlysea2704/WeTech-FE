import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ProcedurePayment.module.css";
import { authAxios, publicAxios } from "@/services/axios-instance";
import usePaymentSocket from "@/services/usePaymentSocket";
import PaymentQRCard from "@/components/PaymentQRCard/PaymentQRCard";
import { useAuth } from "@/context/AuthContext";

export default function ProcedurePayment({ procedure, onPaymentSuccess }) {
    const { user: auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [transactionInfo, setTransactionInfo] = useState(null);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600);
    const qrCardRef = useRef(null);

    const totalAmount = procedure?.salePrice || 0;
    const userId = auth?.userId;

    // Socket: show success popup via PaymentQRCard ref
    const handleSocketMessage = useCallback(() => {
        qrCardRef.current?.triggerSuccess();
    }, []);
    usePaymentSocket(userId, handleSocketMessage);

    // TEST: Enter key triggers success popup (for testing payment flow)
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Enter") {
                qrCardRef.current?.triggerSuccess();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Countdown – starts once transaction is created
    useEffect(() => {
        if (!transactionInfo) return;
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [transactionInfo, timeLeft]);

    // Fetch user info then create transaction once on mount
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            setError(null);
            try {
                const fullName = auth?.fullname || "";
                const email = auth?.email || "";
                const phone = auth?.sdt || auth?.phone || "";

                const payload = {
                    transaction: {
                        transferAmount: totalAmount,
                        code: "WT" + Date.now(),
                        fullName,
                        email,
                        phone,
                    },
                    listItems: [
                        {
                            idProcedure: procedure.procedureId,
                            typeItem: "PROCEDURE",
                        },
                    ],
                };
                const createRes = await authAxios.post("/payment/create", payload);
                const txData = createRes.data;
                if (txData) {
                    setTransactionInfo({
                        idTransaction: txData.idTransaction,
                        amount: txData.transferAmount || totalAmount,
                        code: txData.code,
                        fullName,
                        email,
                        phone,
                    });
                } else {
                    setError("Không thể tạo giao dịch. Vui lòng thử lại.");
                }
            } catch (err) {
                console.error("ProcedurePayment error:", err);
                setError("Có lỗi xảy ra khi khởi tạo thanh toán.");
            } finally {
                setLoading(false);
            }
        };
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Returns true/false – PaymentQRCard shows popup internally
    const handleCheckTransaction = async () => {
        if (!transactionInfo?.idTransaction) return false;
        try {
            const res = await publicAxios.get(`/payment/get?idTransaction=${transactionInfo.idTransaction}`);
            console.log(res.data);
            return res.data?.status === "SUCCESS";
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    if (loading) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.pageTitle}>Vui lòng thanh toán để xuất file và nộp hồ sơ!</div>
                <div className={styles.loadingBox}>
                    <div className={styles.spinner} />
                    <p>Đang khởi tạo giao dịch...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.pageTitle}>Vui lòng thanh toán để xuất file và nộp hồ sơ!</div>
                <div className={styles.errorBox}>{error}</div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageTitle}>Vui lòng thanh toán để xuất file và nộp hồ sơ!</div>
            <PaymentQRCard
                ref={qrCardRef}
                amount={transactionInfo.amount}
                code={transactionInfo.code}
                txDetails={transactionInfo}
                timeLeft={timeLeft}
                onCheckTransaction={handleCheckTransaction}
                onPaymentSuccess={onPaymentSuccess}
            />
        </div>
    );
}
