import { useState } from "react";
import '../../layouts/user/MainLayout.css';
import TabNavigation from "../../components/user/TabNavigation";
import NoMatch from "../../components/user/NoMatch";
import Recipe from "../../components/user/RecipeCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="home-header">
        <h1 className="tap-title">홈</h1>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === 0 && <FollowingTab />}
        {activeTab === 1 && <PopularTab />}
        {activeTab === 2 && <WeeklyPopularTab />}
      </div>
    </div>
  );
}

function FollowingTab() {
  return (
    <div>
        <NoMatch
          title="팔로우한 사용자가 아직 없어요 😢" 
          description="관심 있는 사람을 찾아 팔로우해 보세요!" ></NoMatch> {/*팔로우 하는 사용자 없을때*/}
    </div>
  ) 

}

function PopularTab() {
  return (
    <div>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
    </div>
  ) 
}

function WeeklyPopularTab() {
  return (
    <div>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
        <Recipe></Recipe>
    </div>
  ) 
}