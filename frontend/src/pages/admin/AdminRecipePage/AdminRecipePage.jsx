import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar/Sidebar";
import { RecipeManagement } from "../RecipeManagement/RecipeManagement"; // 경로는 실제 위치에 맞게 수정
import "./AdminRecipePage.css";

const AdminRecipePage = () => {
  return (
    <div className="admin-page-wrapper">
      <Sidebar />
      <div className="admin-content">
        <RecipeManagement />
      </div>
    </div>
  );
};

export default AdminRecipePage;
