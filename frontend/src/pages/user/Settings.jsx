import React, { useState, useEffect } from 'react';
import { subscriptionApi } from '../../api/subscription/subscriptionApi';
import './Settings.css';
import SettingNavigation from '../../components/user/SettingNavigation';
import PersonalInfoEdit from '../../components/user/PersonalInfoEdit';
import AccountWithdrawal from '../../components/user/AccountWithdrawal';
import ProfileSubscriptionGuest from '../../components/user/ProfileSubscriptionGuest';
import ProfileSubscriptionMember from '../../components/user/ProfileSubscriptionMember';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [userId, setUserId] = useState(null);  // userId 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. 프로필 정보 조회 (구독 여부 포함)
        const profileResponse = await subscriptionApi.getSubscriptionUser();
        const profileData = profileResponse;

        console.log('프로필 API 응답:', profileData);

        setUserInfo(profileData);
        setIsSubscribed(profileData.subscribed);

        // 2. 구독자인 경우 구독 상세 정보도 조회
        if (profileData.subscribed) {
          try {
            const subscriptionResponse = await subscriptionApi.getSubscription();
            console.log('구독 API 응답:', subscriptionResponse);

            setSubscriptionInfo(subscriptionResponse);
            setUserId(subscriptionResponse.userId);  // userId 설정
            setActiveTab('subscription');
          } catch (subscriptionError) {
            console.error('구독 정보 조회 실패:', subscriptionError);
            setActiveTab('subscription');
          }
        } else {
          // 비구독자인 경우 구독 탭을 기본으로 설정 (구독 유도)
          setActiveTab('subscription');
          setUserId(null);
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        setError('사용자 정보를 불러오는 데 실패했습니다.');
        setActiveTab('account');
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubscriptionChange = async () => {
    try {
      const profileResponse = await subscriptionApi.getSubscriptionUser();
      const profileData = profileResponse.data;

      setUserInfo(profileData);
      setIsSubscribed(profileData.subscribed);

      if (profileData.subscribed) {
        const subscriptionResponse = await subscriptionApi.getSubscription();
        setSubscriptionInfo(subscriptionResponse);
        setUserId(subscriptionResponse.userId);
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error('구독 상태 업데이트 실패:', error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading">사용자 정보를 불러오는 중...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'account':
        return (
          <div style={{ width: '675px' }}>
            <PersonalInfoEdit userInfo={userInfo} setUserInfo={setUserInfo} />
            <AccountWithdrawal />
          </div>
        );

      case 'subscription':
        return isSubscribed ? (
          <ProfileSubscriptionMember
            userId={userId}
            userInfo={userInfo}
            subscriptionInfo={subscriptionInfo}
            onSubscriptionChange={handleSubscriptionChange}
          />
        ) : (
          <ProfileSubscriptionGuest
            userId={userInfo.userId}
            userInfo={userInfo}
            onSubscriptionSuccess={handleSubscriptionChange}
          />
        );

      default:
        return (
          <div style={{ width: '675px' }}>
            <PersonalInfoEdit userInfo={userInfo} setUserInfo={setUserInfo} />
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
        <SettingNavigation activeTab={activeTab} setActiveTab={setActiveTab} isSubscribed={isSubscribed} />
      </div>

      {renderContent()}
    </div>
  );
};

export default Settings;
