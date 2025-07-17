import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true //쿠키 공유
});

//요청 인터셉터
//API 요청을 서버로 보내기 전에 실행
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    //토큰이 존재하면 요청 헤더에 accessToken 추가
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

//응답 인터셉터
//서버로부터 응답을 받은 후 실행
axiosInstance.interceptors.response.use(
  (response) => response, //정상적인 응답 반환
  async (error) => { 

    //원본 요청 객체를 가져옴
    const originalRequest = error.config;
    
    //오류 응답이 401 상태코드이고, 해당 요청이 재시도되지 않았다면 새 토큰을 신청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //새 토큰 요청하는 로직 실행
        const res = await axios.post(
          process.env.REACT_APP_API_BASE_URL + 'reissue',
          {},
          { withCredentials: true }
        );

        //새 토큰 저장
        const newToken = res.headers['authorization']?.replace('Bearer ', '');
        if (newToken) {
          localStorage.setItem('accessToken', newToken);

          //수정된 원본 요청으로 API 호출 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem('accessToken');
        alert('다시 로그인 하시길 바랍니다.')
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
