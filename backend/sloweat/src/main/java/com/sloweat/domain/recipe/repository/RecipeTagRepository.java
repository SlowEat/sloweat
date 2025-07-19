package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.recipe.entity.RecipeTag;
import com.sloweat.domain.recipe.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeTagRepository extends JpaRepository<RecipeTag, Integer> {

    /**
     * ✅ 특정 레시피에 연결된 태그 목록 조회
     */
    List<RecipeTag> findByRecipe(Recipe recipe);

    /**
     * ✅ 특정 태그에 연결된 레시피 목록 조회 (선택)
     */
    List<RecipeTag> findByTag(Tag tag);

    /**
     * ✅ 레시피 ID 기반 태그 조회 (선택)
     */
    List<RecipeTag> findByRecipe_RecipeId(Integer recipeId);

    /**
     * ✅ 특정 레시피에 연결된 모든 태그 삭제 (태그 수정 시 사용)
     */
    void deleteByRecipe(Recipe recipe);
}
