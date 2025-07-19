package com.sloweat.domain.bookmark.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.entity.QBookmark;
import com.sloweat.domain.bookmark.entity.QBookmarkCollection;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.entity.QFollow;
import com.sloweat.domain.user.entity.QUser;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class BookmarkCollectionRepositoryCustomImpl implements BookmarkCollectionRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BookmarkCollectionRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<BookmarkCollectionResponseDto> getBookmarkCollections(Integer targetUserId) {

        QBookmarkCollection collection = QBookmarkCollection.bookmarkCollection;
        QBookmark bookmark = QBookmark.bookmark;

        return queryFactory
                .select(Projections.constructor(BookmarkCollectionResponseDto.class,
                        collection.collectionId,
                        collection.collectionName,
                        collection.createdAt,
                        bookmark.bookmarkId.count()
                ))
                .from(collection)
                .leftJoin(bookmark).on(collection.collectionId.eq(bookmark.bookmarkCollection.collectionId))
                .where(collection.user.userId.eq(targetUserId))
                .groupBy(collection.collectionId)
                .fetch();
    }
}
