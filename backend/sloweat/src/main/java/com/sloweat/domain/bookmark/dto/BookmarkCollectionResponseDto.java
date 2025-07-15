package com.sloweat.domain.bookmark.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BookmarkCollectionResponseDto {

    private Integer collectionId;
    private Integer userId;
    private String collectionName;
    private LocalDateTime createdAt;

}
