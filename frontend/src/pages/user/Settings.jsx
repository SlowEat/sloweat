import { useEffect, useState } from 'react';
import './Settings.css';
import SettingNavigation from '../../components/user/SettingNavigation';
import PersonalInfoEdit from '../../components/user/PersonalInfoEdit';
import AccountWithdrawal from '../../components/user/AccountWithdrawal';
import ProfileSubscriptionGuest from '../../components/user/ProfileSubscriptionGuest';
import ProfileSubscriptionMember from '../../components/user/ProfileSubscriptionMember';

import {getMyProfile} from '../../api/user/profile';

const Settings = () => {
  //계정 설정, 구독 관리 탭
  const [activeTab, setActiveTab] = useState('account');
  const [profile, setProfile] = useState(null);

  //사용자 profile 반환
    useEffect(()=>{
      const profile = async()=>{
        try{
          const res = await getMyProfile();
          setProfile(res.data);
        }catch(err){
          console.error('프로필 불러오기 실패',err);
        }
      };
      profile();
    },[]);


  const renderContent = () => {
    switch (activeTab) {
      //계정 설정 탭
      case 'account':
        return (
          <div style={{ width: '675px' }}>
            {/* 개인정보 수정 */}
            <PersonalInfoEdit profile={profile}/>

            {/* 회원 탈퇴 */}
            <AccountWithdrawal />
          </div>
        );
        
      //구독 관리 탭
      case 'subscription':
        //구독자,비구독자
        return profile?.isSubscribed ? <ProfileSubscriptionMember /> : <ProfileSubscriptionGuest />;

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