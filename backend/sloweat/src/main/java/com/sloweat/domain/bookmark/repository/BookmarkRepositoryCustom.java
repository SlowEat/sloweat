package com.sloweat.domain.bookmark.repository;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;

import java.util.List;

public interface BookmarkRepositoryCustom {

    public List<BookmarkResponseDto> getBookmarks(Integer collectionId);
}
