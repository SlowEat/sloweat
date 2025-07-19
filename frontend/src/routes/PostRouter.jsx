import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import RecipeEditForm from '../components/user/RecipeEditForm';
import PostEntireList from '../components/user/PostEntireList';

const PostRouter = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="edit/:id" element={<RecipeEditForm />} />
      <Route path="entirelist" element={<PostEntireList />} /> {/* ✅ 경로 수정됨 */}
    </Routes>
  </>
);

export default PostRouter;
