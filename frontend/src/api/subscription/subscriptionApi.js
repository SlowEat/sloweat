// src/api/subscriptionApi.js
import axiosInstance from '../axiosInstance';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/';

export const subscriptionApi = {
    // 구독 생성 (결제 포함)
    createSubscription: async (userId, subscriptionData) => {
        const response = await axiosInstance.post(`api/users/${userId}/subscription`, subscriptionData);
        return response.data;
    },

    // 활성 구독 조회
    getSubscription: async () => {
        const response = await axiosInstance.get(`api/subscription/active`);
        return response.data;
    },
    // 유저 정보 반환
    getSubscriptionUser: async () => {
        const response = await axiosInstance.get(`api/subscription/me`);
        return response.data;
    },
    // 구독 갱신
    renewSubscription: async (subscriptionId) => {
        const response = await axiosInstance.patch(`/subscription/${subscriptionId}/renew`);
        return response.data;
    },

    // 구독 취소
    cancelSubscription: async (subscriptionId) => {
        const response = await axiosInstance.patch(`api/subscription/${subscriptionId}/cancel`);
        return response.data;
    },

    // 사용자의 구독 조회
    getUserActiveSubscription: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}/subscription/active`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // 활성 구독이 없는 경우
            }
            throw error;
        }
    }
};