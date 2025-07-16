import React, { useState } from 'react';
import './Settings.css';
import SettingNavigation from '../../components/user/SettingNavigation';
import PersonalInfoEdit from '../../components/user/PersonalInfoEdit';
import AccountWithdrawal from '../../components/user/AccountWithdrawal';
import ProfileSubscriptionGuest from '../../components/user/ProfileSubscriptionGuest';
import ProfileSubscriptionMember from '../../components/user/ProfileSubscriptionMember';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  // 사용자 구독 상태 - 실제로는 API나 Context에서 가져와야 함
  // 예시: const { isSubscribed } = useAuth(); 또는 useSubscription();
  const [isSubscribed, setIsSubscribed] = useState(true); // 임시로 state 사용

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div style={{ width: '675px' }}>
            {/* 개인정보 수정 */}
            <PersonalInfoEdit />

            {/* 회원 탈퇴 */}
            <AccountWithdrawal />
          </div>
        );

      case 'subscription':
        return isSubscribed ? <ProfileSubscriptionMember /> : <ProfileSubscriptionGuest />;

      default:
        return (
          <div style={{ width: '675px' }}>
            <PersonalInfoEdit />
            <AccountWithdrawal />
          </div>
        );
    }
  };

  return (
    <div className="main-layout-content">
      <div className="settings-header">
        <div className="tap-title">설정</div>
        <div style={{ width: '663px' }}></div>
        <SettingNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {renderContent()}
    </div>
  );
};

export default Settings;