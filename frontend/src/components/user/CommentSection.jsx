import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/CommentSection.css";

const CommentSection = ({ recipeId, userId }) => {
  const [comments, setComments] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/api/recipes/${recipeId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("댓글 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  return (
    <section className="comment-section">
      <header className="comment-header">
        <h2 className="comment-title">댓글 ({comments.length})</h2>
        {!isCreating && (
          <button className="comment-create-button" onClick={() => setIsCreating(true)}>
            댓글 작성
          </button>
        )}
      </header>

      {isCreating && (
        <CommentForm
          recipeId={recipeId}
          userId={userId}
          onSuccess={() => {
            fetchComments();
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
            onAfterChange={fetchComments}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
