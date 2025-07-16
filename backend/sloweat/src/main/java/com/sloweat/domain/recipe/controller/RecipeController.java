package com.sloweat.domain.recipe.controller;

import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    /**
     * 게시글 작성
     */
    @PostMapping
    public ResponseEntity<Map<String, Integer>> createRecipe(@RequestBody RecipeRequestDto recipeDto) {
        int savedId = recipeService.saveRecipe(recipeDto);
        Map<String, Integer> responseBody = new HashMap<>();
        responseBody.put("id", savedId);
        return ResponseEntity.ok(responseBody);
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getRecipeDetail(@PathVariable Integer id) {
        RecipeResponseDto responseDto = recipeService.getRecipeDetail(id);
        return ResponseEntity.ok(responseDto);
    }

    /**
     * 게시글 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRecipe(@PathVariable Integer id, @RequestBody RecipeRequestDto dto) {
        recipeService.updateRecipe(id, dto);
        return ResponseEntity.ok().build(); // 수정 성공 후 body 없음
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build(); // 삭제 성공 후 200 OK 응답
    }
    @GetMapping("/all")
    public ResponseEntity<List<RecipeResponseDto>> getAllRecipes() {
        List<RecipeResponseDto> recipeList = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipeList);
    }


}
