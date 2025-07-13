import SubscribeBanner from "../components/user/SubscribeBanner.jsx";
import { Link } from "react-router-dom"; 
import SideBar from "../components/user/SideBar.jsx";
import ProfileCard from "../components/user/ProfileCard.jsx";
import '../layouts/MainLayout.css';
import logo from '../img/logo.svg';


//좌측 탭
export default function Tab() {
  return (
    <div className="main-layout-tab">
            <div className="tab-logo">
                <Link to="/">
                    <img src={logo} alt="로고" />
                </Link>
            </div>
            {/* 구독 유도 광고 (비구독자 전용) */}
            <SubscribeBanner></SubscribeBanner>
            {/* 탭 바 */}
            <SideBar></SideBar>
            {/* 프로필 카드*/}
            <ProfileCard></ProfileCard>
    </div>
  );
}

