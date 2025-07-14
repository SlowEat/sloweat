package com.sloweat.domain.bookmark.service;

import com.sloweat.domain.bookmark.repository.BookmarkCollectionRepository;
import com.sloweat.domain.bookmark.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
}
