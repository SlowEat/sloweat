import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { getMyProfile } from '../../api/user/profile';
import FollowerCard from "../../components/user/FollowerCard.jsx";
import PopularTags from "../../components/user/PopularTags.jsx";
import './MainLayout.css';

//좌측 탭
export default function Banner() {
    const [profile,setProfile] = useState(null);
    const navigate = useNavigate();
  
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
    
    //광고이미지 -> 유료 구독 안내
    const handleAdClick = () => {
    const confirmed = window.confirm("광고를 없애려면 유료 구독을 해야 합니다.\n유료 구독 페이지로 이동하시겠습니까?");
    if (confirmed) {
      navigate('/settings', { state: { tab: 'subscription' } });
    }
    };
    
  return (
    <div className="main-layout-banner">
      {/* 구독 유도 광고 (비구독자) */}
      {profile?.subscribed===false &&
            <img 
            src="https://blog.kakaocdn.net/dna/bbm69g/btsLPQdaabd/AAAAAAAAAAAAAAAAAAAAAMIq1nOQ33YIoUwSIVrPzF6IivIdhhLW1b9AzGOiOwBJ/tfile.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1753973999&allow_ip=&allow_referer=&signature=uSiUWZXB%2FqahgW5honlYp%2F%2BVm88%3D"
            style={{width:"268px", margin:"10px 0 20px 0", cursor:"pointer"}}
            alt="광고 이미지"
            onClick={handleAdClick}></img> }

        {/* 팔로우 추천 */}
        <FollowerCard></FollowerCard>

        {/* 인기 태그 */}
        <PopularTags></PopularTags>
    </div>
  );
}