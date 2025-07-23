//auth 관련 api
import axios from 'axios';
import axiosInstance from '../axiosInstance';

//이메일 중복 체크
export const checkEmail = async (email) => {
 return axios.get(`${process.env.REACT_APP_API_BASE_URL}api/auth/check-email`, {
    params: { email },
  });
};

//닉네임 중복체크
export const checkNickname = (nickname) =>
  axios.get(`${process.env.REACT_APP_API_BASE_URL}api/auth/check-nickname`, {
    params: { nickname },
  });

//회원가입
export const signup = (email, password, passwordConfirm, nickname) =>
  axios.post(
    `${process.env.REACT_APP_API_BASE_URL}api/auth/signup`,
    {
      email,
      password,
      passwordConfirm,
      nickname,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  //로그인
  export const login = async (localEmail, password) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}login`,
    { localEmail, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

//로그아웃
export const logout = async () => {
  return axiosInstance.post('logout');
};


//비밀번호 변경
export const changePassword = async (requestDTO) => {
  return axiosInstance.patch('api/users/me/password',requestDTO)
}