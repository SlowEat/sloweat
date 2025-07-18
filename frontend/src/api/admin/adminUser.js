import axiosInstance from "../axiosInstance";

// 유저 목록 조회 (검색, 상태 필터링, 페이징 포함)
export const fetchAdminUsers = async ({
  nickname,
  status,
  page = 0,
  size = 10,
}) => {
  const response = await axiosInstance.get(`/api/admin/users`, {
    params: { nickname, status, page, size },
  });
  return response.data; // Page<AdminUserResponse>
};

// 단일 유저 상세 조회
export const fetchAdminUserById = async (userId) => {
  const response = await axiosInstance.get(`/api/admin/users/${userId}`);
  return response.data; // AdminUserResponse
};

// 유저 정지 (ban)
export const banAdminUser = async (userId) => {
  await axiosInstance.patch(`/api/admin/users/${userId}/ban`);
};

// 유저 탈퇴 처리 (withdraw)
export const withdrawAdminUser = async (userId) => {
  await axiosInstance.patch(`/api/admin/users/${userId}/withdraw`);
};

// 유저 활성화 (activate)
export const activateAdminUser = async (userId) => {
  await axiosInstance.patch(`/api/admin/users/${userId}/activate`);
};
