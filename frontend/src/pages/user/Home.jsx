import { useState, useEffect } from "react";
import { getAllPosts, getFollowingPosts } from "../../api/recipe/recipe";
import '../../layouts/user/MainLayout.css';
import TabNavigation from "../../components/user/TabNavigation";
import NoMatch from "../../components/user/NoMatch";
import Recipe from "../../components/user/RecipeCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  // 전체 게시물 상태 관리
  const [allPosts, setAllPosts] = useState([]);
  const [allPostsPage, setAllPostsPage] = useState(0);
  const [hasMoreAllPosts, setHasMoreAllPosts] = useState(true);

  // 팔로잉 게시물 상태 관리
  const [followingPosts, setFollowingPosts] = useState([]);
  const [followingPostsPage, setFollowingPostsPage] = useState(0);
  const [hasMoreFollowingPosts, setHasMoreFollowingPosts] = useState(true);

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

      setAllPosts(prevPosts => [...prevPosts, ...newPosts]);
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

      setFollowingPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMoreFollowingPosts(!res.last);
    } catch (err) {
      console.error('🔥 팔로우 게시물 불러오기 실패:', err);
    }
  };

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
          />
        )}
        {activeTab === 1 && (
          <FollowingTab
            posts={followingPosts}
            hasMore={hasMoreFollowingPosts}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
}

// 전체 게시물 탭
function AllTab({ posts, hasMore, onLoadMore }) {
  if (posts.length === 0 && !hasMore) {
    return (
      <NoMatch
        title="레시피가 없습니다 😢"
        description="직접 게시물을 등록해보세요!"
      />
    );
  }

  return (
    <div>
      {posts.map(post => (
        <Recipe key={post.recipeId} data={post} />
      ))}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={onLoadMore} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            더 불러오기
          </button>
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: 'center', margin: '20px', color: '#888' }}>
          <p>모든 게시물을 다 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
}

// 팔로잉 게시물 탭
function FollowingTab({ posts, hasMore, onLoadMore }) {
  if (posts.length === 0 && !hasMore) {
    return (
      <NoMatch
        title="팔로우한 사용자가 아직 없어요 😢"
        description="관심 있는 사람을 찾아 팔로우해 보세요!"
      />
    );
  }

  return (
    <div>
      {posts.map(post => (
        <Recipe key={post.recipeId} data={post} />
      ))}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={onLoadMore} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            더 불러오기
          </button>
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: 'center', margin: '20px', color: '#888' }}>
          <p>모든 팔로우 게시물을 다 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
}