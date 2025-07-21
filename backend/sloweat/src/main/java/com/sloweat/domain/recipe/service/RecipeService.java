package com.sloweat.domain.recipe.service;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.service.FollowService;
import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.*;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import com.sloweat.domain.recipe.repository.*;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final TagRepository tagRepository;
    private final RecipeTagRepository recipeTagRepository;
    private final RecipeLikeRepository recipeLikeRepository;
    private final UserRepository userRepository;
    private final FollowService followService;

    // ✅ 저장
    public int saveRecipe(Integer userId, RecipeRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다: ID = " + userId));

        Recipe recipe = Recipe.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .cookingTime(dto.getCookingTime())
                .isSubscribed(dto.isSubscribed())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .views(0)
                .likes(0)
                .reportCount(0)
                .status(Recipe.Status.NONE)
                .user(user)
                .build();

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

    // ✅ 상세 조회 + 조회수 증가
    @Transactional
    public RecipeResponseDto getRecipeDetailWithViewIncrease(Integer id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + id));

        recipe.setViews(recipe.getViews() + 1);
        recipeRepository.save(recipe);

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = recipeTags.stream().map(rt -> rt.getTag().getTagName()).toList();

        return toDto(recipe, tagNames, "https://image.server.com/photo1.jpg");
    }

    public RecipeResponseDto getRecipeDetail(Integer id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) return null;

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = recipeTags.stream().map(rt -> rt.getTag().getTagName()).toList();

        return toDto(recipe, tagNames, "https://image.server.com/photo1.jpg");
    }

    // ✅ 신고 처리
    @Transactional
    public void reportRecipe(int recipeId, String reason) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + recipeId));

        int currentCount = recipe.getReportCount() != null ? recipe.getReportCount() : 0;
        recipe.setReportCount(currentCount + 1);
        recipe.setStatus(Recipe.Status.REQUEST);
        recipe.setUpdatedAt(LocalDateTime.now());

        recipeRepository.save(recipe);
    }

    // ✅ 수정
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

    // ✅ 삭제
    @Transactional
    public void deleteRecipe(int recipeId, Integer userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 레시피가 존재하지 않습니다: ID = " + recipeId));

        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 삭제할 수 있습니다.");
        }

        recipeRepository.deleteById(recipeId);
    }

    // ✅ 좋아요 등록
    @Transactional
    public void likeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + recipeId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: ID = " + userId));

        boolean alreadyLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, user);
        if (alreadyLiked) return;

        recipe.setLikes(recipe.getLikes() + 1);
        recipeRepository.save(recipe);

        RecipeLike like = new RecipeLike();
        like.setRecipe(recipe);
        like.setUser(user);
        like.setCreatedAt(LocalDateTime.now());
        recipeLikeRepository.save(like);
    }

    // ✅ 좋아요 취소
    @Transactional
    public void unlikeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다: ID = " + recipeId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: ID = " + userId));

        recipe.setLikes(Math.max(0, recipe.getLikes() - 1));
        recipeRepository.save(recipe);
        recipeLikeRepository.deleteByRecipeAndUser(recipe, user);
    }

    // ✅ 페이지네이션 목록 조회
    @Transactional(readOnly = true)
    public Page<RecipeResponseDto> getAllRecipesWithPagination(String sort, Pageable pageable) {
        Sort sorting = "popular".equalsIgnoreCase(sort)
                ? Sort.by(Sort.Direction.DESC, "views")
                : Sort.by(Sort.Direction.DESC, "createdAt");

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sorting);
        Page<Recipe> recipePage = recipeRepository.findAll(sortedPageable);

        return recipePage.map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream()
                    .map(rt -> rt.getTag().getTagName())
                    .toList();

            return toDto(recipe, tagNames, "https://image.server.com/list-default.jpg");
        });
    }

    // ✅ 필터 검색 + 정렬 기준 포함
    public List<RecipeResponseDto> searchByTags(String type, String situation, String ingredient, String method, String sort) {
        List<Recipe> recipes = recipeRepository.findByAllTagConditions(type, situation, ingredient, method);

        if ("popular".equalsIgnoreCase(sort)) {
            recipes.sort((r1, r2) -> Integer.compare(r2.getViews(), r1.getViews()));
        } else {
            recipes.sort((r1, r2) -> r2.getCreatedAt().compareTo(r1.getCreatedAt()));
        }

        return toDtoList(recipes, "https://image.server.com/search-filtered.jpg");
    }

    // ✅ 키워드 검색
    public List<RecipeResponseDto> searchByKeyword(String keyword, String sort) {
        List<Recipe> recipes = "popular".equalsIgnoreCase(sort)
                ? recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByViewsDesc(keyword, keyword)
                : recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(keyword, keyword);

        return toDtoList(recipes, "https://image.server.com/search-result.jpg");
    }

    public List<RecipeResponseDto> searchByKeyword(String keyword) {
        List<Recipe> recipes = recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);
        return toDtoList(recipes, "https://image.server.com/search-result.jpg");
    }

    public List<RecipeResponseDto> searchByTags(String type, String situation, String ingredient, String method) {
        List<Recipe> recipes = recipeRepository.findByAllTagConditions(type, situation, ingredient, method);
        return toDtoList(recipes, "https://image.server.com/search-filtered.jpg");
    }
