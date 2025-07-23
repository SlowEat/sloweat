import axiosInstance from "../axiosInstance";

export const fetchAdminStatistics = async () => {
  const response = await axiosInstance.get("api/admin/statistics");
  return response.data;
};
