package com.sloweat.domain.bookmark.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BookmarkResponseDto {

    private Integer bookmarkId;
    private Integer userId;
    private Integer recipeId;
    private Integer collectionId;
    private String collectionName;

    private String nickname;
    private String localEmail;
    private String kakaoEmail;
    private String profileImgPath;

    private String title;
    private String content;
    private Integer cookingTime;
    private Integer views;
    private Integer likes;

    private Boolean isLiked; // 좋아요 설정 여부
    private Boolean isBookmarked; // 북마크 설정 여부

    private Boolean isFollowing; //팔로잉 여부
    private Boolean isMyPost; //내가 작성한 게시글 여부

    private List<String> tags; //태그 목록

    public BookmarkResponseDto(
            Integer bookmarkId,
            Integer userId,
            Integer recipeId,
            Integer collectionId,
            String collectionName,
            String nickname,
            String localEmail,
            String kakaoEmail,
            String profileImgPath,
            String title,
            String content,
            Integer cookingTime,
            Integer views,
            Integer likes,
            Boolean isLiked,
            Boolean isBookmarked,
            Boolean isFollowing,
            Boolean isMyPost
    ) {
        this.bookmarkId = bookmarkId;
        this.userId = userId;
        this.recipeId = recipeId;
        this.collectionId = collectionId;
        this.collectionName = collectionName;
        this.nickname = nickname;
        this.localEmail = localEmail;
        this.kakaoEmail = kakaoEmail;
        this.profileImgPath = profileImgPath;
        this.title = title;
        this.content = content;
        this.cookingTime = cookingTime;
        this.views = views;
        this.likes = likes;
        this.isLiked = isLiked;
        this.isBookmarked = isBookmarked;
        this.isFollowing = isFollowing;
        this.isMyPost = isMyPost;
    }



}
