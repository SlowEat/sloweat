package com.sloweat.domain.admin.repository.recipe;

import com.sloweat.domain.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

// JPARepository는 기본 CRUD
// AdminRecipeRepositoryCustom은 Querydsl 사용한 쿼리
public interface AdminRecipeRepository extends JpaRepository<Recipe, Integer>, AdminRecipeRepositoryCustom {

}
