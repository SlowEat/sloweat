import FollowerCard from "../components/user/FollowerCard.jsx";
import FreeSubScribeBanner from "../components/user/FreeSubscribeBanner.jsx"; 
import PopularTags from "../components/user/PopularTags.jsx";
import '../layouts/MainLayout.css';

//좌측 탭
export default function Banner() {
  return (
    <div className="main-layout-banner">
        {/* 구독 유도 광고 */}
        <FreeSubScribeBanner></FreeSubScribeBanner>
        {/* 팔로우 추천 */}
        <FollowerCard></FollowerCard>
        {/* 인기 태그 */}
        <PopularTags></PopularTags>
    </div>
  );
}