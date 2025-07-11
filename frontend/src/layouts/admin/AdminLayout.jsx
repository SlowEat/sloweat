import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./AdminLayout.css"; // 레이아웃용 스타일

export const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
};
