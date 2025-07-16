package com.sloweat.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentRequest {
    private Integer parentId;
    private Integer userId;
    private String content;
}

