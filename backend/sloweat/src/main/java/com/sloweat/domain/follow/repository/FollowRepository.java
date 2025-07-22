package com.sloweat.domain.follow.repository;

import com.sloweat.domain.follow.dto.FollowRecommendDto;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.entity.Follow;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    List<Follow> findByFollowing(User following); // (Followers) 나를 팔로우한 사람들

    List<Follow> findByFollower(User follower); // (Followings) 내가 팔로우한 사람들

    Optional<Follow> findByFollowerAndFollowing(User follower, User following);

    long countByFollower(User follower);

    long countByFollowing(User following);

    Optional<Follow> findByFollower_UserIdAndFollowing_UserId(Integer userId, Integer followingId);

    Boolean existsByFollowerAndFollowing(User follower, User following);

    // 팔로워 많은 3명 뽑기 (자신이 팔로우 하고 있는 사람 제외)
    @Query(value = """
            SELECT u.user_id AS userId,
                   u.nickname,
                   u.profile_img_path AS profileImgPath,
                   CAST(COUNT(f.follower_id) AS SIGNED) AS followerCount
            FROM follow f
            JOIN user u ON f.following_id = u.user_id
            WHERE u.user_id != :loginUserId
              AND u.user_id NOT IN (
                  SELECT f2.following_id
                  FROM follow f2
                  WHERE f2.follower_id = :loginUserId
              )
            GROUP BY u.user_id, u.nickname, u.profile_img_path
            ORDER BY followerCount DESC
            LIMIT 3
        """, nativeQuery = true)
    List<FollowRecommendDto> getFollowRecommend(@Param("loginUserId") Integer loginUserId);

}
