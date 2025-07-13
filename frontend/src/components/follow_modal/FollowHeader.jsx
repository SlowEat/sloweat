import React from "react";
import "./FollowHeader.css";

export const FollowHeader = ({activeTab, setActiveTab, onClose}) => {
  return (
    <div className="follow-header">
      <div className="header-container">
        <div className="title">
          {activeTab === "followers" ? "팔로워" : "팔로잉"}
        </div>

        <img
          className="close-button"
          alt="Close"
          src="https://c.animaapp.com/sj13U7Z6/img/frame.svg"
          onClick={onClose}
        />

        <div className="tab-container">
          <div
            className={`tab ${activeTab === "followers" ? "active" : ""}`}
            onClick={() => setActiveTab("followers")}
          >
            팔로워
          </div>
          <div
            className={`tab ${activeTab === "followings" ? "active" : ""}`}
            onClick={() => setActiveTab("followings")}
          >
            팔로잉
          </div>
          <div
            className="tab-underline"
            style={{
              transform: activeTab === "followers" ? "translateX(0%)" : "translateX(100%)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};
