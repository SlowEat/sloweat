import '../../layouts/user/MainLayout.css';
import RecipeEditForm from '../../components/user/RecipeEditForm';

export default function EditPostPage() {
  return (
    <div className="main-layout-content">
      <div className="postDetail-header">
        <h1 className="tap-title">게시글 수정</h1>
        <div style={{ width: '663px' }}></div>
      </div>

      <div>
        <RecipeEditForm />
      </div>
    </div>
  );
}
