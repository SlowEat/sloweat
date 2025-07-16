package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.AdminRecipeResponse;
import com.sloweat.domain.admin.repository.AdminRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminRecipeService {
  private final AdminRecipeRepository adminRecipeRepository;

  public Page<AdminRecipeResponse> getRecipes(AdminRecipeRequest request, Pageable pageable) {
    return adminRecipeRepository.getRecipes(request, pageable);
  }
}
