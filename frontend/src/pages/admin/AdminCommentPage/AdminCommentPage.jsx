import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar/Sidebar";
import { CommentManagement } from "../CommentManagement/CommentManagement"; // 경로는 실제 위치에 맞게 수정
import "./AdminCommentPage.css";

const AdminCommentPage = () => {
  return (
    <div className="admin-page-wrapper">
      <Sidebar />
      <div className="admin-content">
        <CommentManagement />
      </div>
    </div>
  );
};

export default AdminCommentPage;
