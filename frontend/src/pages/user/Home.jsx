import { useState, useEffect } from "react";
import { getAllPosts } from "../../api/recipe/recipe";
import '../../layouts/user/MainLayout.css';
import TabNavigation from "../../components/user/TabNavigation";
import NoMatch from "../../components/user/NoMatch";
import Recipe from "../../components/user/RecipeCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);

  //post 전체 불러오기 [최신순]
  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res);
        console.log(res);
      } catch (err) {
        console.error('🔥 전체 게시글 불러오기 실패:', err);
        alert('로그인이 필요하거나 접근 권한이 없습니다.');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="home-headser">
        <h1 className="tap-title">홈</h1>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === 0 && <AllTab posts={posts}/>}
        {activeTab === 1 && <FollowingTab posts={posts}/>}
      </div>
    </div>
  );
}

function AllTab({posts}) {
  if(!posts || posts.length === 0){
    return (
      <div>
          <NoMatch
            title="레시피가 없습니다 😢" 
            description="직접 게시물을 등록해보세요!" ></NoMatch> {/*팔로우 하는 사용자 없을때*/}
      </div>
    ) 
  }

  return (
    <div>
      {posts.map(post=>(
        <Recipe></Recipe>
      ))}
    </div>
  );
}

function FollowingTab({posts}) {
  if(!posts || posts.length === 0){
    return (
      <div>
          <NoMatch
            title="팔로우한 사용자가 아직 없어요 😢" 
            description="관심 있는 사람을 찾아 팔로우해 보세요!" ></NoMatch> {/*팔로우 하는 사용자 없을때*/}
      </div>
    )   
  }

  return (
    <div>
      {posts.map(post=>(
        <Recipe></Recipe>
      ))}
    </div>
  );
}
