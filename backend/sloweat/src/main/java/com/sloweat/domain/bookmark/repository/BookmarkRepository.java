package com.sloweat.domain.bookmark.repository;

import com.sloweat.domain.bookmark.entity.Bookmark;
import com.sloweat.domain.bookmark.entity.BookmarkCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {

    @Query(value = "SELECT b.* FROM bookmark b JOIN recipe r ON b.recipe_id = r.recipe_id WHERE b.collection_id = :collectionId", nativeQuery = true)
    List<Bookmark> findByCollectionId(@Param("collectionId") Integer collectionId);
}
