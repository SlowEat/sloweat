package com.sloweat.domain.recipe.service;

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
}
