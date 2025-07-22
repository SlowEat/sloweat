package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.dto.PopularTagDto;
import com.sloweat.domain.recipe.entity.Tag;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Integer> {

  /**
   * ✅ 태그 이름으로 조회 (단일 기준)
   */
  Tag findByTagName(String tagName);

  /**
   * ✅ 태그 타입 + 이름으로 정확히 조회
   */
  Optional<Tag> findByTagTypeAndTagName(TagType tagType, String tagName);

  /**
   * ✅ 특정 타입의 태그 목록 조회 (프론트 필터용)
   */
  List<Tag> findByTagType(TagType tagType);

  // 태그 가져오기
  List<Tag> findAllByOrderByTagTypeAscTagNameAsc();

  // 인기 태그 가져오기
  @Query(value = """
      SELECT t.tag_type AS tagType,
             t.tag_name AS tagName,
             COUNT(*) AS tagCount
      FROM recipe_tag rt
      JOIN tag t ON rt.tag_id = t.tag_id
      GROUP BY t.tag_id, t.tag_type, t.tag_name
      ORDER BY t.tag_type, tagCount DESC
      """, nativeQuery = true)
  List<PopularTagDto> getPopularTagCounts();
}
