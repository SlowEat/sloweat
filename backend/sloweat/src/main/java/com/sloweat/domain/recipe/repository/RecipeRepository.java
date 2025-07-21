package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    // 🔍 제목 포함 검색
    List<Recipe> findByTitleContainingIgnoreCase(String keyword);

    // 🔍 제목 또는 본문 포함 검색
    List<Recipe> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String titleKeyword, String contentKeyword);

    // ✅ 🔍 제목+본문 포함 검색 (조회수 내림차순)
    List<Recipe> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByViewsDesc(String titleKeyword, String contentKeyword);

    // ✅ 🔍 제목+본문 포함 검색 (등록일 내림차순)
    List<Recipe> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(String titleKeyword, String contentKeyword);

    // 🔍 필터 검색 (모든 태그 타입이 만족하는 레시피만 조회)
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

    // ✅ 특정 유저가 작성한 레시피 목록 조회
    List<Recipe> findByUser(User user);

    // 🏆 좋아요순 정렬
    List<Recipe> findAllByOrderByLikesDesc();

    // 🕓 최신순 정렬
    List<Recipe> findAllByOrderByCreatedAtDesc();

    // 📈 조회수순 정렬
    List<Recipe> findAllByOrderByViewsDesc();

    // 📊 특정 유저가 작성한 레시피 개수
    long countByUser(User user);
    // 내가 팔로우한 유저의 게시글 가져오기
    @Query("SELECT r FROM Recipe r WHERE r.user IN (" +
            "SELECT f.following FROM Follow f WHERE f.follower.userId = :userId)" +
            "ORDER BY r.createdAt DESC")
    Page<Recipe> findFollowingUsersRecipes(@Param("userId") Integer userId, Pageable pageable);
}
