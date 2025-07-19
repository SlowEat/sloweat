import SubscribeBanner from "../../components/user/SubscribeBanner.jsx";
import { Link } from "react-router-dom"; 
import {useEffect, useState} from "react";
import SideBar from "../../components/user/SideBar.jsx";
import ProfileCard from "../../components/user/ProfileCard.jsx";
import { getMyProfile } from '../../api/user/profile';
import './MainLayout.css';
import logo from '../../img/logo.svg';


//좌측 탭
export default function Tab() {
  const [profile,setProfile] = useState(null);

  //프로필 불러오기
  useEffect(()=>{
      const profile = async()=>{
        try{
          const res = await getMyProfile();
          setProfile(res.data);
        }catch(err){
          console.error('프로필 불러오기 실패',err);
        }
      };
      profile();
    },[]);
  
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
            <ProfileCard profile={profile}></ProfileCard>
    </div>
  );
}

