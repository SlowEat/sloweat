import '../../layouts/user/MainLayout.css';
import Recipe from "../../components/user/RecipeCard";
import CommentSection from '../../components/user/CommentSection';

export default function PostDetail() {
  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">게시글</h1>
        <div style={{ width: '663px' }}></div>
      </div>

      {/* 게시글 상세 */}
      <div>
        <Recipe isDetail={true} />
      </div>

      {/* 댓글 섹션 */}
      <CommentSection />
    </div> // ← return 블록 닫기
  );
}
