package com.sloweat.domain.bookmark.service;

import com.sloweat.domain.bookmark.repository.BookmarkCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkCollectionService {

    private BookmarkCollectionRepository bookmarkCollectionRepository;
}
