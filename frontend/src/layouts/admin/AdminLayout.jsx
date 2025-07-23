import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/admin/Sidebar/Sidebar";
import "./AdminLayout.css"; // 레이아웃용 스타일

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
