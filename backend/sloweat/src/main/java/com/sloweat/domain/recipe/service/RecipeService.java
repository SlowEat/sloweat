package com.sloweat.domain.recipe.service;

import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.*;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import com.sloweat.domain.recipe.repository.*;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import com.sloweat.domain.follow.repository.FollowRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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
    private final FollowRepository followRepository;

    // ✅ 저장
    public int saveRecipe(Integer userId, RecipeRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다"));

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

        Recipe saved = recipeRepository.save(recipe);

        List<Tag> tags = List.of(
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod()).orElseThrow()
        );

        for (Tag tag : tags) {
            RecipeTag rt = new RecipeTag();
            rt.setRecipe(saved);
            rt.setTag(tag);
            rt.setCreatedAt(LocalDateTime.now());
            recipeTagRepository.save(rt);
        }

        return saved.getRecipeId();
    }

    // ✅ 상세 조회 + 조회수 증가
    @Transactional
    public RecipeResponseDto getRecipeDetailWithViewIncrease(Integer id, Integer currentUserId) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다"));
        recipe.setViews(recipe.getViews() + 1);
        recipeRepository.save(recipe);

        List<RecipeTag> tags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = tags.stream().map(rt -> rt.getTag().getTagName()).toList();

        return toDto(recipe, tagNames, "https://image.server.com/detail.jpg", currentUserId);
    }

    public RecipeResponseDto getRecipeDetail(Integer id, Integer currentUserId) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) return null;

        List<RecipeTag> tags = recipeTagRepository.findByRecipe(recipe);
        List<String> tagNames = tags.stream().map(rt -> rt.getTag().getTagName()).toList();

        return toDto(recipe, tagNames, "https://image.server.com/detail.jpg", currentUserId);
    }

    // ✅ 전체 목록 조회
    public Page<RecipeResponseDto> getAllRecipesWithPagination(String sort, Pageable pageable, Integer currentUserId) {
        Sort sorting = "popular".equalsIgnoreCase(sort)
                ? Sort.by(Sort.Direction.DESC, "views")
                : Sort.by(Sort.Direction.DESC, "createdAt");

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sorting);

        Page<Recipe> recipePage = recipeRepository.findAll(sortedPageable);

        return recipePage.map(recipe -> {
            List<RecipeTag> tags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = tags.stream().map(rt -> rt.getTag().getTagName()).toList();
            return toDto(recipe, tagNames, "https://image.server.com/list-default.jpg", currentUserId);
        });
    }

    // ✅ 키워드 검색
    public List<RecipeResponseDto> searchByKeyword(String keyword, String sort, Integer currentUserId) {
        List<Recipe> recipes = "popular".equalsIgnoreCase(sort)
                ? recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByViewsDesc(keyword, keyword)
                : recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(keyword, keyword);

        return toDtoList(recipes, "https://image.server.com/search-result.jpg", currentUserId);
    }

    // ✅ 필터 검색
    public List<RecipeResponseDto> searchByTags(String type, String situation, String ingredient, String method, String sort, Integer currentUserId) {
        List<Recipe> recipes = recipeRepository.findByAllTagConditions(type, situation, ingredient, method);

        if ("popular".equalsIgnoreCase(sort)) {
            recipes.sort((a, b) -> Integer.compare(b.getViews(), a.getViews()));
        } else {
            recipes.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        }

        return toDtoList(recipes, "https://image.server.com/search-filtered.jpg", currentUserId);
    }

    // ✅ 헬퍼: DTO 리스트 변환
    private List<RecipeResponseDto> toDtoList(List<Recipe> recipes, String photoUrl, Integer currentUserId) {
        return recipes.stream().map(recipe -> {
            List<RecipeTag> tags = recipeTagRepository.findByRecipe(recipe);
            List<String> tagNames = tags.stream().map(rt -> rt.getTag().getTagName()).toList();
            return toDto(recipe, tagNames, photoUrl, currentUserId);
        }).toList();
    }

    // ✅ 핵심: DTO 생성 로직 (로그인 유저 기준 판단)
    private RecipeResponseDto toDto(Recipe recipe, List<String> tags, String photoUrl, Integer currentUserId) {
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

        User author = recipe.getUser();
        dto.setChefName(author.getNickname());
        dto.setUsername(author.getNickname());
        dto.setMyRecipe(author.getUserId().equals(currentUserId));

        User currentUser = userRepository.findById(currentUserId).orElse(null);
        dto.setLiked(currentUser != null && recipeLikeRepository.existsByRecipeAndUser(recipe, currentUser));
//        dto.setFollowing(currentUser != null && followRepository.existsByFromUserIdAndToUserId(currentUserId, author.getUserId()));

        dto.setFollowing(
                currentUser != null &&
                        followRepository.existsByFollower_UserIdAndFollowing_UserId(currentUserId, author.getUserId())
        );


        dto.setTags(tags);
        dto.setPhotoUrls(List.of(photoUrl));
        return dto;
    }

    // ✅ 좋아요 등록
    @Transactional
    public void likeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        boolean alreadyLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, user);
        if (!alreadyLiked) {
            recipe.setLikes(recipe.getLikes() + 1);
            recipeRepository.save(recipe);
            RecipeLike like = new RecipeLike();
            like.setRecipe(recipe);
            like.setUser(user);
            like.setCreatedAt(LocalDateTime.now());
            recipeLikeRepository.save(like);
        }
    }

    // ✅ 좋아요 취소
    @Transactional
    public void unlikeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        recipe.setLikes(Math.max(0, recipe.getLikes() - 1));
        recipeRepository.save(recipe);
        recipeLikeRepository.deleteByRecipeAndUser(recipe, user);
    }

    // ✅ 수정
    @Transactional
    public void updateRecipe(int recipeId, Integer userId, RecipeRequestDto dto) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 수정 가능합니다.");
        }

        recipe.setTitle(dto.getTitle());
        recipe.setContent(dto.getContent());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setIsSubscribed(dto.isSubscribed());
        recipe.setUpdatedAt(LocalDateTime.now());
        recipeRepository.save(recipe);

        recipeTagRepository.deleteByRecipe(recipe);

        List<Tag> updatedTags = List.of(
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod()).orElseThrow()
        );

        for (Tag tag : updatedTags) {
            RecipeTag rt = new RecipeTag();
            rt.setRecipe(recipe);
            rt.setTag(tag);
            rt.setCreatedAt(LocalDateTime.now());
            recipeTagRepository.save(rt);
        }
    }

    // ✅ 삭제
    @Transactional
    public void deleteRecipe(int recipeId, Integer userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 삭제할 수 있습니다.");
        }
        recipeRepository.deleteById(recipeId);
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
}
