package com.sloweat.domain.admin.repository.recipe;

import com.sloweat.domain.admin.dto.recipe.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.recipe.AdminRecipeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminRecipeRepositoryCustom {
  Page<AdminRecipeResponse> getRecipes(AdminRecipeRequest request, Pageable pageable);
}
