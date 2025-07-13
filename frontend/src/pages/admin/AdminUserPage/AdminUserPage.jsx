import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar/Sidebar";
import { UserManagement } from "../UserManagement/UserManagement";
import "../../../styles/admin/AdminLayout.css"; // 공통 레이아웃 스타일

const AdminUserPage = () => {
  return (
    <div className="admin-page-wrapper">
      <Sidebar />
      <div className="admin-content">
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminUserPage;
