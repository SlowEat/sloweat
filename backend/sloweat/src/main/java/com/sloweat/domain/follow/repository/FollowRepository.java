package com.sloweat.domain.follow.repository;

import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.entity.Follow;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Integer> {

    List<Follow> findByFollowing(User following); // (Followers) 나를 팔로우한 사람들

    List<Follow> findByFollower(User follower); // (Followings) 내가 팔로우한 사람들

    Optional<Follow> findByFollowerAndFollowing(User follower, User following);

    long countByFollower(User follower);
    long countByFollowing(User following);

    Optional<Follow> findByFollower_UserIdAndFollowing_UserId(Integer userId, Integer followingId);

    Boolean existsByFollowerAndFollowing(User follower, User following);
}
