import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Login from '../pages/user/Login';
import SignUp from '../pages/user/SignUp';
import MainLayout from '../layouts/user/MainLayout';
import Home from '../pages/user/Home';
import Search from '../pages/user/Search';
import Membership from '../pages/user/Membership';
import PostDetail from '../pages/user/PostDetail';
import MyPage from '../pages/user/MyPage';
import UserPage from '../pages/user/UserPage';
import PostForm from '../pages/user/PostForm';
import Bookmark from '../pages/bookmark/Bookmark';
import Settings from '../pages/user/Settings';
import AdminLayout from '../layouts/admin/AdminLayout'
import RecipeManagement from '../pages/admin/RecipeManagement/RecipeManagement';
import CommentManagement from '../pages/admin/CommentManagement/CommentManagement';
import UserManagement from '../pages/admin/UserManagement/UserManagement';
import PaymentManagement from '../pages/admin/PaymentManagement/PaymentManagement';
import StatReport from '../pages/admin/StatReport/StatReport';
import TempMyPage from '../pages/temp_mypage/MyPage';

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop /> {/* 이동 시 웹페이지 최상단으로 이동하게 해줌 */}
    <Routes>
      {/* 공통 - 로그인, 회원가입 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* 로그인 이후 user 페이지 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/postdetail/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* admin 기본 페이지는 게시물 관리 페이지 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="recipes" replace />} />
        <Route path="recipes" element={<RecipeManagement />} />
        <Route path="comments" element={<CommentManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="payments" element={<PaymentManagement />} />
        <Route path="statistics" element={<StatReport />} />
      </Route>
            
      {/* 사용자 마이페이지(임시) */}
      <Route path="/temp_mypage" element={<TempMyPage/>}/>
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
