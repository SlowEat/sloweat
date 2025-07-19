package com.sloweat.domain.bookmark.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.bookmark.entity.QBookmark;
import com.sloweat.domain.bookmark.entity.QBookmarkCollection;
import com.sloweat.domain.recipe.entity.QRecipe;
import com.sloweat.domain.user.entity.QUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookmarkRepositoryCustomImpl implements BookmarkRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BookmarkRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<BookmarkResponseDto> getBookmarks(Integer collectionId) {

        QBookmarkCollection a = QBookmarkCollection.bookmarkCollection;
        QBookmark b = QBookmark.bookmark;
        QRecipe c = QRecipe.recipe;
        QUser d = QUser.user;

        return queryFactory
                .select(Projections.constructor(BookmarkResponseDto.class,
                        b.bookmarkId,
                        d.userId,
                        c.recipeId,
                        a.collectionId,
                        a.collectionName,
                        d.nickname,
                        d.localEmail,
                        d.kakaoEmail,
                        c.title,
                        c.content,
                        c.cookingTime,
                        c.views,
                        c.likes
                ))
                .from(a)
                .join(b).on(a.collectionId.eq(b.bookmarkCollection.collectionId))
                .join(c).on(b.recipe.recipeId.eq(c.recipeId))
                .join(d).on(c.user.userId.eq(d.userId))
                .where(a.collectionId.eq(collectionId))
                .fetch();
    }
}
