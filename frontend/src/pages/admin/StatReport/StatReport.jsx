import React, { useEffect, useState } from "react";
import "./StatReport.css";

const StatReport = () => {
  const [totalSales, setTotalSales] = useState(2970000);
  const [paidUsers, setPaidUsers] = useState(1234);
  const [totalUsers, setTotalUsers] = useState(1684);
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

  const maxSales = Math.max(...monthlyData.map((d) => d.sales));
  const maxUsers = Math.max(...monthlyData.map((d) => d.users));
  const barAreaHeight = 140; // 실제 막대 렌더링 영역

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
              <div className="stat-card-title">유료 회원 수</div>
              <div className="stat-card-value">{paidUsers.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-title">전체 회원 수</div>
              <div className="stat-card-value">{totalUsers.toLocaleString()}</div>
            </div>
          </div>

          {/* 월별 매출 */}
          <div className="stat-chart-section">
            <h2 className="stat-section-title">월별 매출</h2>
            <div className="stat-chart">
              <div className="stat-bar-area">
                {monthlyData.map((data) => (
                    <div className="stat-bar-group" key={`sales-${data.month}`}>
                      <div
                          className="bar bar-sales"
                          style={{
                            height: `${(data.sales / maxSales) * barAreaHeight}px`,
                          }}
                      />
                      <div className="label">{data.month}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* 월별 가입자 수 */}
          <div className="stat-chart-section">
            <h2 className="stat-section-title">월별 가입자 수</h2>
            <div className="stat-chart">
              <div className="stat-bar-area">
                {monthlyData.map((data) => (
                    <div className="stat-bar-group" key={`users-${data.month}`}>
                      <div
                          className="bar bar-users"
                          style={{
                            height: `${(data.users / maxUsers) * barAreaHeight}px`,
                          }}
                      />
                      <div className="label">{data.month}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stat-chart-note">
            ※ 실제 구현 시 Chart.js 또는 Recharts 등으로 대체 가능
          </div>
        </div>
      </div>
  );
};

export default StatReport;
