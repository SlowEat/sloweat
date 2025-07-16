package com.sloweat.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
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
}
