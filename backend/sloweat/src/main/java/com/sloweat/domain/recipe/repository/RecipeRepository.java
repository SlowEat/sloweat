package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    /**
     * 🔍 제목에 검색어가 포함된 레시피 조회 (대소문자 무시)
     */
    List<Recipe> findByTitleContainingIgnoreCase(String keyword);

    /**
     * 🔍 제목 또는 본문에 검색어가 포함된 레시피 조회 (대소문자 무시)
     */
    List<Recipe> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String titleKeyword, String contentKeyword);

    /**
     * 🔍 Tag 기반 필터 검색: 종류, 상황, 재료, 방법 태그가 모두 만족하는 레시피 반환
     */
    @Query("""
        SELECT r FROM Recipe r
        JOIN RecipeTag rt ON rt.recipe = r
        JOIN Tag t ON rt.tag = t
        WHERE (t.tagType = com.sloweat.domain.recipe.entity.Tag.TagType.TYPE AND t.tagName = :type)
           OR (t.tagType = com.sloweat.domain.recipe.entity.Tag.TagType.SITUATION AND t.tagName = :situation)
           OR (t.tagType = com.sloweat.domain.recipe.entity.Tag.TagType.INGREDIENT AND t.tagName = :ingredient)
           OR (t.tagType = com.sloweat.domain.recipe.entity.Tag.TagType.METHOD AND t.tagName = :method)
        GROUP BY r.recipeId
        HAVING COUNT(DISTINCT t.tagType) = 4
    """)
    List<Recipe> findByAllTagConditions(
            @Param("type") String type,
            @Param("situation") String situation,
            @Param("ingredient") String ingredient,
            @Param("method") String method
    );

    /**
     * ✅ 특정 유저가 작성한 레시피 개수 조회
     */
    long countByUser(User user);
}
