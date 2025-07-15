package com.sloweat.domain.bookmark.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BookmarkCollectionRequestDto {

    private Integer collectionId;
    private Integer userId;
    private String collectionName;
    private LocalDateTime createdAt;

}