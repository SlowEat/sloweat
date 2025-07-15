// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ScrollToTop from '../utils/ScrollToTop';
// import MainLayout from '../layouts/user/MainLayout';
// import Home from '../pages/user/Home';
// import PostDetail from '../pages/user/PostDetail';
// import PostForm from '../pages/user/PostForm';
// import MyPage from '../pages/user/MyPage';
// import UserPage from '../pages/user/UserPage';
// import Bookmark from '../pages/user/Bookmark';
// import Settings from '../pages/user/Settings';
//
// const UserRouter = () => (
//   <BrowserRouter>
//     <ScrollToTop />
//     <Routes>
//       {/* 로그인 후 사용자 페이지 */}
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/postform" element={<PostForm />} />
//         <Route path="/postdetail/:id" element={<PostDetail />} /> {/* 게시글 상세조회 */}
//         <Route path="/mypage" element={<MyPage />} />
//         <Route path="/userpage" element={<UserPage />} />
//         <Route path="/bookmark" element={<Bookmark />} />
//         <Route path="/settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
//
// export default UserRouter;
