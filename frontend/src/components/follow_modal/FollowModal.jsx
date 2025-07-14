import React, {useState} from "react";
import { FollowHeader } from "./FollowHeader";
import { FollowCard } from "./FollowCard";
import "./FollowModal.css";

export const FollowModal = ({ isOpen, onClose, initialTab = "followers" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  
  React.useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const followers = [
    { username: "베이킹퀸", id: "@baking_queen", count: "12.5K", following: true, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "파스타마스터", id: "@pasta_master", count: "8.3K", following: true, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "홈쿡킹", id: "@home_cooking", count: "15.2K", following: false, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "건강요리사", id: "@healthy_chef", count: "6.7K", following: true, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "디저트퀸", id: "@dessert_queen", count: "9.1K", following: false, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
  ];

  const followings = [
    { username: "홈쿡킹", id: "@home_cooking", count: "15.2K", following: false, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "건강요리사", id: "@healthy_chef", count: "6.7K", following: true, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
    { username: "디저트퀸", id: "@dessert_queen", count: "9.1K", following: false, img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800" },
  ];

  // 현재 탭에 따라 보여줄 목록 선택
  const userList = activeTab === "followers" ? followers : followings;

  return (
    <div className="follow-modal-overlay" onClick={onClose}>
      <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
        <FollowHeader activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose} />
        <div className="follow-list">
          {userList.map((f, index) => (
            <FollowCard
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
