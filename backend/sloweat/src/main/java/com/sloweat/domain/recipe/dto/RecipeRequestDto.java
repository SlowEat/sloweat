package com.sloweat.domain.recipe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecipeRequestDto {

    private int userId;           // 작성자 ID
    private String title;         // 제목
    private String content;       // 본문
    private int cookingTime;      // 요리 시간 (분)

    @JsonProperty("isSubscribed")
    private boolean isSubscribed; // 프리미엄 여부

    // ✅ 태그 4종류: 프론트에서 각각 선택해서 전달
    private String type;          // 예: "한식"
    private String situation;     // 예: "혼밥"
    private String ingredient;    // 예: "계란"
    private String method;        // 예: "볶기"
}
