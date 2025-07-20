import { useState } from 'react';
import api from '../api/axiosInstance';

const useFollow = (initialFollowed, targetUserId, reloadProfile) => {
    const [isFollowed, setIsFollowed] = useState(initialFollowed);

    const handleFollowToggle = async () => {
        try {
            if (isFollowed) {
                //unFollow
                await api.delete(`api/follow/${targetUserId}`);
            } else {
                //Follow
                await api.post(`api/follow`, { toUserId: targetUserId });
            }

            setIsFollowed((prev) => !prev);

            if(reloadProfile){
                reloadProfile(); // 프로필 창 갱신
            }

        } catch (error) {
            console.error(isFollowed ? '언팔로우 실패:' : '팔로우 실패:', error);
        }
    };

    return { isFollowed, handleFollowToggle };
};

export default useFollow;
