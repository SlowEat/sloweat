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
import Bookmark from '../pages/user/Bookmark';
import Settings from '../pages/user/Settings';

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
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
