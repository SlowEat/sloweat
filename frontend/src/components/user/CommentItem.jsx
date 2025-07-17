import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CommentForm from "./CommentForm";
import "../../styles/user/CommentItem.css";

const CommentItem = ({ comment, recipeId, userId, onAfterChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/recipes/comments/${comment.commentId}`, {
          params: { userId },
        });
        onAfterChange();
      } catch (err) {
        console.error("댓글 삭제 실패", err);
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm("이 댓글을 신고하시겠습니까?")) {
      try {
        await axiosInstance.post(`/api/recipes/comments/${comment.commentId}/report`, {
          userId,
        });
        alert("댓글이 신고되었습니다.");
      } catch (err) {
        console.error("댓글 신고 실패", err);
      }
    }
  };

  const handleSaveEdit = async (newText) => {
    try {
      await axiosInstance.patch(`/api/recipes/comments/${comment.commentId}`, {
        userId,
        content: newText,
      });
      setIsEditing(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      onAfterChange();
    } catch (err) {
      console.error("댓글 수정 실패", err);
    }
  };

  return (
    <article className="comment-card">
      <div className="comment-card-container">
        <div className="comment-card-body">
          <img className="comment-card-profile-image" src="https://c.animaapp.com/av5iO7ib/img/image-2@2x.png" alt="profile" />
          <div className="comment-card-user-info">
            <div className="comment-card-user-meta">
              <h2 className="comment-card-username">{comment.username}</h2>
              <span className="comment-card-user-handle">@{comment.userId}</span>
              <span className="comment-card-separator">·</span>
              <time className="comment-card-time">{new Date(comment.createdAt).toLocaleString()}</time>
            </div>

            {isEditing ? (
              <CommentForm
                isEditing
                initialText={comment.content}
                recipeId={recipeId}
                userId={userId}
                onCancel={() => setIsEditing(false)}
                onSuccess={handleSaveEdit}
              />
            ) : (
              <>
                <p className="comment-card-text">{comment.content}</p>
                {showMessage && <div className="edited-message">수정되었습니다.</div>}
              </>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="comment-actions">
            {userId === comment.userId ? (
              <>
                <button onClick={() => setIsEditing(true)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            ) : (
              <button onClick={handleReport}>신고</button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentItem;
