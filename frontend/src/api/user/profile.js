//profile 관련 api
import axiosInstance from "../axiosInstance";

//내 프로필 가져오기
//api/users/me/profile
export const getMyProfile = async () => {
  return axiosInstance.get('api/users/me/profile');
};