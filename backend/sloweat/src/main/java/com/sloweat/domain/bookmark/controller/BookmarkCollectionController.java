package com.sloweat.domain.bookmark.controller;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.service.BookmarkCollectionService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmark-collections")
@RequiredArgsConstructor
public class BookmarkCollectionController {

    private final BookmarkCollectionService bookmarkCollectionService;

    // 컬렉션 생성
    @PostMapping
    public ResponseEntity<BookmarkCollectionResponseDto> createCollection(
            @RequestBody BookmarkCollectionRequestDto request,
            HttpSession session) {
        Integer userId = 1;

        bookmarkCollectionService.createCollection(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build(); //201 Return
    }

    // 컬렉션 전체 조회
    @GetMapping
    public ResponseEntity<List<BookmarkCollectionResponseDto>> getCollections(HttpSession session) {
        Integer userId = 1;

        return ResponseEntity.ok(bookmarkCollectionService.getCollections(userId));
    }

    // 컬렉션 이름 수정
    @PutMapping("/{collectionId}")
    public ResponseEntity<BookmarkCollectionResponseDto> updateCollection(
            @PathVariable Integer collectionId,
            @RequestBody BookmarkCollectionRequestDto request,
            HttpSession session) {

        Integer userId = 1;

        bookmarkCollectionService.updateCollection(collectionId, request);

        return ResponseEntity.status(HttpStatus.OK).build(); // 200
    }

    // 컬렉션 삭제
    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(
            @PathVariable Integer collectionId) {
        bookmarkCollectionService.deleteCollection(collectionId);
        return ResponseEntity.noContent().build(); // 204
    }

}
