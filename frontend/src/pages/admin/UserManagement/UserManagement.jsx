import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import {
  fetchAdminUsers,
  fetchAdminUserById,
  banAdminUser,
  withdrawAdminUser,
  activateAdminUser,
} from "../../../api/admin/adminUser";

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
  ACTIVE: "활성",
  BANNED: "정지",
  WITHDRAWN: "탈퇴",
};

// 상태값 한글 -> 영어
const reverseStatusMap = {
  전체: null,
  활성: "ACTIVE",
  정지: "BANNED",
  탈퇴: "WITHDRAWN",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [selectedUser, setSelectedUser] = useState(null); // 상세보기용 선택된 사용자
  const [nicknameKeyword, setNicknameKeyword] = useState(""); // 닉네임 검색
  const [filterStatus, setFilterStatus] = useState("전체"); // 상태 필터 상태 추가

  // 회원 목록 로드
  const loadUsers = async (
    page = 0,
    nickname = nicknameKeyword,
    status = filterStatus
  ) => {
    try {
      const response = await fetchAdminUsers({
        nickname: nickname || undefined, // 닉네임 검색
        status: reverseStatusMap[status],
        page: page,
        size: 9,
      });
      const formatted = response.content.map((u) => ({
        id: u.id,
        nickname: u.nickname,
        email: u.email,
        joinedAt: u.createdAt.split("T")[0],
        status: statusMap[u.status] || u.status,
      }));
      setUsers(formatted);
      setPage(page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("회원 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    loadUsers(page, nicknameKeyword, filterStatus);
  }, [filterStatus]); // 상태 필터 변경 시 재조회

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = async (userId, newStatusKor) => {
    try {
      const statusEng = reverseStatusMap[newStatusKor];
      if (statusEng === "ACTIVE") await activateAdminUser(userId);
      if (statusEng === "BANNED") await banAdminUser(userId);
      if (statusEng === "WITHDRAWN") await withdrawAdminUser(userId);
      await loadUsers(page, nicknameKeyword, filterStatus); // 상태 변경 후 목록 새로고침
      handleCloseModal();
    } catch (err) {
      console.error("상태 변경 실패", err);
    }
  };

  const handleSearch = () => {
    setPage(0);
    loadUsers(0, nicknameKeyword, filterStatus); // 검색 시 필터 포함
  };

  const { range, hasPrevBlock, hasNextBlock, prevBlockPage, nextBlockPage } =
    getPaginationRange(page, totalPages, 5);

  return (
    <div className="user-wrapper">
      <div className="user-content-box">
        <div className="user-page-header">
          <h1 className="user-page-title">회원 관리</h1>
          <div className="user-search">
            <input
              type="text"
              placeholder="닉네임 검색"
              className="user-search-input"
              value={nicknameKeyword} // 상태 바인딩
              onChange={(e) => setNicknameKeyword(e.target.value)} // 업데이트
            />
            <button className="user-search-button" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>

        {/* 회원 목록 헤더 + 상태 필터 드롭다운 */}
        <div className="user-filter-bar">
          <div className="user-section-title">회원 목록</div>
          <select
            className="user-status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="활성">활성</option>
            <option value="정지">정지</option>
            <option value="탈퇴">탈퇴</option>
          </select>
        </div>

        <section className="user-table">
          <div className="user-table-header">
            <span>ID</span>
            <span>닉네임</span>
            <span>이메일</span>
            <span>가입일</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {users.map((user) => (
            <div className="user-table-row" key={user.id}>
              <span className="user-cell">{user.id}</span>
              <span className="user-cell">{user.nickname}</span>
              <span className="user-cell">{user.email}</span>
              <span className="user-cell">{user.joinedAt}</span>
              <span className="user-cell">
                <span
                  className={`user-badge ${
                    user.status === "활성"
                      ? "user-active"
                      : user.status === "정지"
                      ? "user-suspended"
                      : "user-withdrawn"
                  }`}
                >
                  {user.status}
                </span>
              </span>
              <span className="user-cell">
                <button
                  className="user-detail-btn"
                  onClick={() => handleOpenModal(user)}
                >
                  상세보기
                </button>
              </span>
            </div>
          ))}
        </section>

        {/* 페이지네이션 */}
        <div className="user-pagination">
          <button
            className="user-page-btn"
            disabled={page === 0}
            onClick={() => {
              if (page > 0) loadUsers(0, nicknameKeyword, filterStatus);
            }}
          >
            &laquo;
          </button>

          {/* 이전 블록으로 */}
          <button
            className="user-page-btn"
            disabled={!hasPrevBlock}
            onClick={() => {
              if (hasPrevBlock) loadUsers(prevBlockPage, nicknameKeyword);
            }}
          >
            &lt;
          </button>

          {/* 현재 블록 내 페이지 목록 */}
          {range.map((p) => (
            <button
              key={p}
              className={`recipe-page-btn ${p === page ? "active" : ""}`}
              onClick={() => loadUsers(p, nicknameKeyword)}
            >
              {p + 1}
            </button>
          ))}

          {/* 다음 블록으로 */}
          <button
            className="user-page-btn"
            disabled={!hasNextBlock}
            onClick={() => {
              if (hasNextBlock) loadUsers(nextBlockPage, nicknameKeyword);
            }}
          >
            &gt;
          </button>

          {/* 마지막 페이지로 */}
          <button
            className="user-page-btn"
            disabled={page === totalPages - 1}
            onClick={() => {
              if (page < totalPages - 1)
                loadUsers(totalPages - 1, nicknameKeyword);
            }}
          >
            &raquo;
          </button>
        </div>
      </div>

      {/* 모달 */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>회원 상세 정보</h2>
            <p>
              <strong>닉네임:</strong> {selectedUser.nickname}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>가입일:</strong> {selectedUser.joinedAt}
            </p>
            <p>
              <strong>현재 상태:</strong> {selectedUser.status}
            </p>

            <div className="modal-actions">
              {selectedUser.status !== "활성" && (
                <button
                  className="modal-btn active"
                  onClick={() => handleStatusChange(selectedUser.id, "활성")}
                >
                  활성
                </button>
              )}
              {selectedUser.status !== "정지" && (
                <button
                  className="modal-btn warning"
                  onClick={() => handleStatusChange(selectedUser.id, "정지")}
                >
                  정지
                </button>
              )}
              {selectedUser.status !== "탈퇴" && (
                <button
                  className="modal-btn danger"
                  onClick={() => handleStatusChange(selectedUser.id, "탈퇴")}
                >
                  탈퇴
                </button>
              )}
              <button className="modal-btn" onClick={handleCloseModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
