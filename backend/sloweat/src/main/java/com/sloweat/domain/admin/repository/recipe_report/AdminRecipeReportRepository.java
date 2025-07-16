package com.sloweat.domain.admin.repository.recipe_report;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.entity.RecipeReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRecipeReportRepository extends JpaRepository<RecipeReport,Integer> {
  public void deleteByRecipe(Recipe recipe);
}
