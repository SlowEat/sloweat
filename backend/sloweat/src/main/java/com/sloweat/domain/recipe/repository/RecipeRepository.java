package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
