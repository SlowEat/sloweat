package com.sloweat.domain.follow.repository;

import com.sloweat.domain.follow.dto.FollowResponseDto;

import java.util.List;

public interface FollowRepositoryCumstom {

    //팔로워 목록 조회
    public List<FollowResponseDto> getFollowers(Integer userId);

    //팔로잉 목록 조회
    List<FollowResponseDto> getFollowings(Integer userId);
    
    //남의 팔로워 목록 조회
    List<FollowResponseDto> getUserFollowers(Integer loginUserId, Integer userId);

    //남의 팔로잉 목록 조회
    List<FollowResponseDto> getUserFollowings(Integer loginUserId, Integer userId);
}
