package com.sloweat.domain.recipe.service;

import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.*;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import com.sloweat.domain.recipe.repository.*;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final TagRepository tagRepository;
    private final RecipeTagRepository recipeTagRepository;
    private final RecipeLikeRepository recipeLikeRepository;
    private final UserRepository userRepository;

    public int saveRecipe(Integer userId, RecipeRequestDto dto) {
        Recipe recipe = new Recipe();

        recipe.setTitle(dto.getTitle());
        recipe.setContent(dto.getContent());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setIsSubscribed(dto.isSubscribed());
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());
        recipe.setViews(0); // ✅ 초기 조회수 설정
        recipe.setLikes(0); // ✅ 초기 좋아요 수 설정

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다: ID = " + userId));
        recipe.setUser(user);

        Recipe savedRecipe = recipeRepository.save(recipe);

        List<Tag> tags = List.of(
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 종류 태그: " + dto.getType())),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 상황 태그: " + dto.getSituation())),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 재료 태그: " + dto.getIngredient())),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 방법 태그: " + dto.getMethod()))
        );

        for (Tag tag : tags) {
            RecipeTag recipeTag = new RecipeTag();
            recipeTag.setRecipe(savedRecipe);
            recipeTag.setTag(tag);
            recipeTag.setCreatedAt(LocalDateTime.now());
            recipeTagRepository.save(recipeTag);
        }

        return savedRecipe.getRecipeId();
    }

    @Transactional
    public void updateRecipe(int recipeId, Integer userId, RecipeRequestDto dto) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 레시피입니다: ID = " + recipeId));

        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 수정할 수 있습니다.");
        }

        recipe.setTitle(dto.getTitle());
        recipe.setContent(dto.getContent());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setIsSubscribed(dto.isSubscribed());
        recipe.setUpdatedAt(LocalDateTime.now());

        recipeRepository.save(recipe);
        recipeTagRepository.deleteByRecipe(recipe);

        List<Tag> updatedTags = List.of(
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 종류 태그: " + dto.getType())),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 상황 태그: " + dto.getSituation())),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 재료 태그: " + dto.getIngredient())),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod())
                        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 방법 태그: " + dto.getMethod()))
        );

        for (Tag tag : updatedTags) {
            RecipeTag newTag = new RecipeTag();
            newTag.setRecipe(recipe);
            newTag.setTag(tag);
            newTag.setCreatedAt(LocalDateTime.now());
            recipeTagRepository.save(newTag);
        }
    }

    @Transactional
    public void deleteRecipe(int recipeId, Integer userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 레시피가 존재하지 않습니다: ID = " + recipeId));

        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 삭제할 수 있습니다.");
        }

        recipeRepository.deleteById(recipeId);
    }

    @Transactional
    public void likeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + recipeId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: ID = " + userId));

        boolean alreadyLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, user);
        if (alreadyLiked) return;

        recipe.setLikes(recipe.getLikes() + 1); // ✅ 좋아요 증가
        recipeRepository.save(recipe);

        RecipeLike like = new RecipeLike();
        like.setRecipe(recipe);
        like.setUser(user);
        like.setCreatedAt(LocalDateTime.now());
        recipeLikeRepository.save(like);
    }

    @Transactional
    public void unlikeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + recipeId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: ID = " + userId));

        recipe.setLikes(Math.max(0, recipe.getLikes() - 1)); // ✅ 좋아요 감소 (음수 방지)
        recipeRepository.save(recipe);

        recipeLikeRepository.deleteByRecipeAndUser(recipe, user);
    }

    @Transactional
    public RecipeResponseDto getRecipeDetailWithViewIncrease(Integer id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + id));

        // ✅ 조회수 증가
        recipe.setViews(recipe.getViews() + 1);
        recipeRepository.save(recipe);

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = recipeTags.stream()
                .map(rt -> rt.getTag().getTagName())
                .toList();

        return toDto(recipe, tagNames, "https://image.server.com/photo1.jpg");
    }

    public RecipeResponseDto getRecipeDetail(Integer id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) return null;

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = recipeTags.stream()
                .map(rt -> rt.getTag().getTagName())
                .toList();

        return toDto(recipe, tagNames, "https://image.server.com/photo1.jpg");
    }

    public List<RecipeResponseDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();

        return recipes.stream().map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream()
                    .map(rt -> rt.getTag().getTagName())
                    .toList();
            return toDto(recipe, tagNames, "https://image.server.com/list-default.jpg");
        }).toList();
    }

    public List<RecipeResponseDto> searchByKeyword(String keyword) {
        List<Recipe> recipes = recipeRepository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);

        return recipes.stream().map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream()
                    .map(rt -> rt.getTag().getTagName())
                    .toList();
            return toDto(recipe, tagNames, "https://image.server.com/search-result.jpg");
        }).toList();
    }

    public List<RecipeResponseDto> searchByTags(String type, String situation, String ingredient, String method) {
        List<Recipe> recipes = recipeRepository
                .findByAllTagConditions(type, situation, ingredient, method);

        return recipes.stream().map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream()
                    .map(rt -> rt.getTag().getTagName())
                    .toList();
            return toDto(recipe, tagNames, "https://image.server.com/search-filtered.jpg");
        }).toList();
    }

    private RecipeResponseDto toDto(Recipe recipe, List<String> tags, String photoUrl) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setTitle(recipe.getTitle());
        dto.setContent(recipe.getContent());
        dto.setCookingTime(recipe.getCookingTime());
        dto.setSubscribed(recipe.getIsSubscribed());
        dto.setCreatedAt(recipe.getCreatedAt());
        dto.setViews(recipe.getViews());         // ✅ 조회수 포함
        dto.setLikes(recipe.getLikes());         // ✅ 좋아요 수 포함
        dto.setTags(tags);
        dto.setPhotoUrls(List.of(photoUrl));
        return dto;
    }
}
