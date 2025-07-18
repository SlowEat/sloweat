package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    long countByUser(User user);
}
