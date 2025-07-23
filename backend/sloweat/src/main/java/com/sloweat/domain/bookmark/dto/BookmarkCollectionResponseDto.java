package com.sloweat.domain.bookmark.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BookmarkCollectionResponseDto {

    private Integer collectionId;
    private Integer userId;
    private String collectionName;
    private LocalDateTime createdAt;
    private Long bookmarkCount;

    public BookmarkCollectionResponseDto (Integer collectionId, String collectionName, LocalDateTime createdAt, Long bookmarkCount) {
        this.collectionId = collectionId;
        this.collectionName = collectionName;
        this.createdAt = createdAt;
        this.bookmarkCount = bookmarkCount;
    }

}
