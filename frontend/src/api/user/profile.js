//개인정보(profile) 관련 api
import axiosInstance from "../axiosInstance";

//내 프로필 가져오기
//GET api/users/me/profile
export const getMyProfile = async () => {
  return axiosInstance.get('api/users/me/profile');
};

//개인정보 변경
//POST api/users/me/profile
export const editMyProfile = async (requestDTO) => {
  return axiosInstance.patch('api/users/me/profile',requestDTO)
}

//비밀번호 변경
export const changePassword = async (requestDTO) => {
  return axiosInstance.patch('api/users/me/password',requestDTO)
}