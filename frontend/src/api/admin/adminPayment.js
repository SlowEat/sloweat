import axiosInstance from "../axiosInstance";

// 결제 내역 조회 API
export const fetchAdminPayments = async ({
  nickname,
  status,
  page,
  size = 10,
}) => {
  const response = await axiosInstance.get("api/admin/payments", {
    params: { nickname, status, page, size },
  });
  return response.data;
};

// 환불 반려 처리 API
export const rejectRefundBySubscriptionId = async (subscriptionId) => {
  await axiosInstance.patch(`api/admin/payments/${subscriptionId}/reject`);
};

// 환불 승인 처리 API
export const approveRefundBySubscriptionId = async (subscriptionId) => {
  await axiosInstance.patch(`/api/payments/${subscriptionId}/refund/approve`);
};
