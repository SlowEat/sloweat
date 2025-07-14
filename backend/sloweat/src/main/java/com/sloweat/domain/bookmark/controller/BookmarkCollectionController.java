package com.sloweat.domain.bookmark.controller;

import com.sloweat.domain.bookmark.service.BookmarkCollectionService;
import com.sloweat.domain.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class BookmarkCollectionController {

    private final BookmarkCollectionService bookmarkCollectionService;

}
