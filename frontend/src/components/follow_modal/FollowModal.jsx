import React, {useEffect, useState} from "react";
import { FollowHeader } from "./FollowHeader";
import { FollowCard } from "./FollowCard";
import "./FollowModal.css";
import api from "../../api/axiosInstance";

export const FollowModal = ({ isOpen, onClose, initialTab = "followers",reloadProfile }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  //목록 데이터
  const [userList, setUserList] = useState([]);

  //사용자 아이디
  //const userId = 1;

  const fetchFollowers = async () => {
    try {
      const response = await api.get('api/followers');
      setUserList(response.data);
    } catch (error) {
      console.error('북마크 컬렉션 불러오기 실패:', error);
    }
  };

  const fetchFollowings = async () => {
    try {
      const response = await api.get('api/followings');
      setUserList(response.data);
    } catch (error) {
      console.error('북마크 컬렉션 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === 'followers') {
      fetchFollowers();
    }else{
      fetchFollowings();
    }
  }, [activeTab]);

  if (!isOpen) return null;

  return (
    <div className="follow-modal-overlay">
      <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
        <FollowHeader activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose} />
        <div className="follow-list">
          {userList.map((f, index) => (
            <FollowCard
              key={f.followId}
              followId={f.followId}
              username={f.nickname}
              userId={f.userId}
              email={f.localEmail ? f.localEmail : f.kakaoEmail}
              followerCount={f.followerCount}
              isFollowed={f.isFollowed}
              profileImg={f.profileImgPath}
              reloadProfile={reloadProfile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
