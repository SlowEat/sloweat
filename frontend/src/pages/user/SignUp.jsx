import { useState, useEffect } from 'react';
import { checkEmail, checkNickname, signup } from '../../api/auth';
import logo from '../../img/logo.svg';
import './SignUp.css';

function Signup() {
  //비밀번호 숨김처리
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [isEmailChecked , setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);


  //유효성 검사
useEffect(() => {
  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]{4,20}$/.test(email)) {
      newErrors.email = '아이디는 4~20자 영문자와 숫자만 사용 가능합니다.';
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};:"\\|,.<>/?]).{1,20}$/.test(password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해 20자 이내여야 합니다.';
    }

    if (passwordConfirm !== password) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!/^.{2,15}$/.test(nickname)) {
      newErrors.nickname = '닉네임은 2~15자 이내여야 합니다.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  validate();
}, [email, password, passwordConfirm, nickname]);
  
  
  //이메일 중복 확인 -> 이후 이메일 인증 고려
const handlerDuplicateEmail = async () => {
  const newErrors = { ...errors };

  try {
    const res = await checkEmail(email);

    if (res.data === true) {
      newErrors.email = '이미 사용 중인 아이디입니다.';
      setIsEmailChecked(false);
    } else {
      alert('사용 가능한 아이디입니다.');
      setIsEmailChecked(true);
    }
  } catch (err) {
    console.error('이메일 중복 확인 오류:', err);
    alert('아이디 확인 중 오류가 발생했습니다.');
    setIsEmailChecked(false);
  }

  setErrors(newErrors);
};


  //닉네임 중복 확인
  const handlerDuplicateNickname = async () => {
    const newErrors = { ...errors };

    try {
      const res = await checkNickname(nickname);

      if (res.data === true) {
        newErrors.nickname = '이미 사용 중인 닉네임입니다.';
        setIsNicknameChecked(false);
      } else {
        alert('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (err) {
      console.error('이메일 중복 확인 오류:', err);
      alert('닉네임 확인 중 오류가 발생했습니다.');
      setIsNicknameChecked(false);
    }

    setErrors(newErrors); 
  };

  //이메일, 닉네임 입력값 바뀌면 중복체크 -> false
    useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nickname]);

  //회원가입
  const handlerSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await signup(email, password, passwordConfirm, nickname);
    alert('회원가입이 완료되었습니다!');
    window.location.href = '/'; 
  } catch (err) {
    console.error('회원가입 실패:', err);
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  }
};

  return (
    <div className="signup-wrapper">
      <div className="signup-view">
        <div className="signup-overlap">
        <header className="signup-header">
            <div className="logo-container">
              <img className="SLOWEAT-LOGO" src={logo} alt="로고이미지"></img>
            </div>
          </header>
          <section className="signup-form">
            <h1 className="signup-title">회원가입</h1>
            <form onSubmit={handlerSignup}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">아이디 *</label>
                <input 
                  type="text" 
                  id="email" 
                  className="signup-form-input" 
                  placeholder="영문자와 숫자 조합 (4~20자)" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="button" className="duplicate-button" onClick={handlerDuplicateEmail}>중복 확인</button>
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">비밀번호 *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="signup-form-input"
                    placeholder="영문,숫자,특수문자 포함 (8~20자)"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    style={{width:'100%'}}
                    required
                  />
                  <img
                    className="signup-password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/--.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">비밀번호 확인 *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="signup-form-input"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={passwordConfirm}
                    onChange={(e)=>setPasswordConfirm(e.target.value)}
                    style={{width:'100%'}}
                    required
                  />
                  <img
                    className="signup-password-toggle"
                    src="https://c.animaapp.com/CgKu8nvQ/img/----.svg"
                    alt="비밀번호 보기/숨기기"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
                 {errors.passwordConfirm && <p className="form-error">{errors.passwordConfirm}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="nickname" className="form-label">닉네임 *</label>
                <input 
                  type="text" 
                  id="nickname" 
                  className="signup-form-input" 
                  placeholder="2~15자 이내 닉네임 입력" 
                  value={nickname}
                  onChange={(e)=>setNickname(e.target.value)}
                  required 
                />
                <button type="button" className="duplicate-button" onClick={handlerDuplicateNickname}>중복 확인</button>
              {errors.nickname && <p className="form-error">{errors.nickname}</p>}
              </div>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={!isFormValid || !isEmailChecked || !isNicknameChecked}>회원가입</button>
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
