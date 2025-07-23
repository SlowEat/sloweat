import '../../styles/user/CommentCard.css';
import axiosInstance from "../../api/axiosInstance";
import { formatDateTime } from '../../utils/dateTimeUtils';
import { useNavigate } from 'react-router-dom';

const CommentCard = ({ comment, isMyPage }) => {  
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(`/postdetail/${comment.recipeId}`);
  };


  //댓글 삭제
  const handleDelete = async (e) => {
    e.stopPropagation();

    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/recipes/comments/${comment.commentId}`);
        window.alert('삭제가 완료되었습니다');
        window.location.href = '/mypage?tab=comments';
      } catch (err) {
        console.error("댓글 삭제 실패", err);
      }
    }
  };

  return (
    <article className="mypage-comment-card" onClick={handleCommentClick} style={{ cursor: 'pointer' }}>
      <div className="comment-card-container">

        {/* 댓글 본문 */}
        <div className="comment-card-body">
          <div className="comment-card-user-info">
            <div className="comment-card-user-meta">
              <h2 className="comment-card-username">{comment.nickname}</h2>
              <span className="comment-card-user-handle">@{comment.localEmail}</span>
              <span className="comment-card-separator">·</span>
              <time className="comment-card-time" dateTime="PT2H">
                {formatDateTime(comment.createdAt)}
              </time>

              {/* 본인 댓글만 수정/삭제 드롭다운 표시 */}
              {comment?.isMyComment && (
                <div className="comment-card-report">
                  <img
                    className="comment-card-more-icon"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2Yjc2N2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1lbGxpcHNpcy1pY29uIGx1Y2lkZS1lbGxpcHNpcyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSI1IiBjeT0iMTIiIHI9IjEiLz48L3N2Zz4="
                    alt="더 보기 아이콘"
                  />
                  <div className="recipe-card-dropdown">
                    <button className="recipe-card-dropdown-button" onClick={handleDelete}>삭제</button>
                  </div>
                </div>
              )}
            </div>
            <p className="comment-card-text">{comment.content}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentCard;
