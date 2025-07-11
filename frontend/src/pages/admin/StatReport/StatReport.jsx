import React, { useEffect, useState } from "react";
import "./StatReport.css";

export const StatReport = () => {
  const [totalSales, setTotalSales] = useState(2970000);
  const [paidUsers, setPaidUsers] = useState(1234);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const dummyMonthly = [
      { month: "2024-01", sales: 1470000, users: 1350 },
      { month: "2024-02", sales: 2850000, users: 1240 },
      { month: "2024-03", sales: 2010000, users: 880 },
      { month: "2024-04", sales: 2960000, users: 1320 },
      { month: "2024-05", sales: 1230000, users: 870 },
      { month: "2024-06", sales: 2370000, users: 1100 },
    ];
    setMonthlyData(dummyMonthly);
  }, []);

  return (
    <div className="stat-wrapper">
      <div className="stat-content-box">
        <h1 className="stat-title">통계 리포트</h1>
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-title">총 매출</div>
            <div className="stat-card-value">₩{totalSales.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">유료회원</div>
            <div className="stat-card-value">{paidUsers.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-chart-section">
          <h2 className="stat-section-title">월별 매출 및 가입자 수</h2>
          <div className="stat-chart">
            {monthlyData.map((data) => (
              <div className="stat-bar-group" key={data.month}>
                <div className="bar" style={{ height: `${data.sales / 30000}px` }}></div>
                <div className="label">{data.month}</div>
              </div>
            ))}
          </div>
          <div className="stat-chart-note">※ 실제 구현 시 Chart.js 또는 recharts 등으로 대체 가능</div>
        </div>
      </div>
    </div>
  );
};
