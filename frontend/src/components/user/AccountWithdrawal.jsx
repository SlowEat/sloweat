const AccountWithdrawal = () => {
  const handleWithdrawal = () => {
    console.log('회원 탈퇴 버튼 클릭됨');
  };

  return (
    <div className="settings-account-withdrawal">
      <div className="settings-withdrawal-title">회원 탈퇴</div>
      <div className="settings-withdrawal-description">
        회원 탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다. 신중하게 결정해 주세요.
      </div>
      <button
        className="settings-withdrawal-button"
        onClick={handleWithdrawal}
      >
        회원 탈퇴
      </button>
    </div>
  );
};

export default AccountWithdrawal;
