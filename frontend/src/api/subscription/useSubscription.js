import { useState, useEffect } from 'react';
import { subscriptionApi } from './subscriptionApi';

export const useSubscription = (userId, autoFetch = true) => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 구독 정보 조회
    const fetchSubscription = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            setError(null);
            const data = await subscriptionApi.getSubscription();
            setSubscription(data);
            console.log("구독정보:" , data);
        } catch (err) {
            setError(err.message);
            setSubscription(null);
        } finally {
            setLoading(false);
        }
    };

    // 구독 생성
    const createSubscription = async (subscriptionData) => {
        try {
            setLoading(true);
            setError(null);
            const newSubscription = await subscriptionApi.createSubscription(userId, subscriptionData);
            setSubscription(newSubscription);
            return newSubscription;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 구독 갱신
    const renewSubscription = async () => {
        if (!subscription) return;

        try {
            setLoading(true);
            setError(null);
            const renewedSubscription = await subscriptionApi.renewSubscription(subscription.subscriptionId);
            setSubscription(renewedSubscription);
            return renewedSubscription;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 구독 취소
    const cancelSubscription = async () => {
        if (!subscription) return;

        try {
            setLoading(true);
            setError(null);
            const cancelledSubscription = await subscriptionApi.cancelSubscription(subscription.subscriptionId);
            setSubscription(cancelledSubscription);
            return cancelledSubscription;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 구독 상태 확인
    const isActive = subscription?.status === 'ACTIVE';
    const isCancelled = subscription?.status === 'CANCEL';
    const isExpired = subscription?.status === 'EXPIRE';

    // 다음 결제일 포맷팅
    const getNextBillingDate = () => {
        if (!subscription?.endDate) return null;
        return new Date(subscription.endDate).toLocaleDateString('ko-KR');
    };

    // 구독 상태 라벨
    const getStatusLabel = () => {
        return subscription?.statusLabel || '구독 없음';
    };

     useEffect(() => {
            if (autoFetch && userId) {
                fetchSubscription();
            }
        }, [userId, autoFetch]);

    return {
        subscription,
        loading,
        error,
        isActive,
        isCancelled,
        isExpired,
        createSubscription,
        renewSubscription,
        cancelSubscription,
        refreshSubscription: fetchSubscription,
        getNextBillingDate,
        getStatusLabel,
    };
};