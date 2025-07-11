import React, { useEffect, useState } from "react";
import "./CommentManagement.css"; // 스타일은 필요에 따라 따로 분리

export const CommentManagement = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 더미 데이터 (추후 API 연동)
    const dummyComments = [
      {
        id: 1,
        content: "정말 맛있어 보이네요! 레시피 감사합니다.",
        author: "김요리",
        postId: 1,
        createdAt: "2024-01-15",
        reportCount: 0,
        status: "정상",
      },
      {
        id: 2,
        content: "이런 쓰레기 음식 누가 먹어",
        author: "악플러",
        postId: 2,
        createdAt: "2024-01-14",
        reportCount: 5,
        status: "신고됨",
      },
      {
        id: 3,
        content: "집에서 따라 만들어봤는데 정말 맛있었어요!",
        author: "홈쿡러버",
        postId: 3,
        createdAt: "2024-01-13",
        reportCount: 0,
        status: "정상",
      },
    ];

    setComments(dummyComments);
  }, []);

  return (
    <div className="recipe-wrapper">
      <div className="recipe-content-box">
        {/* 상단 제목 + 검색 */}
        <div className="page-header">
          <h1 className="page-title">댓글 관리</h1>
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
        <div className="section-title">댓글 목록</div>

        {/* 댓글 테이블 */}
        <section className="recipe-table">
          <div className="table-header">
            <span>ID</span>
            <span>내용</span>
            <span>작성자</span>
            <span>게시물 ID</span>
            <span>작성일</span>
            <span>신고수</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {comments.map((comment) => (
            <div className="table-row" key={comment.id}>
              <span>{comment.id}</span>
              <p>{comment.content}</p>
              <span>{comment.author}</span>
              <span>{comment.postId}</span>
              <span>{comment.createdAt}</span>
              <span className={`badge ${comment.reportCount > 0 ? "reported" : "normal"}`}>
                {comment.reportCount}
              </span>
              <span
                className={`badge ${
                  comment.status === "정상" ? "status-normal" : "status-reported"
                }`}
              >
                {comment.status}
              </span>
              {comment.status === "신고됨" ? (
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
