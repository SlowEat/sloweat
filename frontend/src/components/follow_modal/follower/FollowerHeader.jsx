import React, { useState} from "react";
import "./FollowerHeader.css";

export const FollowerHeader = ({onClose}) => {
  const [activeTab, setActiveTab] = useState("followers"); // followers | followings

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // 이 부분에서 추후 탭별로 팔로워/팔로잉 리스트도 분기 가능
  };

  return (
    <div className="follower-header">
      <div className="header-container">
        <div className="title">팔로워</div>

        <img
          className="close-button"
          alt="Close"
          src="https://c.animaapp.com/sj13U7Z6/img/frame.svg"
          onClick={onClose}
        />

        <div className="tab-container">
          <div
            className={`tab ${activeTab === "followers" ? "active" : "inactive"}`}
            onClick={() => handleTabClick("followers")}
          >
            팔로워
          </div>
          <div className="tab-underline" />
          <div
            className={`tab ${activeTab === "followings" ? "active" : "inactive"}`}
            onClick={() => handleTabClick("followings")}
          >
            팔로잉
          </div>
        </div>
      </div>
    </div>
  );
};
