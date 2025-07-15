package com.sloweat.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminRecipeRequest {
  private String title;
  private String author;
}
