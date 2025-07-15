package com.sloweat.domain.recipe.dto;

import lombok.Data;

@Data
public class RecipeRequestDto {

    private int userId;             // 작성자 ID
    private String title;           // 제목
    private String content;         // 내용
    private int cookingTime;        // 요리 시간
    private boolean isSubscribed;   // 유료 여부

    // 추후 확장 가능: 이미지 URL, 태그 등
}
