import '../../layouts/user/MainLayout.css';
import RecipeForm from '../../components/user/RecipeForm';


export default function PostForm() {
  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">새 게시글 작성</h1>
        <div style={{width:'663px'}}></div>
      </div>

      <div>
        <RecipeForm></RecipeForm>
      </div>

    </div>
  );
}