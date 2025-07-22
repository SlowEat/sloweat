package com.sloweat.domain.recipe.controller;

import com.sloweat.common.response.ApiResponse;
import com.sloweat.domain.recipe.service.TagService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipe/tags")
@RequiredArgsConstructor
public class TagController {
  private final TagService tagService;

  @GetMapping
  public ResponseEntity<?> getTags(){
    Map<String, List<String>> groupedTags = tagService.getAllTagsGroupedByType();

    return ResponseEntity.ok(Map.of(
        "status", 200,
        "message", "태그 목록 조회 성공",
        "data", groupedTags
    ));
  }

  // 인기 태그 조회
  @GetMapping("/popular")
  public ResponseEntity<?> getPopularTags() {
    Map<String, List<String>> tagsByType = tagService.getTopPopularTags();

    return ResponseEntity.ok(Map.of(
        "status", 200,
        "message", "인기 태그 조회 성공",
        "data", tagsByType
    ));
  }
}
