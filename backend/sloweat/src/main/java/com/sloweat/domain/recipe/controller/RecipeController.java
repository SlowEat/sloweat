//package com.sloweat.domain.recipe.controller;
//
//import com.sloweat.domain.recipe.dto.RecipeRequestDto;
//import com.sloweat.domain.recipe.dto.RecipeResponseDto;
//import com.sloweat.domain.recipe.service.RecipeService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/recipes")
//@RequiredArgsConstructor
//public class RecipeController {
//
//    private final RecipeService recipeService;
//
//    /**
//     * 게시글 작성
//     */
//    @PostMapping
//    public ResponseEntity<String> createRecipe(@RequestBody RecipeRequestDto recipeDto) {
//        recipeService.saveRecipe(recipeDto);
//        return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 작성되었습니다!");
//    }
//
//    /**
//     * 게시글 상세 조회
//     */
//    @GetMapping("/{id}")
//    public ResponseEntity<RecipeResponseDto> getRecipeDetail(@PathVariable Integer id) {
//        RecipeResponseDto responseDto = recipeService.getRecipeDetail(id);
//        return ResponseEntity.ok(responseDto);
//    }
//}

package com.sloweat.domain.recipe.controller;

import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
        int savedId = recipeService.saveRecipe(recipeDto); // 게시글 저장하고 반환된 ID
        Map<String, Integer> responseBody = new HashMap<>();
        responseBody.put("id", savedId); // JSON 구조로 응답: { "id": 6 }
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
}
