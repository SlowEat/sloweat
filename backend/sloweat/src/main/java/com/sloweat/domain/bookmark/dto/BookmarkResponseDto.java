package com.sloweat.domain.bookmark.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BookmarkResponseDto {

    private Integer bookmarkId;
    private Integer userId;
    private Integer recipeId;
    private Integer collectionId;
    private String collectionName;

    private String nickname;
    private String localEmail;
    private String kakaoEmail;

    private String title;           // 제목
    private String content;         // 본문
    private Integer cookingTime;        // 조리 시간 (분)
    //private boolean isSubscribed;   // 프리미엄 여부
    //private LocalDateTime createdAt;// 작성일자
    private Integer views;              // 조회수
    private Integer likes;              // 좋아요 수
    //private List<String> tags;      // 태그 목록
    //private List<String> photoUrls; // 업로드된 이미지들

    // 좋아요 여부
    // 북마크 여부

}
