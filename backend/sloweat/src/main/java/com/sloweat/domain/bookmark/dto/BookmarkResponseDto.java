package com.sloweat.domain.bookmark.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class BookmarkResponseDto {

    private Integer bookmarkId;
    private Integer userId;
    private Integer recipeId;
    private Integer collectionId;

    private String nickname;

    private String title;           // 제목
    private String content;         // 본문
    private int cookingTime;        // 조리 시간 (분)
    private boolean isSubscribed;   // 프리미엄 여부
    private LocalDateTime createdAt;// 작성일자
    private int views;              // 조회수
    private int likes;              // 좋아요 수
    private List<String> tags;      // 태그 목록
    private List<String> photoUrls; // 업로드된 이미지들

}
