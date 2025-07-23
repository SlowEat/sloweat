import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';

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
import AdminLayout from '../layouts/admin/AdminLayout';
import RecipeManagement from '../pages/admin/RecipeManagement/RecipeManagement';
import CommentManagement from '../pages/admin/CommentManagement/CommentManagement';
import UserManagement from '../pages/admin/UserManagement/UserManagement';
import PaymentManagement from '../pages/admin/PaymentManagement/PaymentManagement';
import StatReport from '../pages/admin/StatReport/StatReport';
import TempMyPage from '../pages/temp_mypage/MyPage';
import PostRouter from '../routes/PostRouter'; // ✅ PostRouter import 추가
import BookmarkList from "../components/bookmark/BookmarkList";

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>

      {/* 로그인 이후 user 페이지 */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/postdetail/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:userId" element={<UserPage />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/bookmark/list/:collectionId/:collectionName" element={<BookmarkList />} /> {/*컬렉션에서 북마크 목록 조회*/}
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 📌 게시물 전체 라우팅 허브 */}
      <Route path="/posts/*" element={<PostRouter />} /> {/* ✅ 이 한 줄 추가 */}

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
      <Route path="/temp_mypage" element={<TempMyPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
