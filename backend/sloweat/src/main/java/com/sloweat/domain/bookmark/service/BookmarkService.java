package com.sloweat.domain.bookmark.service;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.bookmark.entity.Bookmark;
import com.sloweat.domain.bookmark.entity.BookmarkCollection;
import com.sloweat.domain.bookmark.repository.BookmarkCollectionRepository;
import com.sloweat.domain.bookmark.repository.BookmarkRepository;
import com.sloweat.domain.recipe.dto.RecipeResponseDto;
import com.sloweat.domain.recipe.entity.Recipe;
import com.sloweat.domain.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookmarkCollectionRepository bookmarkCollectionRepository;

    // 북마크 생성
    @Transactional
    public void createBookmark(Integer userId, BookmarkRequestDto request) {
        Bookmark bookmark = new Bookmark();
        User user = new User();
        user.setUserId(userId);

        Recipe recipe = new Recipe();
        recipe.setRecipeId(request.getRecipeId());

        BookmarkCollection  bookmarkCollection = new BookmarkCollection();
        bookmarkCollection.setCollectionId(request.getCollectionId());

        bookmark.setCreatedAt(LocalDateTime.now());
        bookmark.setUser(user);
        bookmark.setRecipe(recipe);
        bookmark.setBookmarkCollection(bookmarkCollection);
        bookmarkRepository.save(bookmark);
    }

    // 북마크 조회 (컬렉션을 클릭해서 북마크를 조회하는 경우)
    public List<BookmarkResponseDto> getBookmarks(Integer userId, Integer collectionId) {
        // 특정 사용자의 컬렉션을 기준으로 게시글을 조회
        BookmarkCollection bookmarkCollection = bookmarkCollectionRepository.findByCollectionIdAndUser_UserId(collectionId, userId)
                .orElseThrow(() -> new IllegalArgumentException("컬렉션이 존재하지 않거나 접근 권한이 없습니다."));

        List<Bookmark> bookmarks = bookmarkRepository.findByCollectionId(collectionId);

        List<BookmarkResponseDto> result = bookmarks.stream()
                .map(bookmark -> BookmarkResponseDto.builder()
                        .bookmarkId(bookmark.getBookmarkId())
                        .collectionId(collectionId)
                        .userId(userId).build()
                ).collect(Collectors.toList());

        return result;
    }

    // 북마크 수정 (컬렉션 변경)
    @Transactional
    public void updateBookmark(Integer bookmarkId, BookmarkRequestDto request) {
        // 1. 북마크 조회
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new EntityNotFoundException("수정할 북마크가 없습니다."));

        // 2. 이동할 컬렉션 조회
        BookmarkCollection updateCollection = bookmarkCollectionRepository.findById(request.getUpdateCollectionId())
                .orElseThrow(() -> new EntityNotFoundException("이동할 컬렉션이 없습니다."));

        // 3. 컬렉션 이동
        bookmark.setBookmarkCollection(updateCollection);
        bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    @Transactional
    public void deleteBookmark(Integer bookmarkId, Integer userId) {

        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new EntityNotFoundException("삭제할 북마크가 없습니다."));


        // 본인 소유 북마크만 삭제 가능
        if(userId.equals(bookmark.getUser().getUserId())) {
            bookmarkRepository.deleteById(bookmarkId);
        }
    }
}
