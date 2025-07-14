import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ReportForm from "./ReportForm";
import "../../styles/user/CommentSection.css";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      authorName: "요리초보",
      authorHandle: "@beginner_cook",
      time: "2시간 전",
      text: "정말 맛있어 보여요! 레시피 따라해볼게요 👍",
      profileImage: "https://c.animaapp.com/av5iO7ib/img/image-2@2x.png",
      edited: false,
    },
    {
      id: 2,
      authorName: "요리고수",
      authorHandle: "@pro_cook",
      time: "1시간 전",
      text: "이 레시피 대박입니다!!",
      profileImage: "https://c.animaapp.com/av5iO7ib/img/image-4@2x.png",
      edited: false,
    },
  ]);

  // 댓글 수정중인 id
  const [editingCommentId, setEditingCommentId] = useState(null);

  // 신고 관련
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportingCommentId, setReportingCommentId] = useState(null);

  // 댓글 작성폼 열기
  const [isCreating, setIsCreating] = useState(false);

  // 댓글 수정 시작
  const handleStartEdit = (commentId) => {
    setEditingCommentId(commentId);
    setIsCreating(false); // 작성폼 닫기
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  // 댓글 수정 저장
  const handleSaveEdit = (commentId, newText) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, text: newText, edited: true } : c
      )
    );
    setEditingCommentId(null);
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  // 신고 클릭
  const handleReportComment = (commentId) => {
    setReportingCommentId(commentId);
    setIsReportOpen(true);
  };

  // 신고 폼 제출
  const handleReportSubmit = (reason) => {
    alert("댓글이 신고되었습니다. 검토 후 조치하겠습니다.");
    setIsReportOpen(false);
    setReportingCommentId(null);
  };

  // 댓글 작성 시작
  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingCommentId(null); // 수정 폼 닫기
  };

  // 댓글 작성 취소
  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  // 댓글 작성 저장
  const handleSaveCreate = (text) => {
    const newComment = {
      id: Date.now(),
      authorName: "현재유저", // 실제 로그인 유저 데이터로 변경 필요
      authorHandle: "@currentuser",
      time: "방금 전",
      text,
      profileImage:
        "https://c.animaapp.com/av5iO7ib/img/image-2@2x.png", // 기본 이미지
      edited: false,
    };
    setComments((prev) => [newComment, ...prev]);
    setIsCreating(false);
  };

  return (
    <section className="comment-section">
      <header className="comment-header">
        <h2 className="comment-title">댓글 ({comments.length})</h2>
        {!isCreating && (
          <button className="comment-create-button" onClick={handleStartCreate}>
            댓글 작성
          </button>
        )}
      </header>

      {isCreating && (
        <CommentForm
          onSubmit={handleSaveCreate}
          onCancel={handleCancelCreate}
          isEditing={false}
        />
      )}

      <div className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isEditing={editingCommentId === comment.id}
            onEdit={() => handleStartEdit(comment.id)}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={(text) => handleSaveEdit(comment.id, text)}
            onDelete={handleDeleteComment}
            onReport={handleReportComment}
          />
        ))}
      </div>

      <ReportForm
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </section>
  );
};

export default CommentSection;
