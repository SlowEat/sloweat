package com.sloweat.domain.bookmark.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkRequestDto {

    private Integer bookmarkId;
    private Integer userId;
    private Integer recipeId;
    private Integer collectionId;

    private Integer currentCollectionId;
    private Integer updateCollectionId;
}
