package com.sloweat.domain.admin.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminCommentRequest {
  private String content;
  private String author;
}
