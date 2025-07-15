package com.sloweat.domain.admin.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.sloweat.domain.recipe.entity.RecipeReport;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class AdminRecipeResponse {
  private Integer id;
  private String title;
  private String author;
  private LocalDateTime createdAt;
  private Integer reportCount;
  private String status;

  @QueryProjection  // 생성자에 이거 붙여주면 QAdminRecipeResponse 클래스가 생성됨.
  public AdminRecipeResponse(Integer id, String title, String author,
      LocalDateTime createdAt, Integer reportCount, String status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.reportCount = reportCount;
    this.status = status;
  }
}
