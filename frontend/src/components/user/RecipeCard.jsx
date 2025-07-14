import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user/RecipeCard.css';

function Recipe({ isDetail = false, isMyPost = false }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/postdetail');
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => count + (newLiked ? 1 : -1));
      return newLiked;
    });
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  const handleReport = (e) => {
    e.stopPropagation();
    if (window.confirm('신고하시겠습니까?')) {
      alert('신고가 접수되었습니다.');
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
    alert('수정 페이지로 이동합니다.');
    navigate('/postform');
  };

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
    }
  };

  return (
    <div className="recipe-card-link" onClick={handleCardClick}>
      <div className="recipe-card-box">
        <div className="recipe-card-view">
          <div className="recipe-card-content">

            {/* 프로필 헤더 */}
            <div className="recipe-card-profile-header">
              <img
                onClick={handleProfileClick}
                className="recipe-card-profile-image"
                src="https://c.animaapp.com/RwKPZPrR/img/---@2x.png"
                alt="Chef Kim's profile"
              />
              <div className="recipe-card-profile-info">
                <div className="recipe-card-chef-name-row">
                  <h1 className="recipe-card-chef-name">요리왕김셰프</h1>
                  {isDetail && (
                    <button
                      className={`follower-card-button ${isFollowing ? 'following' : ''}`}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </button>
                  )}
                </div>
                <div className="recipe-card-meta-info">
                  <span className="recipe-card-username">@chefkim</span>
                </div>
              </div>

              {/* 더보기 (hover 시 드롭다운) */}
              <div className="recipe-card-report">
                <img
                  className="comment-card-more-icon"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2Yjc2N2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1lbGxpcHNpcy1pY29uIGx1Y2lkZS1lbGxpcHNpcyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSI1IiBjeT0iMTIiIHI9IjEiLz48L3N2Zz4="
                  alt="더 보기 아이콘"
                />
                <div className="recipe-card-dropdown">
                  {isMyPost ? (
                    <>
                      <button className="recipe-card-dropdown-button" onClick={handleEdit}>수정</button>
                      <button className="recipe-card-dropdown-button" onClick={handleDelete}>삭제</button>
                    </>
                  ) : (
                    <button className="recipe-card-dropdown-button" style={{ color: '#ef4444' }}  onClick={handleReport}>신고하기</button>
                  )}
                </div>
              </div>
            </div>

            {/* 본문 내용 */}
            <p className="recipe-card-description">
              오늘 만든 크림 파스타 레시피 공유합니다! 집에서도 레스토랑 수준의 맛을 낼 수 있어요 🍝✨ 
              <br /><br />
              <strong>재료:</strong> 파스타면 200g, 생크림 200ml, 마늘 3쪽, 베이컨 100g, 파마산 치즈
              <br /><br />
              <strong>조리법:</strong><br />
              1. 베이컨을 바삭하게 볶아주세요<br />
              2. 마늘을 넣고 향을 내주세요<br />
              3. 생크림을 넣고 끓여주세요<br />
              4. 삶은 파스타와 치즈를 넣고 섞어주세요
            </p>

            {/* 해시태그 */}
            <ul className="recipe-card-hashtags">
              <li className="recipe-card-hashtag">#크림파스타</li>
              <li className="recipe-card-hashtag">#홈쿠킹</li>
              <li className="recipe-card-hashtag">#이탈리안</li>
              <li className="recipe-card-hashtag">#간단요리</li>
            </ul>

            {/* 액션 바 */}
            <div className="recipe-card-action-row">
              <div className="recipe-card-left-actions">
                <div className="recipe-card-cooking-time">
                  <img className="clock-icon" src="https://c.animaapp.com/RwKPZPrR/img/frame-1.svg" alt="Clock" />
                  <span className="time">30분</span>
                </div>
                <button
                  className={`recipe-card-likes ${liked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <svg className="heart-icon" width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M8.78 15.43C6.69 13.55 5.06 12.08 3.94 10.73C2.83 9.39 2.25 8.16 2.25 6.84C2.25 4.71 3.94 3.09 6.19 3.09C7.24 3.09 8.25 3.53 9 4.23C9.75 3.53 10.76 3.09 11.81 3.09C14.06 3.09 15.75 4.71 15.75 6.84C15.75 8.16 15.16 9.39 14.06 10.73C12.94 12.08 11.31 13.55 9.22 15.43L9 15.63L8.78 15.43Z"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      fill={liked ? "#10B981" : "none"}
                    />
                  </svg>
                  <span className="recipe-card-like-count">{likeCount}</span>
                </button>
              </div>

              <div className="recipe-card-bottom-right">
                <div className="recipe-card-view-count">
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbHVtbi1pY29uIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbHVtbiI+PGxpbmUgeDE9IjE4IiB4Mj0iMTgiIHkxPSIyMCIgeTI9IjEwIi8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSIyMCIgeTI9IjQiLz48bGluZSB4MT0iNiIgeDI9IjYiIHkxPSIyMCIgeTI9IjE0Ii8+PC9zdmc+" 
                       alt="조회수" />
                  <p>242</p>
                </div>
                <button
                  className={`recipe-card-bookmark-button ${bookmarked ? 'active' : ''}`}
                  onClick={handleBookmark}
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path
                      d="M1.5 0.5H14.5C14.78 0.5 15 0.72 15 1V19C15 19.18 14.91 19.35 14.75 19.42C14.6 19.5 14.41 19.48 14.28 19.36L8 14.06L1.72 19.36C1.59 19.48 1.4 19.5 1.25 19.42C1.09 19.35 1 19.18 1 19V1C1 0.72 1.22 0.5 1.5 0.5Z"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      fill={bookmarked ? "#10B981" : "none"}
                    />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;