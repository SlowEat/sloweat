import React, { useEffect, useState } from "react";
import "./StatReport.css";
import { fetchAdminStatistics } from "../../../api/admin/adminStatistics";

const StatReport = () => {
  const [totalSales, setTotalSales] = useState(2970000);
  const [paidUsers, setPaidUsers] = useState(1234);
  const [totalUsers, setTotalUsers] = useState(1684);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await fetchAdminStatistics();

        setTotalSales(data.totalSales);
        setPaidUsers(data.paidUserCount);
        setTotalUsers(data.totalUserCount);

        // 두 배열을 month 기준으로 merge
        const merged = data.monthlySales.map((salesItem) => {
          const signupItem = data.monthlySignups.find(
            (item) => item.month === salesItem.month
          );
          return {
            month: salesItem.month,
            sales: salesItem.totalSales,
            users: signupItem?.signupCount || 0,
          };
        });
        // 오래된 달 부터 최신 달까지 정렬
        merged.sort((a, b) => a.month.localeCompare(b.month));

        setMonthlyData(merged);
      } catch (error) {
        console.error("통계 데이터 조회 실패:", error);
      }
    };

    loadStatistics();
  }, []);

  const maxSales = Math.max(...monthlyData.map((d) => d.sales), 1); // 0으로 나눔 방지
  const maxUsers = Math.max(...monthlyData.map((d) => d.users), 1);
  const barAreaHeight = 140;

  return (
    <div className="stat-wrapper">
      <div className="stat-content-box">
        <h1 className="stat-title">통계 리포트</h1>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-title">총 매출</div>
            <div className="stat-card-value">
              ₩{totalSales.toLocaleString()}
            </div>
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
          ※ 해당 달을 제외한 최신 6개월의 통계 데이터입니다. 그래프는 최대값을
          기준으로 상대적으로 나타납니다.
        </div>
      </div>
    </div>
  );
};

export default StatReport;
