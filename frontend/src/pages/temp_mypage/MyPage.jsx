import React, { useState } from "react";
import { FollowerModal } from "../../components/follow_modal/follower/FollowerModal";

const MyPage = () => {
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);

  const handleOpenFollowers = () => {
    setIsFollowerOpen(true);
  };

  const handleCloseFollowers = () => {
    setIsFollowerOpen(false);
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <button onClick={handleOpenFollowers}>팔로워 보기</button>

      <FollowerModal isOpen={isFollowerOpen} onClose={handleCloseFollowers} />
    </div>
  );
};

export default MyPage;
