package com.sloweat.domain.bookmark.repository;

import com.sloweat.domain.bookmark.entity.Bookmark;
import com.sloweat.domain.bookmark.entity.BookmarkCollection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {

}
