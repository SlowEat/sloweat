package com.sloweat.domain.bookmark.repository;

import com.sloweat.domain.bookmark.entity.BookmarkCollection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkCollectionRepository extends JpaRepository<BookmarkCollection, Integer> {

    Optional<BookmarkCollection> findByCollectionId(Integer collectionId);
}
