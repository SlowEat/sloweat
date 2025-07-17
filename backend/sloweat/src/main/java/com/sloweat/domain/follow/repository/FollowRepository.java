package com.sloweat.domain.follow.repository;

import com.sloweat.domain.follow.entity.Follow;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Integer> {

    List<Follow> findByFollowing(User following); // (Followers) 나를 팔로우한 사람들

    List<Follow> findByFollower(User follower); // (Followings) 내가 팔로우한 사람들

    Optional<Follow> findByFollowerAndFollowing(User follower, User following);
}
