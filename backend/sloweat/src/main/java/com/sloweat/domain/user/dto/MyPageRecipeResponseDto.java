package com.sloweat.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MyPageRecipeResponseDto {

    private Integer userId;
    private Integer recipeId;
    private String nickname;
    private String localEmail;
    private String kakaoEmail;
    private String title;
    private String content;
    private Integer cookingTime;
    private Integer views;
    private Integer likes;
    private Boolean isLiked; // 좋아요 설정 여부
    private Boolean isBookmarked; // 북마크 설정 여부
    private Boolean isFollowing; // 팔로우 여부
    private Boolean isMyPost; // 내가 쓴 글 여부

    //private List<String> tags;      // 태그 목록
    //private List<String> photoUrls; // 업로드된 이미지들
}
