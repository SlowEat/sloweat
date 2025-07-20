const imp_init = process.env.REACT_APP_IMP_INIT;
const IMP_PG = 'tosspayments';
export const paymentService = {
    // 아임포트 결제 초기화
    initializePayment: () => {
        return new Promise((resolve, reject) => {
            // 이미 로드된 경우 바로 초기화
            if (window.IMP) {
                window.IMP.init(imp_init);
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.iamport.kr/v1/iamport.js';
            script.onload = () => {
                if (window.IMP) {
                    console.log('IMP init 값:', imp_init);
                    window.IMP.init(imp_init);
                    resolve();
                } else {
                    reject(new Error('아임포트 스크립트를 로드할 수 없습니다.'));
                }
            };
            script.onerror = () => {
                reject(new Error('아임포트 스크립트 로드 실패'));
            };
            document.head.appendChild(script);
        });
    },

    // 빌링키 발급을 위한 카드 등록 (수정된 버전)
    registerCard: (cardData) => {
        return new Promise((resolve, reject) => {
            if (!window.IMP) {
                reject(new Error('아임포트가 초기화되지 않았습니다.'));
                return;
            }

            console.log('빌링키 요청 customer_uid:', cardData.customer_uid);

            const requestData = {
                pg: IMP_PG,
                pay_method: 'card',
                merchant_uid: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: '카드 등록 (빌링키 발급)',
                amount: 0, // 빌링키 발급은 0원
                customer_uid: cardData.customer_uid,
                buyer_email: cardData.email,
                buyer_name: cardData.name,

                // 추가 설정으로 간편결제 비활성화
                card: {
                    direct: {
                        code: null,
                        quota: null
                    }
                },
                // 모바일에서 리다이렉트 설정
                m_redirect_url: `${window.location.origin}/payment/callback`,
                // 추가 파라미터로 빌링키 발급임을 명시
                custom_data: {
                    subscription: true,
                    billing_key: true
                }
            };

            console.log('빌링키 요청 정보:', requestData);

            window.IMP.request_pay(requestData, (response) => {
                console.log('빌링키 발급 응답:', response);

                if (response.success) {
                    resolve(response);
                } else {
                    reject(new Error(response.error_msg || '카드 등록에 실패했습니다.'));
                }
            });
        });
    },

    // 일회성 결제 (일반 결제용)
    requestPayment: (paymentData) => {
        return new Promise((resolve, reject) => {
            if (!window.IMP) {
                reject(new Error('아임포트가 초기화되지 않았습니다.'));
                return;
            }

            window.IMP.request_pay(paymentData, (response) => {
                console.log('결제 응답:', response);
                if (response.success) {
                    resolve(response);
                } else {
                    reject(new Error(response.error_msg || '결제에 실패했습니다.'));
                }
            });
        });
    },

    // 결제 정보 생성 헬퍼 (빌링키 발급용)
    createBillingKeyData: (userInfo) => {
        const customerUid = `customer_${userInfo.userId}_${Date.now()}`;

        return {
            customer_uid: customerUid,
            buyer_email: userInfo.email,
            buyer_name: userInfo.name
        };
    },

    // 일반 결제 정보 생성 헬퍼
    createPaymentData: (userInfo, amount = 0, orderName = 'SlowEat Premium 구독') => {
        const merchantUid = `merchant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        return {
            pg: IMP_PG, // 테스트용
            pay_method: 'card',
            merchant_uid: merchantUid,
            name: orderName,
            amount: amount,
            buyer_email: userInfo.email,
            buyer_name: userInfo.name,
            buyer_tel: userInfo.phone || '010-0000-0000',
            m_redirect_url: `${window.location.origin}/payment/callback`,
        };
    },

    // 결제 검증 (백엔드에서 아임포트 API로 실제 결제 정보 확인)
    verifyPayment: async (imp_uid, merchant_uid) => {
        try {
            // 이 부분은 보안상 백엔드에서 처리해야 합니다
            // 프론트엔드에서는 단순히 결제 성공 여부만 확인
            return {
                success: true,
                imp_uid: imp_uid,
                merchant_uid: merchant_uid
            };
        } catch (error) {
            console.error('결제 검증 실패:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};