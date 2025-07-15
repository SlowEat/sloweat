package com.sloweat.domain.admin.repository;

import com.sloweat.domain.admin.dto.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.AdminRecipeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminRecipeRepositoryCustom {
  Page<AdminRecipeResponse> getRecipes(AdminRecipeRequest request, Pageable pageable);
}
