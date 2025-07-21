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

    // ✅ 신고 정보
    private String status;
    private int reportCount;

    // 작성자
    private String chefName;
    private String username;

    // 로그인 유저 상태
    private boolean isMyRecipe;
    private boolean isLiked;

    // ✅ 태그 리스트 (그대로 유지)
    private List<String> tags;

    // ✅ 이미지
    private List<String> photoUrls;

    // ✅ 명시적 태그 항목 필드 추가 (수정 시 초기값 세팅용)
    private String type;
    private String situation;
    private String ingredient;
    private String method;
}
