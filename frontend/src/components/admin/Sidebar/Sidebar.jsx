import React from "react";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRecipePage =
    location.pathname === "/admin" || location.pathname === "/admin/recipes";

  return (
    <aside className="sidebar">
      {/* 로고 영역 */}
      <div className="sidebar-logo">
        <img
          src="https://c.animaapp.com/rgpZJ8Rs/img/sloweat-logo-1@2x.png"
          alt="SLOWEAT Logo"
          className="sidebar-logo-img"
        />
        <div className="sidebar-logo-text">ADMIN</div>
      </div>

      {/* 메뉴 영역 */}
      <nav className="sidebar-menu">
        <div
          className={`sidebar-item ${isRecipePage ? "active" : ""}`}
          onClick={() => navigate("/admin/recipes")}
        >
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/frame.svg"
            alt="게시물 관리"
            className="sidebar-icon"
          />
          <span className="sidebar-label">게시물 관리</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname === "/admin/comments" ? "active" : ""}`}
          onClick={() => navigate("/admin/comments")}
        >
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/frame-1.svg"
            alt="댓글 관리"
            className="sidebar-icon"
          />
          <span className="sidebar-label">댓글 관리</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname === "/admin/users" ? "active" : ""}`}
          onClick={() => navigate("/admin/users")}
        >
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/frame-2.svg"
            alt="회원 관리"
            className="sidebar-icon"
          />
          <span className="sidebar-label">회원 관리</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname === "/admin/payments" ? "active" : ""}`}
          onClick={() => navigate("/admin/payments")}
        >
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/frame-3.svg"
            alt="결제 관리"
            className="sidebar-icon"
          />
          <span className="sidebar-label">결제 관리</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname === "/admin/statistics" ? "active" : ""}`}
          onClick={() => navigate("/admin/statistics")}
        >
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/------.svg"
            alt="통계 리포트"
            className="sidebar-icon"
          />
          <span className="sidebar-label">통계 리포트</span>
        </div>
      </nav>

      {/* 사용자 정보 */}
      <div className="sidebar-user">
        <div className="sidebar-user-top">
          <img
            src="https://c.animaapp.com/rgpZJ8Rs/img/image@2x.png"
            alt="관리자 프로필"
            className="user-avatar"
          />
          <div className="user-texts">
            <div className="user-name">관리자</div>
            <div className="user-handle">@admin</div>
          </div>
        </div>
        <button className="logout-button">로그아웃</button>
      </div>
    </aside>
  );
};
