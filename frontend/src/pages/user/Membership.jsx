import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllPosts, getFollowingPosts } from "../../api/recipe/recipe";
import { subscriptionApi } from "../../api/subscription/subscriptionApi"; // 구독 API import 추가
import '../../layouts/user/MainLayout.css';
import TabNavigation from "../../components/user/TabNavigation";
import NoMatch from "../../components/user/NoMatch";
import Recipe from "../../components/bookmark/BookmarkItem";
import BookmarkModal from "../../components/bookmark/BookmarkModal";

export default function Membership() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  // 사용자 구독 상태
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  // 전체 게시물 상태 관리
  const [allPosts, setAllPosts] = useState([]);
  const [allPostsPage, setAllPostsPage] = useState(0);
  const [hasMoreAllPosts, setHasMoreAllPosts] = useState(true);

  // 팔로잉 게시물 상태 관리
  const [followingPosts, setFollowingPosts] = useState([]);
  const [followingPostsPage, setFollowingPostsPage] = useState(0);
  const [hasMoreFollowingPosts, setHasMoreFollowingPosts] = useState(true);

  // 사용자 구독 상태 확인
  const fetchUserSubscription = async () => {
    try {
      setSubscriptionLoading(true);
      const profileResponse = await subscriptionApi.getSubscriptionUser();
      setUserSubscribed(profileResponse.subscribed || false);
      console.log('✅ 사용자 구독 상태:', profileResponse.subscribed);
    } catch (err) {
      console.error('🔥 구독 상태 확인 실패:', err);
      setUserSubscribed(false); // 에러 시 구독하지 않은 것으로 처리
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // 전체 게시물 불러오기
  const fetchAllPosts = async (page) => {
    try {
      const res = await getAllPosts(page);

      // ✅ API 응답 전체를 콘솔에 출력
      console.log('✅ 전체 게시물 API 응답:', res);

      const newPosts = res.content;

      if (!newPosts || !Array.isArray(newPosts)) {
        console.log('❌ 전체 게시물 데이터가 없거나 배열이 아닙니다.');
        setHasMoreAllPosts(false);
        return;
      }

      // subscribed가 true인 게시물만 필터링
      const filteredPosts = newPosts.filter(post => post.subscribed === true);

      setAllPosts(prevPosts => [...prevPosts, ...filteredPosts]);
      setHasMoreAllPosts(!res.last);
    } catch (err) {
      console.error('🔥 전체 게시물 불러오기 실패:', err);
    }
  };

  // 팔로잉 게시물 불러오기
  const fetchFollowingPosts = async (page) => {
    try {
      const res = await getFollowingPosts(page);

      // ✅ API 응답 전체를 콘솔에 출력
      console.log('✅ 팔로잉 게시물 API 응답:', res);

      const newPosts = res.content;

      if (!newPosts || !Array.isArray(newPosts)) {
        console.log('❌ 팔로잉 게시물 데이터가 없거나 배열이 아닙니다.');
        setHasMoreFollowingPosts(false);
        return;
      }

      // subscribed가 true인 게시물만 필터링
      const filteredPosts = newPosts.filter(post => post.subscribed === true);

      setFollowingPosts(prevPosts => [...prevPosts, ...filteredPosts]);
      setHasMoreFollowingPosts(!res.last);
    } catch (err) {
      console.error('🔥 팔로우 게시물 불러오기 실패:', err);
    }
  };

  // 컴포넌트 마운트 시 구독 상태 확인
  useEffect(() => {
    fetchUserSubscription();
  }, []);

  // 탭 변경 시 초기 페이지 로드
  useEffect(() => {
    if (activeTab === 0 && allPosts.length === 0) {
      fetchAllPosts(0);
    } else if (activeTab === 1 && followingPosts.length === 0) {
      fetchFollowingPosts(0);
    }
  }, [activeTab]);

  // "더 불러오기" 버튼 클릭 핸들러
  const handleLoadMore = () => {
    if (activeTab === 0) {
      setAllPostsPage(prevPage => prevPage + 1);
      fetchAllPosts(allPostsPage + 1);
    } else if (activeTab === 1) {
      setFollowingPostsPage(prevPage => prevPage + 1);
      fetchFollowingPosts(followingPostsPage + 1);
    }
  };

  // 구독 페이지로 이동
  const handleSubscribe = () => {
    navigate('/settings', { state: { tab: 'subscription' } });
    console.log('구독 페이지로 이동');
  };

  return (
    <div className="main-layout-content">
      <div className="home-headser">
        <h1 className="tap-title">홈</h1>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div>
        {activeTab === 0 && (
          <AllTab
            posts={allPosts}
            hasMore={hasMoreAllPosts}
            onLoadMore={handleLoadMore}
            onSubscribe={handleSubscribe}
            userSubscribed={userSubscribed}
            subscriptionLoading={subscriptionLoading}
            fetchAllPosts={fetchAllPosts}
          />
        )}
        {activeTab === 1 && (
          <FollowingTab
            posts={followingPosts}
            hasMore={hasMoreFollowingPosts}
            onLoadMore={handleLoadMore}
            onSubscribe={handleSubscribe}
            userSubscribed={userSubscribed}
            subscriptionLoading={subscriptionLoading}
          />
        )}
      </div>
    </div>
  );
}

// 전체 게시물 탭
function AllTab({ posts, hasMore, onLoadMore, onSubscribe, userSubscribed, subscriptionLoading}) {
  // 북마크 관련 (북마크 설정/해제 시 북마크 상태 처리)
  const [recipeId, setRecipeId] = useState();

  //북마크 모달 관련
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const openBookmarkModal = () => setIsBookmarkModalOpen(true);
  const closeBookmarkModal = () => setIsBookmarkModalOpen(false);

  if (subscriptionLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <p>구독 상태를 확인하는 중...</p>
      </div>
    );
  }

  if (posts.length === 0 && !hasMore) {
    return (
      <NoMatch
        title="구독 레시피가 없습니다 😢"
        description="구독 전용 레시피를 기다려주세요!"
      />
    );
  }

  return (
    <div>
      {posts.map(post => {
        // 서버에서 넘어오면서 이름이 달라진부분 변경
        const enhancedPost = {
          ...post,
          isBookmarked: post.bookmarked,
          isLiked: post.liked,
          isFollowing: post.following,
          isMyPost: post.myPost,
        };

        return (
          <Recipe
            key={post.recipeId}
            recipe={enhancedPost}
            openBookmarkModal={openBookmarkModal}
            setSelectedRecipeId={setRecipeId}
          />
        );
      })}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={onLoadMore} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            더 불러오기
          </button>
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: 'center', margin: '20px', color: '#888' }}>
          <p>모든 구독 게시물을 다 불러왔습니다.</p>
        </div>
      )}

      {/* 북마크 추가 모달 */}
      { isBookmarkModalOpen &&
          <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} recipeId={recipeId}/>
      }
    </div>
  );
}

