package com.sloweat.domain.admin.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class AdminCommentResponse {
  private Integer commentId;
  private String content;
  private String author;
  private Integer recipeId;
  private LocalDateTime createdAt;
  private Integer reportCount;
  private String status;

  @QueryProjection  // 생성자에 이거 붙여주면 QAdminCommentResponse 클래스가 생성됨.
  public AdminCommentResponse(Integer commentId, String content, String author, Integer recipeId,
      LocalDateTime createdAt, Integer reportCount, String status) {
    this.commentId = commentId;
    this.content = content;
    this.author = author;
    this.recipeId = recipeId;
    this.createdAt = createdAt;
    this.reportCount = reportCount;
    this.status = status;
  }
}
