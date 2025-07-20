import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/user/RecipeCard.css';
import api from "../../api/axiosInstance";
import useFollow from "../../utils/useFollow";

function Recipe({ isDetail = false, isMyPost = true, recipe, openBookmarkModal, setSelectedRecipeId}) {
  const [liked, setLiked] = useState(recipe.isLiked);
  const [likeCount, setLikeCount] = useState(recipe?.likeCount || 0);
  const [bookmarked, setBookmarked] = useState(recipe.isBookmarked);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();

  const handleLike = async (e) => {
    e.stopPropagation();

    try {
      if (liked) {
        await axiosInstance.delete(`/api/recipes/${recipe.recipeId}/like`);
        setLikeCount((count) => count - 1);
      } else {
        await axiosInstance.post(`/api/recipes/${recipe.recipeId}/like`);
        setLikeCount((count) => count + 1);
      }

      setLiked((prev) => !prev);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };


  const deleteBookmark = async (bookmarkId) => {
    await api.delete(`/api/bookmarks/${bookmarkId}`);
    setBookmarked((prev) => !prev);
  };

  const handleBookmark = (bookmarked, bookmarkId, recipeId) => {
    if(bookmarked){
      const confirmed = window.confirm("북마크를 해제 하시겠습니까?");
      if (confirmed) {
        //북마크 해제
        deleteBookmark(bookmarkId);
      }
    }else{
      // 북마크 설정 팝업 오픈
      setSelectedRecipeId(recipeId);
      openBookmarkModal();
    }
  };

  const handleReport = (e) => {
    e.stopPropagation();
    if (window.confirm('신고하시겠습니까?')) {
      alert('신고가 접수되었습니다.');
    }
  };

  // Follow / UnFollow
  const { isFollowed, handleFollowToggle } = useFollow(isFollowing, recipe.userId);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate('/userpage');
  };

  const handleEdit = () => {
    alert('수정 페이지로 이동합니다.');
    navigate(`/postform/${recipe?.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
    }
  };

  return (
    <div className="recipe-card-link">
      <div className="recipe-card-box" >
        <div className="recipe-card-view">
          <div className="recipe-card-content" style={{cursor: 'default'}}>
            {/* 프로필 헤더 */}
            <div className="recipe-card-profile-header">
              <img
                onClick={handleProfileClick}
                className="recipe-card-profile-image"
                src={recipe?.chefProfileUrl || 'https://c.animaapp.com/RwKPZPrR/img/---@2x.png'}
                alt="프로필 이미지"
              />
              <div className="recipe-card-profile-info">
                <div className="recipe-card-chef-name-row">
                  <h1 className="recipe-card-chef-name">{recipe?.chefName || '익명 셰프'}</h1>

                    {/* 본인 게시글에는 팔로우 버튼 숨김 */}
                    <button
                      className={`follower-card-button ${isFollowing ? 'following' : ''}`}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </button>

                </div>
                <div className="recipe-card-meta-info">
                  <span className="recipe-card-username">@{recipe?.username || 'unknown'}</span>
                </div>
              </div>

              {/* 더보기 드롭다운 */}
              <div className="recipe-card-report">
                <img className="comment-card-more-icon" src="..." alt="더보기" />
                <div className="recipe-card-dropdown">
                  {isMyPost ? (
                    <>
                      <button className="recipe-card-dropdown-button" onClick={handleEdit}>수정</button>
                      <button className="recipe-card-dropdown-button" onClick={handleDelete}>삭제</button>
                    </>
                  ) : (
                    <button className="recipe-card-dropdown-button" style={{ color: '#ef4444' }} onClick={handleReport}>신고하기</button>
                  )}
                </div>
              </div>
            </div>

            {/* 본문 내용 */}
            <p className="recipe-card-description">
              {recipe?.content
                ? recipe.content.split('\n').map((line, idx) => (
                    <span key={idx}>{line}<br /></span>
                  ))
                : '레시피 내용이 없습니다.'
              }
            </p>

            {/* 해시태그 */}
            <ul className="recipe-card-hashtags">
              {recipe?.tags?.map((tag, idx) => (
                <li key={idx} className="recipe-card-hashtag">#{tag}</li>
              ))}
            </ul>

            {/* 액션 바 */}
            <div className="recipe-card-action-row">
              <div className="recipe-card-left-actions">
                <div className="recipe-card-cooking-time">
                  <img className="clock-icon" src="..." alt="조리시간" />
                  <span className="time">{recipe?.cookingTime}분</span>
                </div>
                <button type="button"
                    className={`recipe-card-likes ${liked ? 'active' : ''}`}
                    onClick={handleLike}
                >
                  {liked ? '❤️' : '🤍'}{' '}
                  <span className="recipe-card-like-count">{likeCount}</span>
                </button>
              </div>

              <div className="recipe-card-bottom-right">
                <div className="recipe-card-view-count">
                  👁 <p>{recipe?.viewCount || 0}</p>
                </div>
                <button type="button"
                    className={`recipe-card-bookmark-button ${bookmarked ? 'active' : ''}`}
                    onClick={() => handleBookmark(bookmarked, recipe.bookmarkId, recipe.recipeId)}
                >
                  {bookmarked ? '⭐' : '📕'}
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
