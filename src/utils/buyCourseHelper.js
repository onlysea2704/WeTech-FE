import { authAxios } from "../services/axios-instance";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";

export const useBuyCourse = () => {
    const navigate = useNavigate();
    const { showError } = useNotification();

    const handleBuyNow = async (courseDetail) => {
        const payload = {
            transaction: {
                transferAmount: courseDetail?.salePrice,
                code: "WT" + Date.now(),
            },
            listItems: [
                {
                    idCourse: courseDetail?.courseId,
                    typeItem: "COURSE",
                },
            ],
        };

        try {
            const res = await authAxios.post("/payment/create", payload);
            console.log(res.data);
            if (res.data?.idTransaction) {
                navigate(`/register-payment/${res.data?.idTransaction}`);
            } else {
                showError("Có lỗi xảy ra khi tạo thanh toán.");
            }
        } catch (error) {
            console.error(error);
            showError("Có lỗi xảy ra khi tạo thanh toán.");
        }
    };

    return { handleBuyNow };
};
