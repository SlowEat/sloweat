package com.sloweat.domain.recipe.service;

import com.sloweat.domain.bookmark.entity.Bookmark;
import com.sloweat.domain.bookmark.repository.BookmarkRepository;
import com.sloweat.domain.follow.repository.FollowRepository;
import com.sloweat.domain.recipe.dto.RecipeRequestDto;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.*;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import com.sloweat.domain.recipe.repository.*;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final TagRepository tagRepository;
    private final RecipeTagRepository recipeTagRepository;
    private final RecipeLikeRepository recipeLikeRepository;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final BookmarkRepository bookmarkRepository;

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
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod()).orElseThrow()
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
    public RecipeResponseDto getRecipeDetailWithViewIncrease(Integer loginUserId ,Integer id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다."));

        recipe.setViews(recipe.getViews() + 1);
        recipeRepository.save(recipe);

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        User user = userRepository.findById(recipe.getUser().getUserId()).orElseThrow();
        Boolean isLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, user);
        Boolean isBookmarked = bookmarkRepository.existsByRecipeAndUser(recipe, user);
        Boolean isMyPost = Objects.equals(recipe.getUser().getUserId(), loginUserId);
        User loginUser = new User();
        loginUser.setUserId(loginUserId);
        Boolean isFollowing = followRepository.existsByFollowerAndFollowing(loginUser, recipe.getUser());
        Bookmark bookmark = bookmarkRepository.findByRecipeAndUser(recipe, user);
        Integer bookmarkId = null;
        if(bookmark != null){
            bookmarkId = bookmark.getBookmarkId();
        }
        return ViewHomeDto(user, recipe, recipeTags, "https://image.server.com/list-default.jpg", isLiked, isBookmarked, isMyPost, isFollowing, bookmarkId);
    }

    public RecipeResponseDto getRecipeDetail(Integer id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) return null;

        List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
        return toDto(recipe, recipeTags, "https://image.server.com/photo1.jpg");
    }

    @Transactional
    public void reportRecipe(int recipeId, String reason) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("레시피를 찾을 수 없습니다."));

        recipe.setReportCount(recipe.getReportCount() + 1);
        recipe.setStatus(Recipe.Status.REQUEST);
        recipe.setUpdatedAt(LocalDateTime.now());

        recipeRepository.save(recipe);
    }

    @Transactional
    public void updateRecipe(int recipeId, Integer userId, RecipeRequestDto dto) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 레시피입니다."));

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
                tagRepository.findByTagTypeAndTagName(TagType.TYPE, dto.getType()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.SITUATION, dto.getSituation()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.INGREDIENT, dto.getIngredient()).orElseThrow(),
                tagRepository.findByTagTypeAndTagName(TagType.METHOD, dto.getMethod()).orElseThrow()
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
                .orElseThrow(() -> new IllegalArgumentException("삭제할 레시피가 존재하지 않습니다."));

        if (!recipe.getUser().getUserId().equals(userId)) {
            throw new SecurityException("작성자만 삭제할 수 있습니다.");
        }

        recipeRepository.deleteById(recipeId);
    }

    @Transactional
    public void likeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        if (recipeLikeRepository.existsByRecipeAndUser(recipe, user)) return;

        recipe.setLikes(recipe.getLikes() + 1);
        recipeRepository.save(recipe);

        RecipeLike like = new RecipeLike();
        like.setRecipe(recipe);
        like.setUser(user);
        like.setCreatedAt(LocalDateTime.now());
        recipeLikeRepository.save(like);
    }

    @Transactional
    public void unlikeRecipe(int recipeId, int userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        recipe.setLikes(Math.max(0, recipe.getLikes() - 1));
        recipeRepository.save(recipe);
        recipeLikeRepository.deleteByRecipeAndUser(recipe, user);
    }

    @Transactional(readOnly = true)
    public Page<RecipeResponseDto> getAllRecipesWithPagination(String sort, Pageable pageable, Integer loginUserId) {
        Sort sorting = "popular".equalsIgnoreCase(sort)
                ? Sort.by(Sort.Direction.DESC, "views")
                : Sort.by(Sort.Direction.DESC, "createdAt");

        Page<Recipe> recipePage = recipeRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sorting));

        return recipePage.map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            User user = userRepository.findById(recipe.getUser().getUserId()).orElseThrow(); //레시피 작성자
            User loginUser =  userRepository.findById(loginUserId).orElseThrow(); //로그인 유저

            //좋아요와 북마크, 내 포스트 판단 여부, 팔로잉 여부는 '로그인'한 사용자 기준으로 처리되어야 함
            Boolean isLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, loginUser);
            Boolean isBookmarked = bookmarkRepository.existsByRecipeAndUser(recipe, loginUser);
            Boolean isMyPost = Objects.equals(recipe.getUser().getUserId(), loginUserId);
            Boolean isFollowing = followRepository.existsByFollowerAndFollowing(loginUser, recipe.getUser());

            Bookmark bookmark = bookmarkRepository.findByRecipeAndUser(recipe, loginUser);
            Integer bookmarkId = null;

            if(bookmark != null){
                bookmarkId = bookmark.getBookmarkId();
            }

            return ViewHomeDto(user, recipe, recipeTags, "https://image.server.com/list-default.jpg", isLiked, isBookmarked, isMyPost, isFollowing, bookmarkId);
        });
    }

    public List<RecipeResponseDto> searchByTags(String type, String situation, String ingredient, String method, String sort) {
        List<Recipe> recipes = recipeRepository.findByAllTagConditions(type, situation, ingredient, method);
        if ("popular".equalsIgnoreCase(sort)) {
            recipes.sort((r1, r2) -> Integer.compare(r2.getViews(), r1.getViews()));
        } else {
            recipes.sort((r1, r2) -> r2.getCreatedAt().compareTo(r1.getCreatedAt()));
        }
        return toDtoList(recipes, "https://image.server.com/search-filtered.jpg");
    }

    public List<RecipeResponseDto> searchByKeyword(String keyword, String sort) {
        List<Recipe> recipes = "popular".equalsIgnoreCase(sort)
                ? recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByViewsDesc(keyword, keyword)
                : recipeRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(keyword, keyword);

        return toDtoList(recipes, "https://image.server.com/search-result.jpg");
    }

    @Transactional(readOnly = true)
    public Page<RecipeResponseDto> getFollowingsRecipes(Integer loginUserId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Recipe> recipePage = recipeRepository.findFollowingUsersRecipes(loginUserId, pageable);

        return recipePage.map(recipe -> {
            User user = userRepository.findById(recipe.getUser().getUserId()).orElseThrow();
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            Boolean isLiked = recipeLikeRepository.existsByRecipeAndUser(recipe, user);
            Boolean isBookmarked = bookmarkRepository.existsByRecipeAndUser(recipe, user);

            Boolean isMyPost = Objects.equals(recipe.getUser().getUserId(), loginUserId);

            User loginUser = new User();
            loginUser.setUserId(loginUserId);

            Boolean isFollowing = followRepository.existsByFollowerAndFollowing(loginUser, recipe.getUser());

            Bookmark bookmark = bookmarkRepository.findByRecipeAndUser(recipe, user);
            Integer bookmarkId = null;

            if(bookmark != null){
                bookmarkId = bookmark.getBookmarkId();
            }

            return ViewHomeDto(user, recipe, recipeTags, "https://image.server.com/follow.jpg", isLiked, isBookmarked, isMyPost, isFollowing, bookmarkId);
        });
    }

    // ✅ DTO 변환
    private List<RecipeResponseDto> toDtoList(List<Recipe> recipes, String photoUrl) {
        return recipes.stream().map(recipe -> {
            List<RecipeTag> recipeTags = recipeTagRepository.findByRecipe(recipe);
            return toDto(recipe, recipeTags, photoUrl);
        }).toList();
    }

    // ✅ 핵심 수정: 작성자 정보 포함
    private RecipeResponseDto toDto(Recipe recipe, List<RecipeTag> recipeTags, String photoUrl) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setUserId(recipe.getUser().getUserId());
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
        dto.setTags(recipeTags.stream().map(rt -> rt.getTag().getTagName()).toList());
        dto.setPhotoUrls(List.of(photoUrl));

        for (RecipeTag rt : recipeTags) {
            switch (rt.getTag().getTagType()) {
                case TYPE -> dto.setType(rt.getTag().getTagName());
                case SITUATION -> dto.setSituation(rt.getTag().getTagName());
                case INGREDIENT -> dto.setIngredient(rt.getTag().getTagName());
                case METHOD -> dto.setMethod(rt.getTag().getTagName());
            }
        }

        // ✅ 작성자 정보 설정 추가
        User user = recipe.getUser();
        if (user != null) {
            dto.setChefName(user.getNickname());
            dto.setUsername(user.getLocalEmail() != null ? user.getLocalEmail() : user.getKakaoEmail());
            dto.setProfileImgPath(user.getProfileImgPath());
        }

        return dto;
    }

    // 북마크, 좋아요, 팔로우, 내가 쓴 글 여부 체크
    private RecipeResponseDto toDto2(Recipe recipe, List<RecipeTag> recipeTags, String photoUrl, Boolean isLiked, Boolean isBookmarked, Boolean isMyPost, Boolean isFollowing, Integer bookmarkId, User userInfo) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setUserId(recipe.getUser().getUserId());
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
        dto.setTags(recipeTags.stream().map(rt -> rt.getTag().getTagName()).toList());
        dto.setPhotoUrls(List.of(photoUrl));
        dto.setIsLiked(isLiked);
        dto.setIsMyPost(isMyPost);
        dto.setIsBookmarked(isBookmarked);
        dto.setIsFollowing(isFollowing);
        dto.setBookmarkId(bookmarkId);
        dto.setProfileImgPath(userInfo.getProfileImgPath());

        for (RecipeTag rt : recipeTags) {
            switch (rt.getTag().getTagType()) {
                case TYPE -> dto.setType(rt.getTag().getTagName());
                case SITUATION -> dto.setSituation(rt.getTag().getTagName());
                case INGREDIENT -> dto.setIngredient(rt.getTag().getTagName());
                case METHOD -> dto.setMethod(rt.getTag().getTagName());
            }
        }

        // ✅ 작성자 정보 설정 추가
        User user = recipe.getUser();
        if (user != null) {
            dto.setChefName(user.getNickname());
            dto.setUsername(user.getLocalEmail() != null ? user.getLocalEmail() : user.getKakaoEmail());
        }

        return dto;
    }


    private RecipeResponseDto ViewHomeDto(User user,
                                          Recipe recipe,
                                          List<RecipeTag> tags,
                                          String photoUrl,
                                          Boolean isLiked,
                                          Boolean isBookmarked,
                                          Boolean isMyPost,
                                          Boolean isFollowing,
                                          Integer bookmarkId) {
        RecipeResponseDto dto = toDto2(recipe, tags, photoUrl, isLiked, isBookmarked, isMyPost, isFollowing, bookmarkId, user);
        dto.setChefName(user.getNickname());
        dto.setUsername(user.getLocalEmail() != null ? user.getLocalEmail() : user.getKakaoEmail());
        return dto;
    }
}
