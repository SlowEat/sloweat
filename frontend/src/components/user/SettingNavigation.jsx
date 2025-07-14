const SettingNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="settings-header">
      <button
        className={`settings-tab-button ${activeTab === 'account' ? 'active' : ''}`}
        onClick={() => setActiveTab('account')}
      >
        계정 설정
      </button>
      <button
        className={`settings-tab-button ${activeTab === 'subscription' ? 'active' : ''}`}
        onClick={() => setActiveTab('subscription')}
      >
        구독 관리
      </button>
    </div>
  );
};

export default SettingNavigation;
