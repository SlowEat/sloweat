package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.recipe.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.recipe.AdminRecipeResponse;
import com.sloweat.domain.admin.service.AdminRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 관리자 권한 체크 (PreAuthorize 적용 예정)
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminRecipeController {

    private final AdminRecipeService adminRecipeService;

    // 게시글 조회 및 검색
    @GetMapping("/recipes")
    public Page<AdminRecipeResponse> getRecipes(
        @RequestParam(required = false) String title,
        @RequestParam(required = false) String author,
        @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable  // 클라이언트가 아무런 페이징 정보를 요청하지 않았을 때의 기본 페이징 조건
    ) {
        AdminRecipeRequest request = new AdminRecipeRequest(title, author);
        return adminRecipeService.getRecipes(request, pageable);
    }

    // 게시글 삭제(삭제 처리)
    @DeleteMapping("/recipes/{recipeId}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer recipeId){
        adminRecipeService.deleteRecipe(recipeId);
        return ResponseEntity.noContent().build();
    }

    // 게시글 반려(REJECT 처리)
    @PostMapping("/recipes/{recipeId}/reject")
    public ResponseEntity<Void> rejectReportRecipe(@PathVariable Integer recipeId){
        adminRecipeService.rejectReportRecipe(recipeId);
        return ResponseEntity.noContent().build();
    }
}
