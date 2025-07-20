package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.entity.RecipeLike;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeLikeRepository extends JpaRepository<RecipeLike, Integer> {

    /**
     * ✅ 좋아요 유무 확인
     */
    boolean existsByRecipeAndUser(Recipe recipe, User user);

    /**
     * 💔 좋아요 취소
     */
    void deleteByRecipeAndUser(Recipe recipe, User user);

    /**
     * ❤️ 좋아요 개수 조회
     */
    long countByRecipe(Recipe recipe);

    /**
     * 🧍 특정 사용자가 누른 좋아요 목록
     */
    List<RecipeLike> findByUser(User user);

    /**
     * 📄 특정 게시글에 좋아요한 사용자 목록
     */
    List<RecipeLike> findByRecipe(Recipe recipe);
}
