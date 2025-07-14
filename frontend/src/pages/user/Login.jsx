import { useState } from 'react';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login-container" data-model-id="19:12">
      <div className="login-wrapper">
        <div className="login-content">
          <header className="logo-container">
            <img src="https://c.animaapp.com/JlqecQMn/img/sloweat-logo-1@2x.png" alt="Slow Eat 로고" className="login-logo" />
            <p className="slogan">건강한 요리, 저속 노화의 시작</p>
          </header>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  aria-label="비밀번호 보기"
                  onClick={togglePasswordVisibility}
                >
                  <img 
                    src="https://c.animaapp.com/JlqecQMn/img/----.svg" 
                    alt="비밀번호 보기" 
                    className="eye-icon" 
                  />
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">로그인</button>
            <div className="login-options">
              <a href="#" className="option-link">아이디 찾기</a> | <a href="#" className="option-link">비밀번호 찾기</a> |
              <a href="/signup" className="option-link">회원가입</a>
            </div>
          </form>
          <div className="social-login">
            <hr className="divider" />
            <a href="#" className="kakao-login">
              <img src="https://c.animaapp.com/JlqecQMn/img/------@2x.png" alt="카카오 로그인" className="kakao-button" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
