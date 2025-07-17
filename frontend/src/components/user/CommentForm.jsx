import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/CommentForm.css";

const CommentForm = ({ recipeId, userId, isEditing = false, initialText = "", onSuccess, onCancel }) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef(null);
  const maxLength = 300;

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axiosInstance.post(`/api/recipes/${recipeId}/comments`, {
        userId,
        content: text.trim(),
      });
      setText("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  return (
    <form className={`comment-form ${isEditing ? "editing" : ""}`} onSubmit={handleSubmit}>
      <h3 className="comment-form-title">{isEditing ? "댓글 수정" : "댓글 작성"}</h3>
      <textarea
        ref={textareaRef}
        className="comment-textarea"
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) setText(e.target.value);
        }}
        rows={4}
      />
      <div className="comment-form-info">
        <span className="comment-form-charcount">{text.length} / {maxLength}</span>
      </div>
      <div className="comment-form-actions">
        <button type="button" className="comment-button comment-button-secondary" onClick={onCancel}>
          {isEditing ? "취소" : "닫기"}
        </button>
        <button type="submit" className="comment-button comment-button-primary" disabled={!text.trim()}>
          {isEditing ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
