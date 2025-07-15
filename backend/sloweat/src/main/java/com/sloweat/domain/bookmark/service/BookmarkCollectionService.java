package com.sloweat.domain.bookmark.service;

import com.sloweat.domain.bookmark.dto.BookmarkCollectionRequestDto;
import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.entity.BookmarkCollection;
import com.sloweat.domain.bookmark.repository.BookmarkCollectionRepository;
import com.sloweat.domain.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkCollectionService {

    private final BookmarkCollectionRepository bookmarkCollectionRepository;

    // 컬렉션 생성
    public void createCollection(Integer userId, BookmarkCollectionRequestDto request){
        BookmarkCollection bookmarkCollection = new BookmarkCollection();
        User user = new User();
        user.setUserId(userId);
        bookmarkCollection.setUser(user);
        bookmarkCollection.setCollectionName(request.getCollectionName());
        bookmarkCollection.setCreatedAt(LocalDateTime.now());

        bookmarkCollectionRepository.save(bookmarkCollection);
    }

    // 컬렉션 조회
    public List<BookmarkCollectionResponseDto> getCollections(Integer userId){

        List<BookmarkCollection> bookmarkCollectionList = bookmarkCollectionRepository.findAll();

        List<BookmarkCollectionResponseDto> result  = bookmarkCollectionList.stream()
                .map(collection -> BookmarkCollectionResponseDto.builder()
                        .collectionId(collection.getCollectionId())
                        .collectionName(collection.getCollectionName())
                        .userId(collection.getUser().getUserId())
                        .createdAt(collection.getCreatedAt())
                        .build()
                )
                .collect(Collectors.toList());

        return result;
    }

    // 컬렉션 수정
    @Transactional
    public void updateCollection(Integer collectionId, BookmarkCollectionRequestDto request){
        BookmarkCollection bookmarkCollection = bookmarkCollectionRepository.findByCollectionId(collectionId)
                .orElseThrow(() -> new EntityNotFoundException("북마크를 찾을 수 없습니다."));

        bookmarkCollection.setCollectionName(request.getCollectionName());
    }

    // 컬렉션 삭제
    public void deleteCollection(Integer collectionId){
        bookmarkCollectionRepository.deleteById(collectionId);
    }
}