// 팔로잉 게시물 탭
function FollowingTab({ posts, hasMore, onLoadMore, onSubscribe, userSubscribed, subscriptionLoading }) {
  // 북마크 관련 (북마크 설정/해제 시 북마크 상태 처리)
  const [recipeId, setRecipeId] = useState();

  //북마크 모달 관련
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const openBookmarkModal = () => setIsBookmarkModalOpen(true);
  const closeBookmarkModal = () => setIsBookmarkModalOpen(false);

  if (subscriptionLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <p>구독 상태를 확인하는 중...</p>
      </div>
    );
  }

  if (posts.length === 0 && !hasMore) {
    return (
      <NoMatch
        title="팔로우한 사용자의 구독 레시피가 없어요 😢"
        description="팔로우한 사용자들의 구독 전용 레시피를 기다려주세요!"
      />
    );
  }

  return (
    <div>
      {posts.map(post => {
        // 서버에서 넘어오면서 이름이 달라진부분 변경
        const enhancedPost = {
          ...post,
          isBookmarked: post.bookmarked,
          isLiked: post.liked,
          isFollowing: post.following,
          isMyPost: post.myPost,
        };

        return (
          <Recipe
            key={post.recipeId}
            recipe={enhancedPost}
            openBookmarkModal={openBookmarkModal}
            setSelectedRecipeId={setRecipeId}
          />
        );
      })}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={onLoadMore} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            더 불러오기
          </button>
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: 'center', margin: '20px', color: '#888' }}>
          <p>모든 팔로우 구독 게시물을 다 불러왔습니다.</p>
        </div>
      )}

      {/* 북마크 추가 모달 */}
      { isBookmarkModalOpen &&
          <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} recipeId={recipeId}/>
      }
    </div>
  );
}