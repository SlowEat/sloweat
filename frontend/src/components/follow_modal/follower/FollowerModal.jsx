import React from "react";
import { FollowerHeader } from "./FollowerHeader";
import { FollowerCard } from "./FollowerCard";
import "./FollowerModal.css";

export const FollowerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const followers = [
    { username: "베이킹퀸", id: "@baking_queen", count: "12.5K", following: true, img: "https://c.animaapp.com/sj13U7Z6/img/image-4@2x.png" },
    { username: "파스타마스터", id: "@pasta_master", count: "8.3K", following: true, img: "https://via.placeholder.com/40" },
    { username: "홈쿡킹", id: "@home_cooking", count: "15.2K", following: false, img: "https://via.placeholder.com/40" },
    { username: "건강요리사", id: "@healthy_chef", count: "6.7K", following: true, img: "https://via.placeholder.com/40" },
    { username: "디저트퀸", id: "@dessert_queen", count: "9.1K", following: false, img: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="follower-modal-overlay" onClick={onClose}>
      <div className="follower-modal" onClick={(e) => e.stopPropagation()}>
        <FollowerHeader onClose={onClose} />
        <div className="follower-list">
          {followers.map((f, index) => (
            <FollowerCard
              key={index}
              username={f.username}
              userId={f.id}
              followerCount={f.count}
              isFollowing={f.following}
              profileImg={f.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
