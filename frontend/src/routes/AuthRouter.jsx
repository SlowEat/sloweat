import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom';
import Login from '../pages/user/Login';
import SignUp from '../pages/user/SignUp';

const AuthRouter = () => (
    <BrowserRouter>
        <Routes>
        {/* 공통 - 로그인, 회원가입 페이지 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>

);

export default AuthRouter;