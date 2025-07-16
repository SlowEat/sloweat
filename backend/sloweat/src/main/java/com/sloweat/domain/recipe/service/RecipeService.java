package com.sloweat.domain.recipe.service;

import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.repository.RecipeRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    /**
     * 새 레시피 저장 (게시글 작성)
     */
    public int saveRecipe(RecipeRequestDto dto) {
        Recipe recipe = new Recipe();

        recipe.setTitle(dto.getTitle());
        recipe.setContent(dto.getContent());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setIsSubscribed(dto.isSubscribed());
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());

        User user = userRepository.findById(dto.getUserId()).orElse(null);
        recipe.setUser(user);

        Recipe savedRecipe = recipeRepository.save(recipe);
        return savedRecipe.getRecipeId();
    }

    /**
     * 게시글 수정
     */
    public void updateRecipe(int id, RecipeRequestDto dto) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 레시피입니다: ID = " + id)
        );

        recipe.setTitle(dto.getTitle());
        recipe.setContent(dto.getContent());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setIsSubscribed(dto.isSubscribed());
        recipe.setUpdatedAt(LocalDateTime.now());

        recipeRepository.save(recipe);
    }

    /**
     * 게시글 삭제
     */
    public void deleteRecipe(int id) {
        if (!recipeRepository.existsById(id)) {
            throw new IllegalArgumentException("삭제할 레시피가 존재하지 않습니다: ID = " + id);
        }
        recipeRepository.deleteById(id);
    }

    /**
     * 게시글 상세 조회
     */
    public RecipeResponseDto getRecipeDetail(Integer id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) return null;

        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setTitle(recipe.getTitle());
        dto.setContent(recipe.getContent());
        dto.setCookingTime(recipe.getCookingTime());
        dto.setSubscribed(recipe.getIsSubscribed());
        dto.setCreatedAt(recipe.getCreatedAt());
        dto.setViews(recipe.getViews());
        dto.setLikes(recipe.getLikes());

        // 프로필 정보 연결 (선택)
        // if (recipe.getUser() != null) {
        //     dto.setChefName(recipe.getUser().getName());
        //     dto.setUsername("@" + recipe.getUser().getUsername());
        // }

        // 예시 태그/이미지
        dto.setTags(List.of("크림파스타", "홈쿠킹", "이탈리안", "간단요리"));
        dto.setPhotoUrls(List.of("https://image.server.com/photo1.jpg"));

        return dto;
    }

    /**
     * 전체 게시글 목록 조회
     */
    public List<RecipeResponseDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();

        return recipes.stream().map(recipe -> {
            RecipeResponseDto dto = new RecipeResponseDto();
            dto.setRecipeId(recipe.getRecipeId());
            dto.setTitle(recipe.getTitle());
            dto.setContent(recipe.getContent());
            dto.setCookingTime(recipe.getCookingTime());
            dto.setSubscribed(recipe.getIsSubscribed());
            dto.setCreatedAt(recipe.getCreatedAt());
            dto.setViews(recipe.getViews());
            dto.setLikes(recipe.getLikes());

            // 기본 태그/이미지 처리 (필요 시 개선 가능)
            dto.setTags(List.of("전체", "기본"));
            dto.setPhotoUrls(List.of("https://image.server.com/list-default.jpg"));

            return dto;
        }).toList();
    }
}
