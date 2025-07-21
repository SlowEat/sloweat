package com.sloweat.domain.recipe.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RecipeResponseDto {

    private Integer recipeId;
    private String title;
    private String content;
    private int cookingTime;
    private boolean isSubscribed;
    private LocalDateTime createdAt;
    private int views;
    private int likes;

    // 신고 정보
    private String status;
    private int reportCount;

    // 작성자 정보
    private String chefName;
    private String username;

    // 로그인 유저 상태
    private boolean isMyRecipe;
    private boolean isLiked;
    private boolean isFollowing; // ✅ 새로 추가된 팔로우 여부

    // 태그 / 이미지
    private List<String> tags;
    private List<String> photoUrls;
}
