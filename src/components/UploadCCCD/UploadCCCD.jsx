import React, { useState, useRef } from 'react';
import styles from './UploadCCCD.module.css';
import imageIcon from '../../assets/image-icon.png';
import uploadIcon from '../../assets/upload-icon.png'
import plusIcon from '../../assets/Plus_perspective_matte.png'

export default function UploadCCCD({ onComplete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Front, 2: Back, 3: Review

    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);

    const [tempFrontFile, setTempFrontFile] = useState(null);
    const [tempBackFile, setTempBackFile] = useState(null);
    const [tempFrontPreview, setTempFrontPreview] = useState(null);
    const [tempBackPreview, setTempBackPreview] = useState(null);

    const fileInputRef = useRef(null);

    const isCompleted = frontFile && backFile;

    const handleOpen = () => {
        setIsOpen(true);
        // Bắt đầu lại từ đầu
        setStep(1);
        setTempFrontFile(null);
        setTempBackFile(null);
        setTempFrontPreview(null);
        setTempBackPreview(null);
    };

    const handleClose = () => setIsOpen(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        if (step === 1) {
            setTempFrontFile(file);
            setTempFrontPreview(previewUrl);
        } else if (step === 2) {
            setTempBackFile(file);
            setTempBackPreview(previewUrl);
        }

        // Reset the value so we can select the same file again if needed
        e.target.value = null;
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleConfirmStep = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleExtract = () => {
        setFrontFile(tempFrontFile);
        setBackFile(tempBackFile);
        setFrontPreview(tempFrontPreview);
        setBackPreview(tempBackPreview);

        if (onComplete) {
            onComplete(tempFrontFile, tempBackFile);
        }
        handleClose();
    };

    const currentPreview = step === 1 ? tempFrontPreview : tempBackPreview;

    return (
        <div className={styles.uploadCCCDContainer}>
            {/* Main Trigger UI */}
            <div className={styles.imageUploadColumn}>
                <div className={styles.uploadBox}>
                    {frontPreview ? (
                        <img src={frontPreview} alt="Mặt trước CCCD" className={styles.previewImg} />
                    ) : (
                        <span>
                            <img src={imageIcon} alt="Upload" className={styles.uploadIcon} />
                            Mặt trước
                        </span>
                    )}
                </div>
                <div className={styles.uploadBox}>
                    {backPreview ? (
                        <img src={backPreview} alt="Mặt sau CCCD" className={styles.previewImg} />
                    ) : (
                        <span>
                            <img src={imageIcon} alt="Upload" className={styles.uploadIcon} />
                            Mặt sau
                        </span>
                    )}
                </div>
                {isCompleted ? (
                    <button type="button" className={styles.uploadButton} onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8.0625 7.68647L12 3.75L15.9375 7.68647" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 14.2492V3.75195" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> Cập nhật ảnh
                    </button>
                ) : (
                    <button type="button" className={styles.uploadButton} onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8.0625 7.68647L12 3.75L15.9375 7.68647" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 14.2492V3.75195" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> Photo CCCD
                    </button>
                )}
            </div>

            {/* Popup Modal */}
            {isOpen && (
                <div className={styles.modalOverlay} onClick={handleClose}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Trích xuất thông tin từ CCCD</h2>
                            <button type="button" className={styles.closeButton} onClick={handleClose}>
                                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            {step < 3 ? (
                                currentPreview ? (
                                    <div className={styles.popupPreviewContainer}>
                                        <div className={styles.dottedBox} style={{ border: 'none', background: 'none', height: 'auto', marginBottom: 0 }}>
                                            <img src={currentPreview} alt="Preview" className={styles.popupPreviewImg} />
                                        </div>
                                        <div className={styles.actionRow}>
                                            <button type="button" className={styles.actionButton} onClick={triggerFileInput}>
                                                Tải lại
                                            </button>
                                            <button type="button" className={styles.actionButtonPrimary} onClick={handleConfirmStep}>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.dottedBox}>
                                            <img src={imageIcon} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                                            <span className={styles.boxText}>{step === 1 ? 'Mặt trước' : 'Mặt sau'}</span>
                                        </div>
                                        <h3 className={styles.blueHeading}>Tải lên ảnh CCCD (Vneid) ở đây!</h3>
                                        <p className={styles.mutedText}>Vui lòng tải ảnh rõ nét từ Vneid</p>
                                        <p className={styles.mutedTextSmall}>Kích thước tối đa của một tập tin là <span className={styles.boldText}>5 MB</span></p>
                                        <button type="button" className={styles.actionButton} onClick={triggerFileInput}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M8.0625 7.68647L12 3.75L15.9375 7.68647" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 14.2492V3.75195" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25" stroke="#1B154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg> Photo CCCD
                                        </button>
                                    </>
                                )
                            ) : (
                                <div className={styles.reviewContainer}>
                                    <div className={styles.reviewImages}>
                                        <div>
                                            <p>Mặt trước</p>
                                            <img src={tempFrontPreview} alt="Mặt trước" className={styles.reviewImg} />
                                        </div>
                                        <div>
                                            <p>Mặt sau</p>
                                            <img src={tempBackPreview} alt="Mặt sau" className={styles.reviewImg} />
                                        </div>
                                    </div>
                                    <button type="button" className={styles.actionButton} onClick={handleExtract}>
                                        <img src={plusIcon} alt="" />
                                        Nhập thông tin
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                key={step} // reset input for each step
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

