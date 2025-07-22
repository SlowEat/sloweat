import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/user/RecipeCard.css';
import api from "../../api/axiosInstance";
import ContentReportForm from '../user/ContentReportForm';
import useFollow from "../../utils/useFollow";
import {DEFAULT_PROFILE_IMAGE, PROFILE_FILE_PATH} from "../../constants/Profile";

function Recipe({ isDetail = false, recipe, openBookmarkModal, setSelectedRecipeId,refreshRecipe}) {
  const [liked, setLiked] = useState(recipe.isLiked);
  const [bookmarked, setBookmarked] = useState(recipe.isBookmarked); 
  const [isFollowing, setIsFollowing] = useState(recipe.isFollowing);
  const [isMyPost, setIsMyPost] = useState(recipe.isMyPost);
  const [likeCount, setLikeCount] = useState(recipe?.likes || 0);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const navigate = useNavigate();

  //좋아요
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

  //북마크 삭제
  const deleteBookmark = async (bookmarkId) => {
    await api.delete(`/api/bookmarks/${bookmarkId}`);
    setBookmarked((prev) => !prev);
  };

  //북마크
  const handleBookmark = (e,bookmarked, bookmarkId, recipeId) => {
    e.stopPropagation();

    if(bookmarked){
      const confirmed = window.confirm("북마크를 해제 하시겠습니까?");
      if (confirmed) {
        //북마크 해제
        deleteBookmark(bookmarkId);
        window.location.reload();
      }
    }else{
      // 북마크 설정 팝업 오픈
      setSelectedRecipeId(recipeId);
      openBookmarkModal();
    }
  };

  const handleReport = (e) => {
      e.stopPropagation();
      setIsReportOpen(true);
    };

    const submitReport = async (reason) => {
      try {
        await axiosInstance.post(`/api/recipes/${recipe.recipeId}/report`, { reason });
        alert('신고가 성공적으로 접수되었습니다.');
        setIsReportOpen(false);
        if (refreshRecipe) await refreshRecipe();
      } catch (error) {
        console.error('신고 실패:', error);
        alert('신고 중 오류가 발생했습니다.');
      }
    };

  // Follow / UnFollow
  const { isFollowed, handleFollowToggle } = useFollow(isFollowing, recipe.userId, null, setIsFollowing);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate('/userpage');
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    alert('수정 페이지로 이동합니다.');
    navigate(`/posts/edit/${recipe.recipeId}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm('이 게시글을 정말 삭제하시겠어요?');
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/api/recipes/${recipe.recipeId}`);
      alert('게시글이 삭제되었습니다.');
      window.location.reload('/mypage');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleRecipeClick = () => {
    navigate(`/postdetail/${recipe.recipeId}`);
  };

  return (
    <div className="recipe-card-link">
      <div className="recipe-card-box" >
        <div className="recipe-card-view">
          <div className="recipe-card-content" onClick={handleRecipeClick} style={{cursor: 'pointer'}}>
            {/* 프로필 헤더 */}
            <div className="recipe-card-profile-header">
              <img
                onClick={handleProfileClick}
                className="recipe-card-profile-image"
                src={recipe.profileImgPath ? PROFILE_FILE_PATH + recipe.profileImgPath : DEFAULT_PROFILE_IMAGE}
                alt="프로필 이미지"
              />
              <div className="recipe-card-profile-info">
                <div className="recipe-card-chef-name-row">
                  <h1 className="recipe-card-chef-name">{recipe?.chefName || '익명 셰프'}</h1>

                  {/* 본인 게시글에는 팔로우 버튼 숨김 */}
                  { !isMyPost &&
                    <button
                      className={`follower-card-button ${isFollowing ? 'following' : ''}`}
                      onClick={(e) => handleFollowToggle(e)}
                    >
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </button>
                  }

                </div>
                <div className="recipe-card-meta-info">
                  <span className="recipe-card-username">@{recipe?.username || 'unknown'}</span>
                </div>
              </div>

              {/* 더보기 드롭다운 */}
              <div className="recipe-card-report">
                <img className="comment-card-more-icon"
                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1lbGxpcHNpcy1pY29uIGx1Y2lkZS1lbGxpcHNpcyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSI1IiBjeT0iMTIiIHI9IjEiLz48L3N2Zz4="
                     alt="더보기" />
                <div className="recipe-card-dropdown">
                  {isMyPost ? (
                    <>
                      <button className="recipe-card-dropdown-button" onClick={(e)=>handleEdit(e)}>수정</button>
                      <button className="recipe-card-dropdown-button" onClick={(e)=>handleDelete(e)}>삭제</button>
                    </>
                  ) : (
                    <button className="recipe-card-dropdown-button" style={{ color: '#ef4444' }} onClick={(e)=>handleReport(e)}>신고하기</button>
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
                  <span className="time">⏱️ {recipe?.cookingTime}분</span>
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
                  <img className="recipe-card-view-icon"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1leWUtaWNvbiBsdWNpZGUtZXllIj48cGF0aCBkPSJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48L3N2Zz4="
                  alt="조회수" />
                  <p>{recipe?.views || 0}</p>
                </div>
                <button type="button" className="recipe-card-bookmark-button" onClick={(e) => handleBookmark(e,bookmarked, recipe.bookmarkId, recipe.recipeId)}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="recipe-card-bookmark-icon"
                       fill={bookmarked ? "#10b981" : "none"}
                       width="22"
                       height="22"
                       viewBox="0 0 24 24"
                       stroke="#10b981"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
               {/* 신고 모달 */}
                    <ContentReportForm
                      isOpen={isReportOpen}
                      onClose={() => setIsReportOpen(false)}
                      onSubmit={submitReport}
                    />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
