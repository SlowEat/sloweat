package com.sloweat.domain.recipe.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RecipeResponseDto {

    private Integer recipeId;       // 게시글 ID
    private String title;           // 제목
    private String content;         // 본문
    private int cookingTime;        // 조리 시간 (분)
    private boolean isSubscribed;   // 프리미엄 여부
    private LocalDateTime createdAt;// 작성일자
    private int views;              // 조회수
    private int likes;              // 좋아요 수

    private String chefName;        // 셰프 이름
    private String username;        // 셰프 아이디 (ex. @chefkim)

    private List<String> tags;      // 태그 목록
    private List<String> photoUrls; // 업로드된 이미지들
}
