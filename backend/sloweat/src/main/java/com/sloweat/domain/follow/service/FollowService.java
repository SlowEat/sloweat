package com.sloweat.domain.follow.service;

import com.sloweat.domain.follow.dto.FollowRecommendDto;
import com.sloweat.domain.follow.dto.FollowRequestDto;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.entity.Follow;
import com.sloweat.domain.follow.repository.FollowRepository;
import com.sloweat.domain.follow.repository.FollowRepositoryCumstom;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final FollowRepositoryCumstom  followRepositoryCumstom;

    // 팔로우 하기
    @Transactional
    public void follow(Integer fromUserId, FollowRequestDto request) {
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new EntityNotFoundException("로그인한 사용자 없음"));

        User toUser = userRepository.findById(request.getToUserId())
                .orElseThrow(() -> new EntityNotFoundException("팔로우 대상 사용자 없음"));

        // 이미 팔로우 중이면 무시
        /*if (followRepository.findByFollowerAndFollowing(fromUser, toUser).isPresent()) {
            throw new IllegalStateException("이미 팔로우 중입니다.");
        }*/

        Follow follow = new Follow();
        follow.setFollower(fromUser);
        follow.setFollowing(toUser);
        followRepository.save(follow);
    }

    // 언팔로우 하기
    @Transactional
    public void unfollow(Integer userId, Integer followingId) {


        Optional<Follow> follow = followRepository.findByFollower_UserIdAndFollowing_UserId(userId, followingId);
        follow.ifPresent(f -> followRepository.delete(f));


      /*  User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new EntityNotFoundException("로그인한 사용자 없음"));

        User toUser = userRepository.findById(request.getToUserId())
                .orElseThrow(() -> new EntityNotFoundException("대상 사용자 없음"));

        Follow follow = followRepository.findByFollowerAndFollowing(fromUser, toUser)
                .orElseThrow(() -> new EntityNotFoundException("팔로우 관계가 존재하지 않습니다."));*/

        //followRepository.deleteById(followId);
    }

    // 팔로워 목록 조회
    @Transactional(readOnly = true)
    public List<FollowResponseDto> getFollowers(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자 없음"));

        List<FollowResponseDto> followers = followRepositoryCumstom.getFollowers(userId);

        return followers;

    }

    // 팔로잉 목록 조회
    @Transactional(readOnly = true)
    public List<FollowResponseDto> getFollowings(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자 없음"));

        List<FollowResponseDto> followings = followRepositoryCumstom.getFollowings(userId);

        return followings;
    }

    // 팔로워 수 많은 3명 조회
    public List<FollowRecommendDto> getFollowRecommend(Integer loginUserId) {
        User user = userRepository.findById(loginUserId)
            .orElseThrow(() -> new EntityNotFoundException("사용자 없음"));
        return followRepository.getFollowRecommend(loginUserId);
    }
}
