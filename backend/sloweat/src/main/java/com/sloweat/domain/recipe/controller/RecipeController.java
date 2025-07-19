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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<Map<String, Integer>> createRecipe(@RequestBody RecipeRequestDto recipeDto) {
        int savedId = recipeService.saveRecipe(recipeDto);
        Map<String, Integer> responseBody = new HashMap<>();
        responseBody.put("id", savedId);
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getRecipeDetail(@PathVariable Integer id) {
        RecipeResponseDto responseDto = recipeService.getRecipeDetail(id);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRecipe(@PathVariable Integer id, @RequestBody RecipeRequestDto dto) {
        recipeService.updateRecipe(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<RecipeResponseDto>> getAllRecipes() {
        List<RecipeResponseDto> recipeList = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipeList);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchRecipes(
            @RequestParam String type,
            @RequestParam String situation,
            @RequestParam String ingredient,
            @RequestParam String method
    ) {
        List<RecipeResponseDto> results = recipeService.searchByTags(type, situation, ingredient, method);
        ApiResponse<List<RecipeResponseDto>> response = new ApiResponse<>(true, "필터 검색 성공", results);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search-keyword")
    public ResponseEntity<ApiResponse<List<RecipeResponseDto>>> searchByKeyword(@RequestParam String keyword) {
        List<RecipeResponseDto> results = recipeService.searchByKeyword(keyword);
        ApiResponse<List<RecipeResponseDto>> response = new ApiResponse<>(true, "검색어 기반 검색 성공", results);
        return ResponseEntity.ok(response);
    }

    /**
     * ❤️ 좋아요 등록 (✅ 인증 사용자 기준)
     */
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.likeRecipe(id, userId);
        return ResponseEntity.ok().build();
    }

    /**
     * 💔 좋아요 취소 (✅ 인증 사용자 기준)
     */
    @DeleteMapping("/{id}/like")
    public ResponseEntity<Void> unlikeRecipe(
            @PathVariable int id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails.getUserId();
        recipeService.unlikeRecipe(id, userId);
        return ResponseEntity.ok().build();
    }
}
