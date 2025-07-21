import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CommentForm from "./CommentForm";
import "../../styles/user/CommentItem.css";

const CommentItem = ({ comment, recipeId, postAuthorId, onAfterChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [liked, setLiked] = useState(comment.liked || false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [isReplying, setIsReplying] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/recipes/comments/${comment.commentId}`);
        onAfterChange();
      } catch (err) {
        console.error("댓글 삭제 실패", err);
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm("이 댓글을 신고하시겠습니까?")) {
      try {
        await axiosInstance.post(`/api/recipes/comments/${comment.commentId}/report`);
        alert("댓글이 신고되었습니다.");
      } catch (err) {
        console.error("댓글 신고 실패", err);
      }
    }
  };

  const handleSaveEdit = async (newText) => {
    try {
      await axiosInstance.patch(`/api/recipes/comments/${comment.commentId}`, {
        content: newText,
      });
      setIsEditing(false);
      onAfterChange();
    } catch (err) {
      console.error("댓글 수정 실패", err);
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await axiosInstance.delete(`/api/recipes/comments/${comment.commentId}/like`);
        setLikeCount((prev) => prev - 1);
      } else {
        await axiosInstance.post(`/api/recipes/comments/${comment.commentId}/like`);
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("좋아요 처리 실패", err);
    }
  };

  const isEdited = new Date(comment.updatedAt).getTime() !== new Date(comment.createdAt).getTime();

  return (
    <div className={`comment-item-wrapper ${comment.parentId ? "reply" : ""}`}>
      <article className="comment-card">
        <div className="comment-header">
          <div className="comment-user-info">
            <strong className="comment-username">{comment.username}</strong>
            {comment.userId === postAuthorId && (
              <span className="comment-author-badge">작성자</span>
            )}
            <div className="comment-user-meta">
              @{comment.userId} · {new Date(comment.createdAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {isEdited && <span className="comment-edited-label">(수정됨)</span>}
            </div>
          </div>
        </div>

        <div className="comment-content">
          {isEditing ? (
            <CommentForm
              isEditing
              initialText={comment.content}
              recipeId={recipeId}
              parentId={comment.parentId}
              onCancel={() => setIsEditing(false)}
              onSuccess={handleSaveEdit}
            />
          ) : (
            <p>{comment.content}</p>
          )}
        </div>

        {!isEditing && (
          <div className="comment-actions">
            <span className="comment-like" onClick={toggleLike}>
              {liked ? "❤️" : "🤍"} {likeCount}
            </span>

            {comment.isMine && (
              <>
                <button className="comment-action-button" onClick={() => setIsEditing(true)}>수정</button>
                <button className="comment-action-button" onClick={handleDelete}>삭제</button>
              </>
            )}

            <button className="comment-action-button" onClick={handleReport}>신고</button>
            <button className="comment-action-button" onClick={() => setIsReplying(!isReplying)}>답글</button>
          </div>
        )}

        {isReplying && (
          <div className="comment-reply-form">
            <CommentForm
              recipeId={recipeId}
              parentId={comment.commentId}
              onSuccess={() => {
                onAfterChange();
                setIsReplying(false);
              }}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
      </article>

      {comment.children && comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map((child) => (
            <CommentItem
              key={child.commentId}
              comment={child}
              recipeId={recipeId}
              postAuthorId={postAuthorId}
              onAfterChange={onAfterChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
