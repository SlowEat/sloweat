package com.sloweat.domain.recipe.controller;

import com.sloweat.common.response.ApiResponse;
import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.service.RecipeService;
import com.sloweat.domain.auth.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    /**
     * 📝 게시글 등록 (로그인 사용자만 가능)
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Integer>> createRecipe(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody RecipeRequestDto recipeDto
    ) {
        Integer userId = userDetails.getUserId();
        int savedId = recipeService.saveRecipe(userId, recipeDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "작성 성공", savedId));
    }

    /**
     * 📄 게시글 상세 조회 + 조회수 증가 (인증 없이 가능)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RecipeResponseDto>> getRecipeDetail(@PathVariable Integer id) {
        RecipeResponseDto responseDto = recipeService.getRecipeDetailWithViewIncrease(id); // ✅ 변경된 서비스 메서드
        return ResponseEntity.ok(new ApiResponse<>(true, "조회 성공", responseDto));
    }

    /**
     * ✏️ 게시글 수정 (자신의 글만 수정 가능)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateRecipe(
            @PathVariable Integer id,
            @RequestBody RecipeRequestDto dto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.updateRecipe(id, userId, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "수정 성공", null));
    }

    /**
     * 🗑️ 게시글 삭제 (자신의 글만 삭제 가능)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRecipe(
            @PathVariable Integer id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.deleteRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "삭제 성공", null));
    }

    /**
     * 📚 전체 게시글 조회
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> getAllRecipes() {
        List<RecipeResponseDto> recipeList = recipeService.getAllRecipes();
        return ResponseEntity.ok(new ApiResponse<>(true, "전체 조회 성공", recipeList));
    }

    /**
     * 🔍 필터 검색
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchRecipes(
            @RequestParam String type,
            @RequestParam String situation,
            @RequestParam String ingredient,
            @RequestParam String method
    ) {
        List<RecipeResponseDto> results = recipeService.searchByTags(type, situation, ingredient, method);
        return ResponseEntity.ok(new ApiResponse<>(true, "필터 검색 성공", results));
    }

    /**
     * 🔎 키워드 검색
     */
    @GetMapping("/search-keyword")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchByKeyword(@RequestParam String keyword) {
        List<RecipeResponseDto> results = recipeService.searchByKeyword(keyword);
        return ResponseEntity.ok(new ApiResponse<>(true, "검색어 기반 검색 성공", results));
    }

    /**
     * ❤️ 좋아요 등록
     */
    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Void>> likeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.likeRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "좋아요 등록 성공", null));
    }

    /**
     * 💔 좋아요 취소
     */
    @DeleteMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Void>> unlikeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.unlikeRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "좋아요 취소 성공", null));
    }
}
