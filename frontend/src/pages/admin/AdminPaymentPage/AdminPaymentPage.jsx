import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar/Sidebar";
import { PaymentManagement } from "../PaymentManagement/PaymentManagement"; // 경로는 실제 위치에 맞게 수정
import "../../../styles/admin/AdminLayout.css"; // 공통 레이아웃 스타일

const AdminPaymentPage = () => {
  return (
    <div className="admin-page-wrapper">
      <Sidebar />
      <div className="admin-content">
        <PaymentManagement />
      </div>
    </div>
  );
};

export default AdminPaymentPage;
