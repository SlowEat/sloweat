import React, { useState, useEffect, useRef } from "react";
import "../../styles/user/CommentForm.css";

const CommentForm = ({
  initialText = "",
  onSubmit,
  onCancel,
  isEditing = false,
  maxLength = 300,
}) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    if (!isEditing) setText("");
  };

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  return (
    <form className={`comment-form ${isEditing ? "editing" : ""}`} onSubmit={handleSubmit}>
      <h3 className="comment-form-title">
        {isEditing ? "댓글 수정" : "댓글 작성"}
      </h3>
      <textarea
        ref={textareaRef}
        className="comment-textarea"
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={handleChange}
        rows={4}
      />
      <div className="comment-form-info">
        <span className="comment-form-charcount">{text.length} / {maxLength}</span>
      </div>
      <div className="comment-form-actions">
        <button
          type="button"
          className="comment-button comment-button-secondary"
          onClick={onCancel}
        >
          {isEditing ? "취소" : "닫기"}
        </button>
        <button
          type="submit"
          className="comment-button comment-button-primary"
          disabled={!text.trim()}
        >
          {isEditing ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
