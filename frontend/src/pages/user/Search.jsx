import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../layouts/user/MainLayout.css';
import NoMatch from '../../components/user/NoMatch';
import RecipeCard from '../../components/user/RecipeCard';
import SearchBar from '../../components/user/SearchBar';
import Filter from '../../components/user/Filter';
import PremiumContentOverlay from '../../components/user/PremiumContentOverlay';
import BookmarkModal from '../../components/bookmark/BookmarkModal';
import { subscriptionApi } from '../../api/subscription/subscriptionApi';

export default function Search() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [recipeId, setRecipeId] = useState(null);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //구독 상태 확인
  const fetchUserSubscription = async () => {
    try {
      setSubscriptionLoading(true);
      const res = await subscriptionApi.getSubscriptionUser();
      setUserSubscribed(res.subscribed || false);
    } catch (err) {
      console.error('구독 상태 확인 실패:', err);
      setUserSubscribed(false);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  //페이지 첫 진입 시: 구독 상태 확인 + 검색 결과 복원
  useEffect(() => {
    fetchUserSubscription();

    const restored = location.state?.searchResults;
    if (restored && Array.isArray(restored)) {
      setResults(restored);
      setHasSearched(true);
    }
  }, []);

  //결과
  const handleSearchResults = (data) => {
    setResults(data);
    setHasSearched(true);
  };  

  //클릭시
  const handleCardClick = (recipe) => {
    const recipeId = recipe.recipeId || recipe.id;
    if (!recipeId) return;
    navigate(`/postdetail/${recipeId}`, {
      state: {
        from: 'search',
        searchResults: results
      }
    });
  };

  //구독 핸들링
  const handleSubscribe = () => {
    navigate('/settings', { state: { tab: 'subscription' } });
  };

  const openBookmarkModal = () => setIsBookmarkModalOpen(true);
  const closeBookmarkModal = () => setIsBookmarkModalOpen(false);

  return (
    <div className="main-layout-content">
      <div className="search-header">
        <h1 className="tap-title">검색</h1>
        <SearchBar onSearch={handleSearchResults} />
        <Filter onSearch={handleSearchResults} />
      </div>

      {/* 구독 상태 확인 중 */}
      {subscriptionLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>구독 상태를 확인하는 중...</p>
        </div>
      )}

      {/* 검색 결과 렌더링 */}
      {!subscriptionLoading && results.length > 0 && (
        <div>
          {results.map((recipe) => {
            const recipeId = recipe.recipeId || recipe.id;

            const enhancedRecipe = {
              ...recipe,
              isBookmarked: recipe.bookmarked,
              isLiked: recipe.liked,
              isFollowing: recipe.following,
              isMyPost: recipe.myPost
            };

            const shouldShow = userSubscribed || recipe.subscribed !== true;

            return (
              <PremiumContentOverlay
                key={recipeId}
                isSubscribed={shouldShow}
                onSubscribe={handleSubscribe}
              >
                <div onClick={() => handleCardClick(recipe)} style={{ cursor: 'pointer' }}>
                  <RecipeCard
                    data={enhancedRecipe}
                    openBookmarkModal={openBookmarkModal}
                    setSelectedRecipeId={setRecipeId}
                  />
                </div>
              </PremiumContentOverlay>
            );
          })}
        </div>
      )}

      {/* 검색 전 상태 */}
      {!subscriptionLoading && !hasSearched && (
        <NoMatch
          title="레시피를 검색해보세요 😀"
          description="키워드나 태그를 입력하여 원하는 레시피를 찾아보세요"
        />
      )}

      {/* 검색 결과 없음 */}
      {!subscriptionLoading && hasSearched && results.length === 0 && (
        <NoMatch
          title="일치하는 레시피가 없습니다 😥"
          description="직접 게시물을 등록해보세요!"
        />
      )}

      {/* 북마크 모달 */}
      {isBookmarkModalOpen && recipeId && (
        <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} recipeId={recipeId} />
      )}
    </div>
  );
}
