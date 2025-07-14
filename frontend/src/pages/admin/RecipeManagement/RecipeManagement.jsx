import React, { useEffect, useState } from "react";
import "./RecipeManagement.css";

const RecipeManagement = () => {
  const [posts, setPosts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("전체");

  useEffect(() => {
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

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredPosts =
      filterStatus === "전체"
          ? posts
          : posts.filter((post) => post.status === filterStatus);

  return (
      <div className="recipe-wrapper">
        <div className="recipe-content-box">
          <div className="recipe-page-header">
            <h1 className="recipe-page-title">게시물 관리</h1>
            <div className="recipe-search">
              <input
                  type="text"
                  placeholder="검색..."
                  className="recipe-search-input"
              />
              <img
                  src="https://c.animaapp.com/rgpZJ8Rs/img/frame-4.svg"
                  alt="검색"
                  className="recipe-search-icon"
              />
            </div>
          </div>

          <div className="recipe-filter-bar">
            <div className="recipe-section-title">게시물 목록</div>
            <select
                className="recipe-status-filter"
                value={filterStatus}
                onChange={handleFilterChange}
            >
              <option value="전체">전체</option>
              <option value="정상">정상</option>
              <option value="신고됨">신고됨</option>
            </select>
          </div>

          <section className="recipe-table">
            <div className="recipe-grid recipe-table-header">
              <span>ID</span>
              <span>제목</span>
              <span>작성자</span>
              <span>작성일</span>
              <span>신고수</span>
              <span>상태</span>
              <span>작업</span>
            </div>

            {filteredPosts.map((post) => (
                <div className="recipe-grid recipe-table-row" key={post.id}>
                  <span>{post.id}</span>
                  <p>{post.title}</p>
                  <span>{post.author}</span>
                  <span>{post.createdAt}</span>
                  <span>
                <span
                    className={`recipe-badge ${
                        post.reportCount > 0 ? "reported" : "normal"
                    }`}
                >
                  {post.reportCount}
                </span>
              </span>
                  <span>
                <span
                    className={`recipe-badge ${
                        post.status === "정상" ? "status-normal" : "status-reported"
                    }`}
                >
                  {post.status}
                </span>
              </span>
                  <span>
                <div className="recipe-action-wrapper">
                  {post.status === "신고됨" ? (
                      <button className="recipe-delete-btn">삭제</button>
                  ) : (
                      <span className="recipe-action-placeholder">-</span>
                  )}
                </div>
              </span>
                </div>
            ))}
          </section>
        </div>
      </div>
  );
};

export default RecipeManagement;
