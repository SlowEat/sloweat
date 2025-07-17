package com.sloweat.domain.admin.dto.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminRecipeRequest {
  private String title;
  private String author;
  private String status;
}