//페이지네이션 설정을 적용하여 팔로잉하는 사용자들의 레시피를 가져옵니다.
    @Transactional(readOnly = true)
    public Page<RecipeResponseDto> getFollowingsRecipes(Integer userId, int page, int size) {
        // 1. 페이지네이션 설정을 적용하여 팔로잉하는 사용자들의 레시피를 가져옵니다.
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Recipe> recipePage = recipeRepository.findFollowingUsersRecipes(userId, pageable);
        // 2. Page<Recipe>를 순회하며 각 레시피에 대한 DTO를 생성합니다.
        return recipePage.map(recipe -> {
            // 3. 각 레시피에 연결된 태그 목록을 조회합니다.
            User userInfo = userRepository.findById(recipe.getUser().getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("유저가 존재 하지 않습니다."));
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream()
                    .map(rt -> rt.getTag().getTagName())
                    .toList();

            // 4. 레시피 엔티티와 태그 이름을 이용해 DTO를 생성하여 반환합니다.
            //    (toDto() 또는 유사한 로직을 직접 구현하거나, DTO 생성자/정적 팩토리 메서드를 사용)
            return FollowDto(userInfo,recipe,tagNames,"https://image.server.com/search-filtered.jpg");
        });
    }

    // ✅ DTO 변환 헬퍼
    private List<RecipeResponseDto> toDtoList(List<Recipe> recipes, String photoUrl) {
        return recipes.stream().map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = recipeTags.stream().map(rt -> rt.getTag().getTagName()).toList();
            return toDto(recipe, tagNames, photoUrl);
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
        dto.setViews(recipe.getViews());
        dto.setLikes(recipe.getLikes());
        dto.setStatus(recipe.getStatus().getLabel());
        dto.setReportCount(recipe.getReportCount());
        dto.setTags(tags);
        dto.setPhotoUrls(List.of(photoUrl));
        return dto;
    }

    private RecipeResponseDto FollowDto(User user, Recipe recipe, List<String> tags, String photoUrl) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setTitle(recipe.getTitle());
        dto.setContent(recipe.getContent());
        dto.setCookingTime(recipe.getCookingTime());
        dto.setSubscribed(recipe.getIsSubscribed());
        dto.setCreatedAt(recipe.getCreatedAt());
        dto.setViews(recipe.getViews());
        dto.setLikes(recipe.getLikes());
        dto.setStatus(recipe.getStatus().getLabel());
        dto.setReportCount(recipe.getReportCount());
        dto.setTags(tags);
        dto.setPhotoUrls(List.of(photoUrl));
        dto.setChefName(user.getNickname());

        if (user.getLocalEmail() != null ){
            dto.setUsername(user.getLocalEmail());
        } else{
            dto.setUsername(user.getKakaoEmail());
        }

        return dto;
    }
}
