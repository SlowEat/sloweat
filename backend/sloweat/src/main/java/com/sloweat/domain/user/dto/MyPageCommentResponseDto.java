package com.sloweat.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MyPageCommentResponseDto {

    private Integer commentId;
    private Integer userId;
    private Integer recipeId;
    private String nickname;
    private String localEmail;
    private String kakaoEmail;
    private String content;
    private LocalDateTime createdAt;
    private Boolean isLiked;
    private Boolean isMyComment;

}
