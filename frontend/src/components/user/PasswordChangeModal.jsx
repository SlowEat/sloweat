import "../../styles/user/PasswordChangeModal.css";

const PasswordChangeModal = () => {
  return (
    <main className="box">
      <section className="view">
        <div className="div">
          <h1 className="text-wrapper">비밀번호 변경</h1>
          <button className="close-button" aria-label="닫기">
            {/* 닫기(x) 아이콘 → ❌ */}
            <span role="img" aria-label="닫기" style={{ fontSize: 20 }}>❌</span>
          </button>
          <form>
            <div className="password-fields">
              <div className="view-2">
                <label htmlFor="current-password" className="text-wrapper-4">
                  현재 비밀번호
                </label>
                <div className="overlap-2">
                  <input
                    type="password"
                    id="current-password"
                    className="overlap-group-2"
                    placeholder="현재 비밀번호를 입력해주세요"
                    required
                  />
                  {/* 비밀번호 표시 → 👁️ */}
                  <span role="img" aria-label="비밀번호 표시" style={{ fontSize: 20, marginLeft: 5 }}>👁️</span>
                </div>
              </div>
              <div className="view-3">
                <label htmlFor="new-password" className="text-wrapper-4">
                  새 비밀번호
                </label>
                <div className="overlap-2">
                  <input
                    type="password"
                    id="new-password"
                    className="overlap-group-2"
                    placeholder="새 비밀번호를 입력해주세요"
                    required
                    minLength={8}
                  />
                  <span role="img" aria-label="비밀번호 표시" style={{ fontSize: 20, marginLeft: 5 }}>👁️</span>
                </div>
                <p className="text-wrapper-6">비밀번호는 8자 이상이어야 합니다</p>
              </div>
              <div className="view-4">
                <label htmlFor="confirm-password" className="text-wrapper-4">
                  새 비밀번호 확인
                </label>
                <div className="overlap-2">
                  <input
                    type="password"
                    id="confirm-password"
                    className="overlap-group-2"
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    required
                  />
                  <span role="img" aria-label="비밀번호 표시" style={{ fontSize: 20, marginLeft: 5 }}>👁️</span>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button type="button" className="cancel-button">
                <span className="text-wrapper-2">취소</span>
              </button>
              <button type="submit" className="submit-button">
                <span className="text-wrapper-3">비밀번호 변경</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PasswordChangeModal;
