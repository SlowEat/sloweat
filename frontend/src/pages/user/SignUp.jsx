import React, { useState } from 'react';
import './SignUp.css';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-view">
        <div className="signup-overlap">
        <header className="signup-header">
            <div className="logo-container">
              <div className="SLOWEAT-LOGO" role="img" aria-label="SLOWEAT 로고"></div>
              <p className="tagline">건강한 요리, 저속 노화의 시작</p>
            </div>
          </header>
          <section className="signup-form">
            <h1 className="signup-title">회원가입</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">이메일 *</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  placeholder="4자 이상" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">비밀번호 *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input"
                    placeholder="영문, 숫자 포함 8자 이상"
                    required
                  />
                  <img
                    className="password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">비밀번호 확인 *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="form-input"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                  <img
                    className="password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/----.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="nickname" className="form-label">닉네임 *</label>
                <input 
                  type="text" 
                  id="nickname" 
                  className="form-input" 
                  placeholder="닉네임을 입력하세요" 
                  required 
                />
                <p className="form-hint">2-20자, 한글/영문/숫자 사용 가능</p>
              </div>
              <button type="submit" className="submit-button">회원가입</button>
            </form>
            <p className="login-link">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
            <hr className="divider" />
            <div className="social-login">
              <img
                src="https://c.animaapp.com/CgKu8nvQ/img/-----@2x.png"
                alt="소셜 로그인 옵션"
                className="social-login-options"
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  
  );
}

export default Signup;
