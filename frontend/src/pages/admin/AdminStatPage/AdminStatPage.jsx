import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar/Sidebar";
import { StatReport } from "../StatReport/StatReport"; // 실제 경로에 맞게 조정
import "./AdminStatPage.css";

const AdminStatPage = () => {
  return (
    <div className="admin-stat-wrapper">
      <Sidebar />
      <div className="admin-stat-content">
        <StatReport />
      </div>
    </div>
  );
};

export default AdminStatPage;
