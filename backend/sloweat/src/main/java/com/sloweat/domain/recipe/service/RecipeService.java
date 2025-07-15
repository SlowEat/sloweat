//package com.sloweat.domain.recipe.service;
//
//import com.sloweat.domain.recipe.dto.RecipeResponseDto;
//import com.sloweat.domain.recipe.dto.RecipeRequestDto;
//import com.sloweat.domain.recipe.entity.Recipe;
//import com.sloweat.domain.recipe.repository.RecipeRepository;
//import com.sloweat.domain.user.entity.User;
//import com.sloweat.domain.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class RecipeService {
//
//    private final RecipeRepository recipeRepository;
//    private final UserRepository userRepository;
//
//    /**
//     * 새 레시피 저장
//     */
//    public void saveRecipe(RecipeRequestDto dto) {
//        Recipe recipe = new Recipe();
//
//        recipe.setTitle(dto.getTitle());
//        recipe.setContent(dto.getContent());
//        recipe.setCookingTime(dto.getCookingTime());
//        recipe.setIsSubscribed(dto.isSubscribed());
//        recipe.setCreatedAt(LocalDateTime.now());
//        recipe.setUpdatedAt(LocalDateTime.now());
//
//        User user = userRepository.findById(dto.getUserId()).orElse(null);
//        recipe.setUser(user);
//
//        recipeRepository.save(recipe);
//    }
//
//    /**
//     * 게시글 상세 조회
//     */
//    public RecipeResponseDto getRecipeDetail(Integer id) {
//        Recipe recipe = recipeRepository.findById(id).orElse(null);
//        if (recipe == null) return null;
//
//        RecipeResponseDto dto = new RecipeResponseDto();
//        dto.setRecipeId(recipe.getRecipeId());
//        dto.setTitle(recipe.getTitle());
//        dto.setContent(recipe.getContent());
//        dto.setCookingTime(recipe.getCookingTime());
//        dto.setSubscribed(recipe.getIsSubscribed());
//        dto.setCreatedAt(recipe.getCreatedAt());
//        dto.setViews(recipe.getViews());
//        dto.setLikes(recipe.getLikes());
//
////        if (recipe.getUser() != null) {
////            dto.setChefName(recipe.getUser().getName());
////            dto.setUsername("@" + recipe.getUser().getUsername());
////        }
//
//        // 예시: 태그나 사진이 있다면 여기에 추가할 수 있어
//        dto.setTags(List.of("크림파스타", "홈쿠킹", "이탈리안", "간단요리"));
//        dto.setPhotoUrls(List.of("https://image.server.com/photo1.jpg"));
//
//        return dto;
//    }
//}

package com.sloweat.domain.recipe.service;

import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.dto.RecipeRequestDto;
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
     * 새 레시피 저장 (📌 수정된 부분: int 반환)
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

        Recipe savedRecipe = recipeRepository.save(recipe); // 저장 후 객체 반환
        return savedRecipe.getRecipeId(); // 🟢 저장된 레시피의 ID 반환
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

        // 프로필 정보 추가하고 싶다면 아래 주석 해제
        // if (recipe.getUser() != null) {
        //     dto.setChefName(recipe.getUser().getName());
        //     dto.setUsername("@" + recipe.getUser().getUsername());
        // }

        // 예시: 태그나 사진이 있다면 여기에 추가할 수 있음
        dto.setTags(List.of("크림파스타", "홈쿠킹", "이탈리안", "간단요리"));
        dto.setPhotoUrls(List.of("https://image.server.com/photo1.jpg"));

        return dto;
    }
}
