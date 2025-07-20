import { useState } from 'react';
import { login } from '../../api/user/auth';
import './Login.css';

function Login() {
 
  const [showPassword, setShowPassword] = useState(false);
  const [localEmail, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //비밀번호 보호
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //로그인
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await login(localEmail, password);

    const accessToken = response.headers['authorization']?.replace('Bearer ', '');
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      alert('로그인 성공!');
      window.location.href = '/';
    } else {
      alert('accessToken을 받지 못했습니다.');
    }
  } catch (err) {
    console.error('로그인 실패', err);
    alert('로그인에 실패했습니다.');
  }
};

  return (
    <main className="login-container" data-model-id="19:12">
      <div className="login-wrapper">
        <div className="login-content">
          <header className="logo-container">
            <img src="https://c.animaapp.com/JlqecQMn/img/sloweat-logo-1@2x.png" alt="Slow Eat 로고" className="login-logo" />
            <p className="slogan">건강한 요리, 저속 노화의 시작</p>
          </header>

          <form className="login-form" onSubmit={handleLogin}>
            {/* 아이디 입력(localEmail) */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            {/* 비밀번호 입력(password) */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기" 
                    className="eye-icon" 
                  />
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">로그인</button>
            <div className="login-options">
              <p className="login-link">회원이 아니신가요? <a href="/signup">회원가입</a></p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
