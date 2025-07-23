package com.sloweat.domain.bookmark.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.bookmark.dto.BookmarkCollectionResponseDto;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.bookmark.entity.QBookmark;
import com.sloweat.domain.bookmark.entity.QBookmarkCollection;
import com.sloweat.domain.follow.entity.QFollow;
import com.sloweat.domain.recipe.entity.QRecipe;
import com.sloweat.domain.recipe.entity.QRecipeLike;
import com.sloweat.domain.recipe.entity.QRecipeTag;
import com.sloweat.domain.recipe.entity.QTag;
import com.sloweat.domain.user.entity.QUser;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class BookmarkRepositoryCustomImpl implements BookmarkRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BookmarkRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<BookmarkResponseDto> getBookmarks(Integer collectionId, Integer loginUserId) {

        QBookmarkCollection a = QBookmarkCollection.bookmarkCollection;
        QBookmark b = QBookmark.bookmark;
        QRecipe c = QRecipe.recipe;
        QUser d = QUser.user;
        QFollow f = QFollow.follow;
        QRecipeTag tag = QRecipeTag.recipeTag;

        // 좋아요 여부 (exists 서브쿼리)
        BooleanExpression isLiked = JPAExpressions
                .selectOne()
                .from(QRecipeLike.recipeLike)
                .where(
                        QRecipeLike.recipeLike.recipe.recipeId.eq(c.recipeId),
                        QRecipeLike.recipeLike.user.userId.eq(loginUserId)
                )
                .exists();

        // 북마크 여부 (exists 서브쿼리)
        BooleanExpression isBookmarked = JPAExpressions
                .selectOne()
                .from(QBookmark.bookmark)
                .where(
                        QBookmark.bookmark.recipe.recipeId.eq(c.recipeId),
                        QBookmark.bookmark.user.userId.eq(loginUserId)
                )
                .exists();

        // 팔로잉 여부 (isFollowing)
        BooleanExpression isFollowing = JPAExpressions
                .selectOne()
                .from(f)
                .where(
                        f.follower.userId.eq(loginUserId),  // 로그인 유저가
                        f.following.userId.eq(d.userId)     // 이 작성자를 팔로우하고 있는지
                )
                .exists();

        //내가 작성한 게시물인지
        BooleanExpression isMyPost = d.userId.eq(loginUserId);

        List<BookmarkResponseDto> bookmarks =  queryFactory
                .select(Projections.constructor(BookmarkResponseDto.class,
                        b.bookmarkId,
                        d.userId,
                        c.recipeId,
                        a.collectionId,
                        a.collectionName,
                        d.nickname,
                        d.localEmail,
                        d.kakaoEmail,
                        d.profileImgPath,
                        c.title,
                        c.content,
                        c.cookingTime,
                        c.views,
                        c.likes,
                        isLiked,
                        isBookmarked,
                        isFollowing,
                        isMyPost
                ))
                .from(a)
                .join(b).on(a.collectionId.eq(b.bookmarkCollection.collectionId))
                .join(c).on(b.recipe.recipeId.eq(c.recipeId))
                .join(d).on(c.user.userId.eq(d.userId))
                .where(a.collectionId.eq(collectionId))
                .fetch();


        // 1. recipeIds 수집
        List<Integer> recipeIds = bookmarks.stream()
                .map(BookmarkResponseDto::getRecipeId)
                .distinct()
                .collect(Collectors.toList());

        // 2. recipeId → 태그 목록 매핑
        QRecipeTag recipeTag = QRecipeTag.recipeTag;
        QTag t = QTag.tag;

        Map<Integer, List<String>> recipeTagsMap = queryFactory
                .select(recipeTag.recipe.recipeId, t.tagName)
                .from(recipeTag)
                .join(t).on(recipeTag.tag.tagId.eq(t.tagId))
                .where(recipeTag.recipe.recipeId.in(recipeIds))
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        tuple -> tuple.get(recipeTag.recipe.recipeId),
                        Collectors.mapping(tuple -> tuple.get(t.tagName), Collectors.toList())
                ));

        // 3. 각 DTO에 태그 set
        for (BookmarkResponseDto dto : bookmarks) {
            dto.setTags(recipeTagsMap.getOrDefault(dto.getRecipeId(), Collections.emptyList()));
        }


        return bookmarks;
    }
}
