import React, { useEffect, useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const dummyUsers = [
      {
        id: 1,
        nickname: "헬시쿡",
        email: "healthy@cook.com",
        joinedAt: "2023-12-01",
        status: "활성",
      },
      {
        id: 2,
        nickname: "한식마스터",
        email: "korean@master.com",
        joinedAt: "2023-11-15",
        status: "활성",
      },
      {
        id: 3,
        nickname: "악플러",
        email: "bad@user.com",
        joinedAt: "2024-01-10",
        status: "정지",
      },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = (userId, newStatus) => {
    const updated = users.map((u) =>
        u.id === userId ? { ...u, status: newStatus } : u
    );
    setUsers(updated);
    handleCloseModal();
  };

  return (
      <div className="user-wrapper">
        <div className="user-content-box">
          <div className="user-page-header">
            <h1 className="user-page-title">회원 관리</h1>
            <div className="user-search">
              <input type="text" placeholder="검색..." className="user-search-input" />
              <img
                  src="https://c.animaapp.com/rgpZJ8Rs/img/frame-4.svg"
                  alt="검색"
                  className="user-search-icon"
              />
            </div>
          </div>

          <div className="user-section-title">회원 목록</div>

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
        </div>

        {/* 모달 */}
        {selectedUser && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h2>회원 상세 정보</h2>
                <p><strong>닉네임:</strong> {selectedUser.nickname}</p>
                <p><strong>이메일:</strong> {selectedUser.email}</p>
                <p><strong>가입일:</strong> {selectedUser.joinedAt}</p>
                <p><strong>현재 상태:</strong> {selectedUser.status}</p>

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
