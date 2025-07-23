package com.sloweat.domain.recipe.service;

import com.sloweat.domain.recipe.dto.PopularTagDto;
import com.sloweat.domain.recipe.entity.Tag;
import com.sloweat.domain.recipe.repository.TagRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {
  private final TagRepository tagRepository;

  public Map<String, List<String>> getAllTagsGroupedByType(){
    List<Tag> tags = tagRepository.findAllByOrderByTagTypeAscTagNameAsc();

    return tags.stream()
        .collect(Collectors.groupingBy(
            tag -> tag.getTagType().name(),
            LinkedHashMap::new,
            Collectors.mapping(Tag::getTagName, Collectors.toList())
        ));
  }

  // 태그 종류별로 2개씩 추려서 반환
  public Map<String, List<String>> getTopPopularTags() {
    List<PopularTagDto> allTags = tagRepository.getPopularTagCounts();

    // 타입별로 그룹핑 후 상위 2개씩 추출
    return allTags.stream()
        .collect(Collectors.groupingBy(
            PopularTagDto::getTagType,
            LinkedHashMap::new,
            Collectors.collectingAndThen(
                Collectors.toList(),
                list -> list.stream()
                    .limit(2)
                    .map(PopularTagDto::getTagName)
                    .collect(Collectors.toList())
            )
        ));
  }
}
