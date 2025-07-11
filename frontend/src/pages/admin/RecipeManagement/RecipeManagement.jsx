import React, { useEffect, useState } from "react";
import "./RecipeManagement.css";

export const RecipeManagement = () => {
  const [posts, setPosts] = useState([]);

  // 추후 fetch 또는 axios를 사용해 서버에서 데이터를 불러올 수 있도록 구조화
  useEffect(() => {
    // 예시 데이터 (나중에 DB에서 불러온 데이터로 교체)
    const dummyData = [
      {
        id: 1,
        title: "다이어트 중이신 분들을 위한 저칼로리 샐러드",
        author: "헬시쿡",
        createdAt: "2024-01-15",
        reportCount: 0,
        status: "정상",
      },
      {
        id: 2,
        title: "할머니의 손맛 그대로! 정통 김치찌개 끓이는 법",
        author: "한식마스터",
        createdAt: "2024-01-14",
        reportCount: 2,
        status: "신고됨",
      },
      {
        id: 3,
        title: "오늘 만든 크림 파스타 레시피 공유합니다!",
        author: "요리왕김셰프",
        createdAt: "2024-01-13",
        reportCount: 0,
        status: "정상",
      },
    ];

    setPosts(dummyData);
  }, []);

  return (
    <div className="recipe-wrapper">
      <div className="recipe-content-box">
        {/* 상단 제목 + 검색 */}
        <div className="page-header">
          <h1 className="page-title">게시물 관리</h1>
          <div className="recipe-search">
            <input type="text" placeholder="검색..." className="search-input" />
            <img
              src="https://c.animaapp.com/rgpZJ8Rs/img/frame-4.svg"
              alt="검색"
              className="search-icon"
            />
          </div>
        </div>

        {/* 섹션 제목 */}
        <div className="section-title">게시물 목록</div>

        {/* 게시물 테이블 */}
        <section className="recipe-table">
          <div className="table-header">
            <span>ID</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span>신고수</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {posts.map((post) => (
            <div className="table-row" key={post.id}>
              <span>{post.id}</span>
              <p>{post.title}</p>
              <span>{post.author}</span>
              <span>{post.createdAt}</span>
              <span className={`badge ${post.reportCount > 0 ? "reported" : "normal"}`}>
                {post.reportCount}
              </span>
              <span
                className={`badge ${
                  post.status === "정상" ? "status-normal" : "status-reported"
                }`}
              >
                {post.status}
              </span>
              {post.status === "신고됨" ? (
                <button className="delete-btn">삭제</button>
              ) : (
                <span>-</span>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
