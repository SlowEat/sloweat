package com.sloweat.domain.admin.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JPARepository는 기본 CRUD
// AdminRecipeRepositoryCustom은 Querydsl 사용한 쿼리
public interface AdminRecipeRepository extends JpaRepository<Recipe, Integer>, AdminRecipeRepositoryCustom {

}
