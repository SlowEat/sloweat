// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRecipePage from '../pages/admin/AdminRecipePage/AdminRecipePage';
import AdminCommentPage from '../pages/admin/AdminCommentPage/AdminCommentPage';
import AdminUserPage from '../pages/admin/AdminUserPage/AdminUserPage';
import AdminPaymentPage from '../pages/admin/AdminPaymentPage/AdminPaymentPage';
import AdminStatPage from '../pages/admin/AdminStatPage/AdminStatPage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            {/* admin 기본 페이지는 게시물 관리 페이지 */}
            <Route path="/admin" element={<Navigate to="/admin/recipes" replace />} />
            <Route path="/admin/recipes" element={<AdminRecipePage />} />
            <Route path="/admin/comments" element={<AdminCommentPage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/payments" element={<AdminPaymentPage />} />
            <Route path="/admin/statistics" element={<AdminStatPage />} />
            {/* 다른 admin routes도 여기에 추가 */}
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
