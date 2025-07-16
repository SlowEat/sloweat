package com.sloweat.domain.bookmark.controller;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.bookmark.service.BookmarkService;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    // 북마크 생성
    @PostMapping
    public ResponseEntity<BookmarkResponseDto> createBookmark(
            @RequestBody BookmarkRequestDto request,
            HttpSession session) {
        Integer userId = 1;

        bookmarkService.createBookmark(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build(); //201 Return
    }

    // 특정 컬렉션의 북마크된 게시글 조회 (컬렉션 클릭 이벤트)
    @GetMapping("/{collectionId}")
    public ResponseEntity<List<BookmarkResponseDto>> getBookmarks(
            @PathVariable Integer collectionId,
            HttpSession session) {
        Integer userId = 1;

        List<BookmarkResponseDto> bookmarks = bookmarkService.getBookmarks(userId, collectionId);
        return ResponseEntity.ok(bookmarks);
    }

    // 북마크 수정
    @PutMapping("/{bookmarkId}")
    public ResponseEntity<BookmarkResponseDto> updateBookmark(
            @PathVariable Integer bookmarkId,
            @RequestBody BookmarkRequestDto request,
            HttpSession session) {

        Integer userId = 1;
        request.setUserId(userId);
        bookmarkService.updateBookmark(bookmarkId, request);

        return ResponseEntity.status(HttpStatus.OK).build(); // 200
    }

    // 북마크 삭제
    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity<Void> deleteBookmark(
            @PathVariable Integer bookmarkId,
            HttpSession session) {
        Integer userId = 1;

        bookmarkService.deleteBookmark(bookmarkId, userId);
        return ResponseEntity.noContent().build(); // 204
    }
}
