package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.recipe.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.recipe.AdminRecipeResponse;
import com.sloweat.domain.admin.repository.recipe.AdminRecipeRepository;
import com.sloweat.domain.admin.repository.recipe_report.AdminRecipeReportRepository;
import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.entity.Recipe.Status;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminRecipeService {
  private final AdminRecipeRepository adminRecipeRepository;
  private final AdminRecipeReportRepository  adminRecipeReportRepository;

  public Page<AdminRecipeResponse> getRecipes(AdminRecipeRequest request, Pageable pageable) {
    return adminRecipeRepository.getRecipes(request, pageable);
  }

  @Transactional
  public void deleteRecipe(Integer recipeId){
    Recipe recipe = adminRecipeRepository.findById(recipeId).orElseThrow(()-> new EntityNotFoundException("해당 게시글이 존재하지 않습니다."));

    // 신고 상태가 REQUEST인 경우만 처리 가능하도록 처리할까하였으나 관리자가 먼저 발견하는 경우도 있을 수 있다고 판단

    adminRecipeRepository.delete(recipe);
  }

  @Transactional
  public void rejectReportRecipe(Integer recipeId){
    Recipe recipe = adminRecipeRepository.findById(recipeId).orElseThrow(()-> new EntityNotFoundException("해당 게시글이 존재하지 않습니다."));

    // 신고 상태가 REQUEST일 경우에만 가능
    if(recipe.getStatus() != Status.REQUEST){
      throw new IllegalStateException("게시글 신고 상태가 REQUEST일 경우에만 가능합니다.");
    }

    // REJECT로 상태 변경
    recipe.setStatus(Status.REJECT);

    // 레시피 레포트 테이블에서는 다 지워야 함. 이렇게 되면 신고수는 자동으로 0으로 카운트 됨.
    adminRecipeReportRepository.deleteByRecipe(recipe);

    // 저장
    adminRecipeRepository.save(recipe);
  }
}
