import React, { useEffect, useState } from "react";
import "./PaymentManagement.css";
import {
  fetchAdminPayments,
  rejectRefundBySubscriptionId,
  approveRefundBySubscriptionId,
} from "../../../api/admin/adminPayment";

// 페이지 번호 목록 계산 + 블록 단위 페이징 구현 함수
const getPaginationRange = (currentPage, totalPages, blockSize = 5) => {
  const currentBlock = Math.floor(currentPage / blockSize);
  const startPage = currentBlock * blockSize;
  const endPage = Math.min(startPage + blockSize, totalPages);

  const range = [];
  for (let i = startPage; i < endPage; i++) {
    range.push(i);
  }

  return {
    range,
    hasPrevBlock: startPage > 0,
    hasNextBlock: endPage < totalPages,
    prevBlockPage: startPage - 1,
    nextBlockPage: endPage,
  };
};

// 상태값 영어 -> 한글
const statusMap = {
  PAID: "결제완료",
  REQUEST: "환불요청",
  COMPLETE: "환불완료",
  REJECT: "환불거절",
};

// 상태값 한글 -> 영어
const reverseStatusMap = {
  전체: null,
  결제완료: "PAID",
  환불요청: "REQUEST",
  환불완료: "COMPLETE",
  환불거절: "REJECT",
};

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [nicknameKeyword, setNicknameKeyword] = useState(""); // 닉네임 검색
  const [filterStatus, setFilterStatus] = useState("전체"); // 상태 필터 상태 추가

  // 구독 내역 로딩
  const loadPayments = async (
    page = 0,
    nickname = nicknameKeyword,
    status = filterStatus
  ) => {
    try {
      const response = await fetchAdminPayments({
        nickname: nickname || undefined,
        status: reverseStatusMap[status],
        page: page,
        size: 9,
      });

      // 백엔드에서 받은 데이터 프론트 형식으로 변환
      const formatted = response.content.map((item) => ({
        id: item.id,
        nickname: item.nickname,
        date: formatDate(item.payDate),
        amount: `${item.amount.toLocaleString()}원`,
        period: item.subscriptionPeriod,
        status: statusMap[item.status],
      }));
      setPayments(formatted);
      setPage(page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("결제 목록 불러오기 실패", err);
    }
  };

  // 날짜 포맷 함수(yyyy-mm-dd)
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  // 필터 변경 시 데이터 로딩
  useEffect(() => {
    loadPayments(page, nicknameKeyword, filterStatus);
  }, [filterStatus]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // 환불 승인 처리 함수
  const handleRefundApprove = async (subscriptionId) => {
    try {
      await approveRefundBySubscriptionId(subscriptionId);
      alert("환불 승인 완료");
      await loadPayments(page, nicknameKeyword, filterStatus);
    } catch (err) {
      console.error("승인 처리 실패", err);
    }
  };

  // 환불 거절 처리 함수
  const handleRefundReject = async (subscriptionId) => {
    try {
      await rejectRefundBySubscriptionId(subscriptionId);
      alert("환불 거절 완료");
      await loadPayments(page, nicknameKeyword, filterStatus);
    } catch (err) {
      console.error("거절 처리 실패", err);
    }
  };

  // 페이징 범위 계산
  const { range, hasPrevBlock, hasNextBlock, prevBlockPage, nextBlockPage } =
    getPaginationRange(page, totalPages);

  return (
    <div className="payment-wrapper">
      <div className="payment-content-box">
        <div className="payment-page-header">
          <h1 className="payment-page-title">결제 관리</h1>
          <div className="payment-search">
            <input
              type="text"
              placeholder="닉네임 검색"
              className="payment-search-input"
              value={nicknameKeyword}
              onChange={(e) => setNicknameKeyword(e.target.value)}
            />
            <button
              className="payment-search-button"
              onClick={() => loadPayments(0)}
            >
              검색
            </button>
          </div>
        </div>

        {/* 필터 선택 */}
        <div className="payment-filter-bar">
          <div className="payment-section-title">결제 내역</div>
          <select
            className="payment-status-filter"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="전체">전체</option>
            <option value="결제완료">결제완료</option>
            <option value="환불요청">환불요청</option>
            <option value="환불거절">환불거절</option>
          </select>
        </div>

        {/* 구독 내역 테이블 */}
        <section className="payment-table">
          <div className="payment-table-header payment-grid">
            <span>구독 ID</span>
            <span>닉네임</span>
            <span>결제일</span>
            <span>금액</span>
            <span>기간</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {payments.map((payment) => (
            <div className="payment-table-row payment-grid" key={payment.id}>
              <span>{payment.id}</span>
              <span>{payment.nickname}</span>
              <span>{payment.date}</span>
              <span>{payment.amount}</span>
              <span>{payment.period}</span>
              <span>
                <span
                  className={`payment-badge ${
                    payment.status === "결제완료"
                      ? "payment-complete"
                      : payment.status === "환불요청"
                      ? "payment-requested"
                      : "payment-refunded"
                  }`}
                >
                  {payment.status}
                </span>
              </span>
              <span>
                {/* 환불 요청 상태일 때만 승인/거절 버튼 표시 */}
                {payment.status === "환불요청" ? (
                  <span className="payment-action-wrapper">
                    <button
                      className="payment-approve-btn"
                      onClick={() => handleRefundApprove(payment.id)}
                    >
                      승인
                    </button>
                    <button
                      className="payment-reject-btn"
                      onClick={() => handleRefundReject(payment.id)}
                    >
                      거절
                    </button>
                  </span>
                ) : (
                  <span>-</span>
                )}
              </span>
            </div>
          ))}
        </section>

        {/* 페이징 */}
        <div className="user-pagination">
          <button
            className="user-page-btn"
            disabled={page === 0}
            onClick={() => loadPayments(0)}
          >
            &laquo;
          </button>
          <button
            className="user-page-btn"
            disabled={!hasPrevBlock}
            onClick={() => loadPayments(prevBlockPage)}
          >
            &lt;
          </button>
          {range.map((p) => (
            <button
              key={p}
              className={`recipe-page-btn ${p === page ? "active" : ""}`}
              onClick={() => loadPayments(p)}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="user-page-btn"
            disabled={!hasNextBlock}
            onClick={() => loadPayments(nextBlockPage)}
          >
            &gt;
          </button>
          <button
            className="user-page-btn"
            disabled={page === totalPages - 1}
            onClick={() => loadPayments(totalPages - 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
