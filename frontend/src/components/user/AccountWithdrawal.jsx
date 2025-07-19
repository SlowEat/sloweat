import { withdrawal } from "../../api/user/profile";

const AccountWithdrawal = () => {

  const handleWithdrawal = async () => {
    const res = window.confirm('회원을 탈퇴하시겠습니까?');
    if(!res){
      return;
    }

    try{
      await withdrawal();
      localStorage.removeItem('accessToken');
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.reload();
    }catch(error){
      console.error('회원 탈퇴 실패',error);
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요');
    }
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
