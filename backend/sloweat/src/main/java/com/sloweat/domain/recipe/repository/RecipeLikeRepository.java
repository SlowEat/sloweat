package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.entity.RecipeLike;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeLikeRepository extends JpaRepository<RecipeLike, Integer> {
    boolean existsByRecipeAndUser(Recipe recipe, User user);
    void deleteByRecipeAndUser(Recipe recipe, User user);
    long countByRecipe(Recipe recipe);
}
