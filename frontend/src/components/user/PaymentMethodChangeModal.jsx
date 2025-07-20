import React, { useState } from 'react';
import { paymentService } from '../../api/payment/paymentService';
import '../../styles/user/PaymentMethodChangeModal.css'; // 스타일 파일

const PaymentMethodChangeModal = ({
    isOpen,
    onClose,
    onSuccess,
    userInfo,
    currentSubscription
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1); // 1: 안내, 2: 카드 등록 중, 3: 완료

    const handleChangePaymentMethod = async () => {
        try {
            setLoading(true);
            setError(null);
            setStep(2);

            // 1. 아임포트 초기화
            await paymentService.initializePayment();

            // 2. 새로운 빌링키 발급을 위한 카드 등록 데이터 생성
            const newBillingKeyData = paymentService.createBillingKeyData({
                userId: userInfo.userId,
                email: userInfo.email,
                name: userInfo.name
            });

            console.log('새 빌링키 발급 요청:', newBillingKeyData);

            // 3. 새로운 카드로 빌링키 발급
            const billingResponse = await paymentService.registerCard(newBillingKeyData);

            if (!billingResponse.success) {
                throw new Error(billingResponse.error_msg || '카드 등록에 실패했습니다.');
            }

            console.log('빌링키 발급 성공:', billingResponse);

            // 4. 백엔드에 결제 수단 변경 요청
            await onSuccess(newBillingKeyData.customer_uid);

            setStep(3);
            setTimeout(() => {
                onClose();
                setStep(1);
            }, 2000);

        } catch (err) {
            console.error('결제 수단 변경 실패:', err);
            setError(err.message || '결제 수단 변경에 실패했습니다.');
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content payment-method-modal">
                <div className="modal-header">
                    <h3>결제 수단 변경</h3>

                </div>

                <div className="modal-body">
                    {step === 1 && (
                        <div className="step-content">
                            <div className="info-section">
                                <h4>💳 새로운 카드 등록</h4>
                                <p>새로운 결제 수단으로 변경하시겠습니까?</p>
                                <div className="current-card-info">
                                    <p><strong>현재 구독:</strong> SlowEat Premium</p>
                                    <p><strong>월 요금:</strong> 9900원</p>
                                </div>
                                <div className="notice">
                                    <p>⚠️ <strong>주의사항</strong></p>
                                    <ul>
                                        <li>새로운 카드로 1원 테스트 결제 후 즉시 취소됩니다</li>
                                        <li>기존 카드 정보는 안전하게 삭제됩니다</li>
                                        <li>다음 결제일부터 새로운 카드로 결제됩니다</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content loading-step">
                            <div className="loading-animation">
                                <div className="spinner"></div>
                                <h4>카드 정보 등록 중...</h4>
                                <p>카드 정보를 안전하게 등록하고 있습니다.</p>
                                <p className="sub-text">잠시만 기다려 주세요.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content success-step">
                            <div className="success-animation">
                                <div className="success-icon">✅</div>
                                <h4>변경 완료!</h4>
                                <p>결제 수단이 성공적으로 변경되었습니다.</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {step === 1 && (
                        <>
                            <button
                                className="cancel-btn"
                                onClick={onClose}
                                disabled={loading}
                            >
                                취소
                            </button>
                            <button
                                className="confirm-btn"
                                onClick={handleChangePaymentMethod}
                                disabled={loading}
                            >
                                {loading ? '처리 중...' : '카드 변경하기'}
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <p className="loading-text">결제 창이 열리면 새로운 카드 정보를 입력해주세요.</p>
                    )}
                    {step === 3 && (
                        <button
                            className="confirm-btn"
                            onClick={onClose}
                        >
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PaymentMethodChangeModal;