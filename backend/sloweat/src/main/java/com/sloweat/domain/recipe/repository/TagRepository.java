package com.sloweat.domain.recipe.repository;

import com.sloweat.domain.recipe.entity.Tag;
import com.sloweat.domain.recipe.entity.Tag.TagType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

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
}
