import React, { useState } from 'react';
import './Settings.css';
import SettingNavigation from '../../components/user/SettingNavigation'; // ← 필요한 경우 경로 조정
import PersonalInfoEdit from '../../components/user/PersonalInfoEdit';
import AccountWithdrawal from '../../components/user/AccountWithdrawal';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="main-layout-content">
      <div className="settings-header">
        <div className="tap-title">설정</div>
        <div style={{ width: '663px' }}></div>
        <SettingNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div style={{ width: '675px' }}>
        {/* 개인정보 수정 */}
        <PersonalInfoEdit />

        {/* 회원 탈퇴 */}
        <AccountWithdrawal />
      </div>

    </div>
  );
};

export default Settings;