import axiosInstance from './axiosInstance';

// 팔로우 요청
export const follow = (targetUserId) => {
  return axiosInstance.post(`/api/follow/${targetUserId}`);
};

// 언팔 요청
export const unfollow = (targetUserId) => {
  return axiosInstance.delete(`/api/follow/${targetUserId}`);
};
