package com.sloweat.domain.recipe.controller;

import com.sloweat.common.response.ApiResponse;
import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.dto.ReportRequestDto;
import com.sloweat.domain.recipe.service.RecipeService;
import com.sloweat.domain.auth.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<ApiResponse<Integer>> createRecipe(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody RecipeRequestDto recipeDto
    ) {
        Integer userId = userDetails.getUserId();
        int savedId = recipeService.saveRecipe(userId, recipeDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "작성 성공", savedId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RecipeResponseDto>> getRecipeDetail(
            @PathVariable Integer id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        RecipeResponseDto responseDto = recipeService.getRecipeDetailWithViewIncrease(userDetails.getUserId() ,id);
        return ResponseEntity.ok(new ApiResponse<>(true, "조회 성공", responseDto));
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRecipe(
            @PathVariable Integer id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.deleteRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "삭제 성공", null));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<Page<RecipeResponseDto>>> getAllRecipesWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<RecipeResponseDto> recipePage = recipeService.getAllRecipesWithPagination(sort, pageable, userDetails.getUserId());
        return ResponseEntity.ok(new ApiResponse<>(true, "전체 조회 성공", recipePage));
    }


    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchRecipes(
            @RequestParam String type,
            @RequestParam String situation,
            @RequestParam String ingredient,
            @RequestParam String method,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer loginUserId = userDetails.getUserId(); // 로그인 유저 ID 추출
        List<RecipeResponseDto> results = recipeService.searchByTags(type, situation, ingredient, method, sort, loginUserId);
        return ResponseEntity.ok(new ApiResponse<>(true, "필터 검색 성공", results));
    }


    @GetMapping("/search-keyword")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchByKeyword(
            @RequestParam String keyword,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer loginUserId = userDetails.getUserId(); // 로그인 유저 ID 추출
        List<RecipeResponseDto> results = recipeService.searchByKeyword(keyword, sort, loginUserId);
        return ResponseEntity.ok(new ApiResponse<>(true, "검색어 기반 검색 성공", results));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Void>> likeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.likeRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "좋아요 등록 성공", null));
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Void>> unlikeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.unlikeRecipe(id, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "좋아요 취소 성공", null));
    }

    @PostMapping("/{id}/report")
    public ResponseEntity<ApiResponse<Void>> reportRecipe(
            @PathVariable Integer id,
            @RequestBody ReportRequestDto reportRequestDto
    ) {
        recipeService.reportRecipe(id, reportRequestDto.getReason());
        return ResponseEntity.ok(new ApiResponse<>(true, "신고 완료", null));
    }

    @GetMapping("/following")
    public ResponseEntity<ApiResponse<Page<RecipeResponseDto>>> getFollowingUsersRecipes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        Page<RecipeResponseDto> recipePage = recipeService.getFollowingsRecipes(userId, page, size);
        return ResponseEntity.ok(new ApiResponse<>(true, "팔로잉 게시물 조회 성공", recipePage));
    }
}
