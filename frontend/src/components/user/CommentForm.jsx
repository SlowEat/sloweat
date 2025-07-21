import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/CommentForm.css";

const CommentForm = ({
  recipeId,
  isEditing = false,
  initialText = "",
  parentId = null,
  onSuccess,
  onCancel,
}) => {
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
        content: text.trim(),
        parentId: parentId,
      });
      setText("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="comment-textarea"
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) setText(e.target.value);
        }}
        rows={3}
      />
      <div className="comment-form-footer">
        <span className="comment-char-count">
          {text.length} / {maxLength}
        </span>
        <div className="comment-button-group">
          <button
            type="button"
            className="comment-button cancel"
            onClick={onCancel}
          >
            {isEditing ? "취소" : "닫기"}
          </button>
          <button
            type="submit"
            className="comment-button submit"
            disabled={!text.trim()}
          >
            {isEditing ? "수정" : "등록"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
