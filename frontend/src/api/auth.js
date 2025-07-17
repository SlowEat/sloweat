//auth 관련 api
import axios from 'axios';

//api/auth/check-email
export const checkEmail = async (email) => {
 return axios.get(`${process.env.REACT_APP_API_BASE_URL}api/auth/check-email`, {
    params: { email },
  });
};

//api/auth/check-nickname
export const checkNickname = (nickname) =>
  axios.get(`${process.env.REACT_APP_API_BASE_URL}api/auth/check-nickname`, {
    params: { nickname },
  });

//api/auth/signup
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

  //api/auth/login
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