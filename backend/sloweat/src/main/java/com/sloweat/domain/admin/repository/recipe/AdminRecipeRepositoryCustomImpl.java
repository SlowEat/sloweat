package com.sloweat.domain.admin.repository.recipe;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.admin.dto.recipe.AdminRecipeRequest;
import com.sloweat.domain.admin.dto.recipe.AdminRecipeResponse;
import com.sloweat.domain.admin.dto.recipe.QAdminRecipeResponse;
import com.sloweat.domain.recipe.entity.QRecipe;
import com.sloweat.domain.recipe.entity.QRecipeReport;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRecipeRepositoryCustomImpl implements AdminRecipeRepositoryCustom{
  private final JPAQueryFactory queryFactory;

  public AdminRecipeRepositoryCustomImpl(JPAQueryFactory queryFactory) {
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<AdminRecipeResponse> getRecipes(AdminRecipeRequest request, Pageable pageable) {
    // Querydsl 객체 선언
    QRecipe recipe = QRecipe.recipe;
    QRecipeReport recipeReport = QRecipeReport.recipeReport;

    // 동적 검색 조건 생성
    // 검색 조건이 있을 때만 where 절에 추가하는 방식 => null-safe + 유연성
    BooleanBuilder where = new BooleanBuilder();

    if(request.getTitle() != null && !request.getTitle().isBlank()){
      where.and(recipe.title.containsIgnoreCase(request.getTitle()));
    }
    if(request.getAuthor() != null && !request.getAuthor().isBlank()){
      where.and(recipe.user.nickname.containsIgnoreCase(request.getAuthor()));
    }

    // 메인 쿼리
    List<AdminRecipeResponse> responses = queryFactory
        .select(new QAdminRecipeResponse( // dto로 매핑
            recipe.recipeId,
            recipe.title,
            recipe.user.nickname,
            recipe.createdAt,
            recipeReport.reportId.count().intValue(),
            recipe.status.stringValue()
        ))
        .from(recipe)
        .leftJoin(recipeReport).on(recipeReport.recipe.eq(recipe))  // 레시피 신고 수를 가져오기 위해 leftjoin
        .where(where)
        .groupBy(recipe.recipeId, recipe.title, recipe.user.nickname, recipe.createdAt)
        .offset(pageable.getOffset()) // 페이지네이션 처리
        .limit(pageable.getPageSize())
        .orderBy(recipe.createdAt.desc()) // 최신순 정렬
        .fetch();

    // 전체 개수 쿼리 (count 쿼리)
    // 페이징 처리 위해 전체 레코드 수 필요
    Long total = queryFactory
        .select(recipe.count())
        .from(recipe)
        .where(where)
        .fetchOne();

    // 페이지 객체로 반환
    return new PageImpl<>(responses, pageable, total != null ? total : 0);
  }
}
