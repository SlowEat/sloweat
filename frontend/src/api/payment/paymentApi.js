// src/api/paymentApi.js
import axiosInstance from '../axiosInstance';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/';

export const paymentApi = {
    // 결제 내역 상세 조회
    getPayment: async (paymentId) => {
        const response = await axiosInstance.get(`/api/payments/${paymentId}`);
        return response.data;
    },

    // 사용자별 결제 내역 조회
    getPaymentsByUser: async (userId) => {
        const response = await axiosInstance.get(`/api/payments/user/${userId}`);
        return response.data;
    },

    // 결제 환불 요청
    requestRefund: async (paymentId, refundReason) => {
        const response = await axiosInstance.post(`/api/payments/${paymentId}/refund`, {
            refundReason: refundReason
        });
        return response.data;
    },

    // 환불 승인 처리 (관리자용)
    approveRefund: async (paymentId) => {
        const response = await axiosInstance.patch(`/api/payments/${paymentId}/refund/approve`);
        return response.data;
    },

    // 환불 거부 처리 (관리자용)
    rejectRefund: async (paymentId, rejectReason) => {
        const response = await axiosInstance.patch(`/api/payments/${paymentId}/refund/reject`, {
            refundReason: rejectReason
        });
        return response.data;
    }
};