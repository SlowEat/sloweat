import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';

import MainLayout from '../layouts/user/MainLayout';
import PostEntireList from '../components/user/PostEntireList';
import PostEditPage from '../pages/user/PostEditPage';

const PostRouter = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="entirelist" element={<PostEntireList />} />
        <Route path="edit/:id" element={<PostEditPage />} />
      </Route>
    </Routes>
  </>
);

export default PostRouter;
