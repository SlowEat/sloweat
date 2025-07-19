package com.sloweat.domain.bookmark.repository;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;

import java.util.List;

public interface BookmarkCollectionRepositoryCustom {

    public List<BookmarkCollectionResponseDto> getBookmarkCollections(Integer targetUserId);
}
