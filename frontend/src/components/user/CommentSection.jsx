import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/CommentSection.css";

const CommentSection = ({ recipeId, userId, postAuthorId }) => {
  const [comments, setComments] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const fetchComments = async (page = 0) => {
    try {
      const res = await axiosInstance.get(
        `/api/recipes/${recipeId}/comments?page=${page}&size=${pageSize}`
      );
      const flatComments = res.data.content;

      const commentMap = {};
      flatComments.forEach((c) => {
        commentMap[c.commentId] = { ...c, children: [] };
      });
      const nested = [];
      flatComments.forEach((c) => {
        if (c.parentId && commentMap[c.parentId]) {
          commentMap[c.parentId].children.push(commentMap[c.commentId]);
        } else {
          nested.push(commentMap[c.commentId]);
        }
      });

      setComments(nested);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);
    } catch (err) {
      console.error("댓글 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const handlePageChange = (page) => {
    fetchComments(page);
  };

  return (
    <section className="comment-section">
      <header className="comment-section-header">
        <h2 className="comment-section-title">댓글</h2>
        {!isCreating && (
          <button
            className="comment-create-button"
            onClick={() => setIsCreating(true)}
          >
            댓글 작성
          </button>
        )}
      </header>

      {isCreating && (
        <CommentForm
          recipeId={recipeId}
          userId={userId}
          onSuccess={() => {
            fetchComments(0);
            setIsCreating(false);
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            recipeId={recipeId}
            userId={userId}
            postAuthorId={postAuthorId}
            onAfterChange={() => fetchComments(currentPage)}
          />
        ))}
      </div>

      <div className="comment-pagination">
        <button
          className="comment-page-button"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`comment-page-button ${i === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="comment-page-button"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </section>
  );
};

export default CommentSection;
