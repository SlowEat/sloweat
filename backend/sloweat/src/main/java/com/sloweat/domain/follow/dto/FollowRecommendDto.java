package com.sloweat.domain.follow.dto;

// native query 사용 시 DTO를 class로 만들면 자동 매핑이 되지 않음
// 따라서 interface로 만듦
// interface 기반 projection을 사용하면 JPA가 필드 이름 기반으로 직접 setter 없이도 접근 가능
public interface FollowRecommendDto {
  Integer getUserId();
  String getNickname();
  String getProfileImgPath();
  Integer getFollowerCount();
}