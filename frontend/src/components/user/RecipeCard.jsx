import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import ContentReportForm from './ContentReportForm'; // 모달 컴포넌트 import
import '../../styles/user/RecipeCard.css';

function Recipe({ isDetail = false, isMyPost = false, data, refreshRecipe }) {
  const [liked, setLiked] = useState(data?.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(data?.likes ?? 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isDetail) {
      navigate(`/postdetail/${data?.recipeId}`);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      if (liked) {
        await axiosInstance.delete(`/api/recipes/${data.recipeId}/like`);
        setLikeCount((count) => Math.max(0, count - 1));
      } else {
        await axiosInstance.post(`/api/recipes/${data.recipeId}/like`);
        setLikeCount((count) => count + 1);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  const handleReport = (e) => {
    e.stopPropagation();
    setIsReportOpen(true);
  };

  const submitReport = async (reason) => {
    try {
      await axiosInstance.post(`/api/recipes/${data.recipeId}/report`, { reason });
      alert('신고가 성공적으로 접수되었습니다.');
      setIsReportOpen(false);
      if (refreshRecipe) await refreshRecipe();
    } catch (error) {
      console.error('신고 실패:', error);
      alert('신고 중 오류가 발생했습니다.');
    }
  };

  const handleFollowToggle = (e) => {
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate('/userpage');
  };

  const handleEdit = () => {
    navigate(`/postform/${data?.recipeId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await axiosInstance.delete(`/api/recipes/${data.recipeId}`);
      alert('삭제가 완료되었습니다!');
      navigate('/mypage');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="recipe-card-link" onClick={handleCardClick}>
        <div className="recipe-card-box">
          <div className="recipe-card-view">
            <div className="recipe-card-content">
              {/* 프로필 헤더 */}
              <div className="recipe-card-profile-header">
                <img
                  onClick={handleProfileClick}
                  className="recipe-card-profile-image"
                  src={data?.chefProfileUrl || 'https://img.freepik.com/free-photo/confident-asian-woman-face-portrait-smiling_53876-144815.jpg?semt=ais_hybrid&w=740'}
                  alt="프로필 이미지"
                />
                <div className="recipe-card-profile-info">
                  <div className="recipe-card-chef-name-row">
                    <h1 className="recipe-card-chef-name">{data?.chefName || '익명 셰프'}</h1>

                    {/* ✅ 수정된 부분: 본인 글이 아닐 때만 팔로우 버튼 보여줌 */}
                    {isDetail && !isMyPost && (
                      <button
                        className={`follower-card-button ${isFollowing ? 'following' : ''}`}
                        onClick={handleFollowToggle}
                      >
                        {isFollowing ? '팔로잉' : '팔로우'}
                      </button>
                    )}
                  </div>
                  <div className="recipe-card-meta-info">
                    <span className="recipe-card-username">@{data?.username || 'unknown'}</span>
                  </div>
                </div>

                {/* 더보기 드롭다운 */}
                <div className="recipe-card-report">
                  <span className="comment-card-more-icon">☰</span>
                  <div className="recipe-card-dropdown">
                    {isMyPost ? (
                      <>
                        <button className="recipe-card-dropdown-button" onClick={handleEdit}>수정</button>
                        <button className="recipe-card-dropdown-button" onClick={handleDelete}>삭제</button>
                      </>
                    ) : (
                      <button
                        className="recipe-card-dropdown-button"
                        style={{ color: '#ef4444' }}
                        onClick={handleReport}
                      >
                        신고하기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              <p className="recipe-card-description">
                {data?.content
                  ? data.content.split('\n').map((line, idx) => (
                      <span key={idx}>{line}<br /></span>
                    ))
                  : '레시피 내용이 없습니다.'}
              </p>

              {/* 해시태그 */}
              <ul className="recipe-card-hashtags">
                {data?.tags?.map((tag, idx) => (
                  <li key={idx} className="recipe-card-hashtag">#{tag}</li>
                ))}
              </ul>

              {/* 액션 바 */}
              <div className="recipe-card-action-row">
                <div className="recipe-card-left-actions">
                  <div className="recipe-card-cooking-time">
                    <span className="clock-text">⏱️ 조리시간: {data?.cookingTime}분</span>
                  </div>
                  <button
                    className={`recipe-card-likes ${liked ? 'active' : ''}`}
                    onClick={handleLike}
                  >
                    ❤️ <span className="recipe-card-like-count">{likeCount}</span>
                  </button>
                </div>

                <div className="recipe-card-bottom-right">
                  {isDetail && (
                    <div className="recipe-card-view-count">
                      👀  <span>{data?.views ?? 0}</span>
                    </div>
                  )}
                  <button
                    className={`recipe-card-bookmark-button ${bookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                  >
                    📌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 신고 모달 */}
      <ContentReportForm
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={submitReport}
      />
    </>
  );
}

export default Recipe;
