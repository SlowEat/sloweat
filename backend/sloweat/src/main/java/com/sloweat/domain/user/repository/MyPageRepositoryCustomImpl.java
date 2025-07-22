package com.sloweat.domain.user.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.bookmark.dto.BookmarkResponseDto;
import com.sloweat.domain.bookmark.entity.QBookmark;
import com.sloweat.domain.bookmark.entity.QBookmarkCollection;
import com.sloweat.domain.comment.entity.QComment;
import com.sloweat.domain.comment.entity.QCommentLike;
import com.sloweat.domain.follow.entity.QFollow;
import com.sloweat.domain.recipe.entity.QRecipe;
import com.sloweat.domain.recipe.entity.QRecipeLike;
import com.sloweat.domain.user.dto.MyPageCommentResponseDto;
import com.sloweat.domain.user.dto.MyPageRecipeResponseDto;
import com.sloweat.domain.user.entity.QUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MyPageRepositoryCustomImpl implements MyPageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MyPageRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<MyPageRecipeResponseDto> getMyRecipes(Integer loginUserId) {
        QRecipe c = QRecipe.recipe;
        QUser d = QUser.user;
        QFollow e = QFollow.follow;

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

        // 팔로우 여부
        BooleanExpression isFollowing = JPAExpressions
                .selectOne()
                .from(e)
                .where(
                        e.follower.userId.eq(loginUserId),
                        e.following.userId.eq(c.user.userId)
                )
                .exists();

        // 내가 쓴 글 여부
        Expression<Boolean> isMyPost = c.user.userId.eq(loginUserId);

        return queryFactory
                .select(Projections.constructor(MyPageRecipeResponseDto.class,
                        d.userId,
                        c.recipeId,
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
                .from(c)
                .join(d).on(c.user.userId.eq(d.userId))
                .where(c.user.userId.eq(loginUserId))
                .orderBy(c.createdAt.desc())
                .fetch();
    }

    @Override
    public List<MyPageCommentResponseDto> getMyComments(Integer loginUserId) {
        QComment c = QComment.comment;
        QUser e = QUser.user;

        // 좋아요 여부 (exists 서브쿼리)
        BooleanExpression isLiked = JPAExpressions
                .selectOne()
                .from(QCommentLike.commentLike)
                .where(
                        QCommentLike.commentLike.comment.commentId.eq(c.commentId),
                        QCommentLike.commentLike.user.userId.eq(loginUserId)
                )
                .exists();

        // 내가 쓴 댓글 여부
        Expression<Boolean> isMyComment = c.user.userId.eq(loginUserId);

        return queryFactory
                .select(Projections.constructor(MyPageCommentResponseDto.class,
                        c.commentId,
                        e.userId,
                        c.recipe.recipeId,
                        e.nickname,
                        e.localEmail,
                        e.kakaoEmail,
                        c.content,
                        c.createdAt,
                        isLiked,
                        isMyComment
                ))
                .from(c)
                .join(e).on(c.user.userId.eq(e.userId))
                .where(
                        c.user.userId.eq(loginUserId),
                        c.isDeleted.isFalse()
                )
                .orderBy(c.createdAt.desc())
                .fetch();
    }
}
