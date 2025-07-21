package com.sloweat.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {

    private Integer commentId;
    private String content;
    private Integer userId;
    private String username;
    private Integer parentId;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private Boolean isDeleted;
    private String status;

    private Boolean isMine;

    @Builder
    public CommentResponse(Integer commentId, String content, Integer userId, String username,
                           Integer parentId, Integer likeCount, LocalDateTime createdAt,
                           Boolean isDeleted, String status, Boolean isMine) {
        this.commentId = commentId;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.parentId = parentId;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
        this.isDeleted = isDeleted;
        this.status = status;
        this.isMine = isMine;
    }
}
