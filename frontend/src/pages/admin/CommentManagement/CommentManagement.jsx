import React, { useEffect, useState } from "react";
import "./CommentManagement.css";

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("전체");

  useEffect(() => {
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

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredComments =
      filterStatus === "전체"
          ? comments
          : comments.filter((comment) => comment.status === filterStatus);

  return (
      <div className="comment-wrapper">
        <div className="comment-content-box">
          <div className="comment-page-header">
            <h1 className="comment-page-title">댓글 관리</h1>
            <div className="comment-search">
              <input
                  type="text"
                  placeholder="검색..."
                  className="comment-search-input"
              />
              <img
                  src="https://c.animaapp.com/rgpZJ8Rs/img/frame-4.svg"
                  alt="검색"
                  className="comment-search-icon"
              />
            </div>
          </div>

          <div className="comment-filter-bar">
            <div className="comment-section-title">댓글 목록</div>
            <select
                className="comment-status-filter"
                value={filterStatus}
                onChange={handleFilterChange}
            >
              <option value="전체">전체</option>
              <option value="정상">정상</option>
              <option value="신고됨">신고됨</option>
            </select>
          </div>

          <section className="comment-table">
            <div className="comment-grid comment-table-header">
              <span>ID</span>
              <span>내용</span>
              <span>작성자</span>
              <span>게시물 ID</span>
              <span>작성일</span>
              <span>신고수</span>
              <span>상태</span>
              <span>작업</span>
            </div>

            {filteredComments.map((comment) => (
                <div className="comment-grid comment-table-row" key={comment.id}>
                  <span>{comment.id}</span>
                  <p>{comment.content}</p>
                  <span>{comment.author}</span>
                  <span>{comment.postId}</span>
                  <span>{comment.createdAt}</span>
                  <span>
                <span
                    className={`comment-badge ${
                        comment.reportCount > 0 ? "reported" : "normal"
                    }`}
                >
                  {comment.reportCount}
                </span>
              </span>
                  <span>
                <span
                    className={`comment-badge ${
                        comment.status === "정상" ? "status-normal" : "status-reported"
                    }`}
                >
                  {comment.status}
                </span>
              </span>
                  <span className="comment-action-wrapper">
                {comment.status === "신고됨" ? (
                    <button className="comment-delete-btn">삭제</button>
                ) : (
                    <span className="comment-action-placeholder">-</span>
                )}
              </span>
                </div>
            ))}
          </section>
        </div>
      </div>
  );
};

export default CommentManagement;
