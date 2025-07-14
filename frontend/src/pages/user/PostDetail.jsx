import '../../layouts/user/MainLayout.css';
import Recipe from "../../components/user/RecipeCard";
import CommentCard from '../../components/user/CommentCard';

export default function PostDetail() {
  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">게시글</h1>
        <div style={{width:'663px'}}></div>
      </div>

      {/* 게시글 상세 */}
      <div>
        <Recipe isDetail={true}/>
      </div>

      {/* 댓글 & 댓글 달기 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '670px',
          height: '36px',
          marginBottom:'10px'
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          댓글 (3)
        </h2>

        <button
          style={{
            height: '36px',
            padding: '0 16px',
            backgroundColor: '#10b981',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          댓글 작성
        </button>
      </div>

    {/* 댓글 상세 */}
    <CommentCard></CommentCard>
    <CommentCard></CommentCard>
    <CommentCard></CommentCard>
    </div>
  );
}