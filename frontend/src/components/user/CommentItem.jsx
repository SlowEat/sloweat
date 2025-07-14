import React, { useState, useRef, useEffect } from "react";
import CommentForm from "./CommentForm";
import "../../styles/user/CommentItem.css";

const CommentItem = ({
  comment,
  isEditing,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  onReport,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditedMessage, setShowEditedMessage] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const safeComment = {
    id: comment.id,
    authorName: comment.authorName || "익명",
    authorHandle: comment.authorHandle || "@anonymous",
    time: comment.time || "방금 전",
    text: comment.text || "",
    profileImage:
      comment.profileImage ||
      "https://c.animaapp.com/av5iO7ib/img/image-2@2x.png",
    edited: comment.edited || false,
  };

  const handleMoreClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleEditClick = () => {
    onEdit();
    setShowDropdown(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      onDelete(safeComment.id);
    }
    setShowDropdown(false);
  };

  const handleReportClick = () => {
    onReport(safeComment.id);
    setShowDropdown(false);
  };

  // 수정 완료 시 메시지 표시
  const handleSave = (text) => {
    onSaveEdit(text);
    setShowEditedMessage(true);
    setTimeout(() => setShowEditedMessage(false), 2000);
  };

  return (
    <article className="comment-card">
      <div className="comment-card-container">
        <div className="comment-card-more-container" ref={dropdownRef}>
          <button
            className="comment-card-more-button"
            aria-label="더 보기"
            onClick={handleMoreClick}
          >
            <img
              className="comment-card-more-icon"
              src="https://c.animaapp.com/av5iO7ib/img/----1.svg"
              alt="더 보기 아이콘"
            />
          </button>
          {showDropdown && (
            <div className="comment-dropdown-menu">
              <button
                className="comment-dropdown-item comment-dropdown-edit"
                onClick={handleEditClick}
              >
                수정
              </button>
              <button
                className="comment-dropdown-item comment-dropdown-delete"
                onClick={handleDeleteClick}
              >
                삭제
              </button>
              <button
                className="comment-dropdown-item comment-dropdown-report"
                onClick={handleReportClick}
              >
                신고
              </button>
            </div>
          )}
        </div>

        <div className="comment-card-body">
          <img
            className="comment-card-profile-image"
            src={safeComment.profileImage}
            alt={`${safeComment.authorName} 프로필 이미지`}
            onError={(e) => {
              e.target.src =
                "https://c.animaapp.com/av5iO7ib/img/image-2@2x.png";
            }}
          />
          <div className="comment-card-user-info">
            <div className="comment-card-user-meta">
              <h2 className="comment-card-username">{safeComment.authorName}</h2>
              <span className="comment-card-user-handle">
                {safeComment.authorHandle}
              </span>
              <span className="comment-card-separator">·</span>
              <time className="comment-card-time">{safeComment.time}</time>
              {safeComment.edited && !isEditing && (
                <span className="comment-edited-label"> (수정됨)</span>
              )}
            </div>

            {isEditing ? (
              <CommentForm
                initialText={safeComment.text}
                onSubmit={handleSave}
                onCancel={onCancelEdit}
                isEditing={true}
              />
            ) : (
              <>
                <p className="comment-card-text">{safeComment.text}</p>
                {showEditedMessage && (
                  <div className="edited-message">수정되었습니다.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
