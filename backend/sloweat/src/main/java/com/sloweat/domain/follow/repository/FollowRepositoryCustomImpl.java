package com.sloweat.domain.follow.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.admin.dto.comment.AdminCommentResponse;
import com.sloweat.domain.admin.dto.comment.QAdminCommentResponse;
import com.sloweat.domain.comment.entity.QComment;
import com.sloweat.domain.comment.entity.QCommentReport;
import com.sloweat.domain.follow.dto.FollowResponseDto;
import com.sloweat.domain.follow.entity.QFollow;
import com.sloweat.domain.user.entity.QUser;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowRepositoryCustomImpl implements FollowRepositoryCumstom{

    private final JPAQueryFactory queryFactory;

    public FollowRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<FollowResponseDto> getFollowers(Integer targetUserId) {
        QFollow a = QFollow.follow;
        QUser b = QUser.user;
        QFollow c = new QFollow("c"); // for follower count
        QFollow d = new QFollow("d"); // for is_following check

        return queryFactory
                .select(Projections.constructor(FollowResponseDto.class,
                        a.followId,
                        b.userId,
                        b.nickname,
                        b.profileImgPath,
                        b.localEmail,
                        b.kakaoEmail,

                        // follower count (서브쿼리)
                        JPAExpressions
                                .select(c.count())
                                .from(c)
                                .where(c.following.userId.eq(b.userId)),

                        // is_following (내가 그 사람을 팔로우 중인지 여부)
                        JPAExpressions
                                .select(Wildcard.count)
                                .from(d)
                                .where(
                                        d.follower.userId.eq(targetUserId)
                                                .and(d.following.userId.eq(b.userId))
                                )
                                .gt(0L) // count > 0 → true
                ))
                .from(a)
                .join(b).on(a.follower.userId.eq(b.userId))
                .where(a.following.userId.eq(targetUserId))
                .fetch();
    }

    @Override
    public List<FollowResponseDto> getFollowings(Integer targetUserId) {

        QFollow a = QFollow.follow;
        QUser b = QUser.user;
        QFollow c = new QFollow("c"); // for follower count
        QFollow d = new QFollow("d"); // for is_following check

        return queryFactory
                .select(Projections.constructor(FollowResponseDto.class,
                        a.followId,
                        b.userId,
                        b.nickname,
                        b.profileImgPath,
                        b.localEmail,
                        b.kakaoEmail,

                        // follower count (서브쿼리)
                        JPAExpressions
                                .select(c.count())
                                .from(c)
                                .where(c.following.userId.eq(b.userId)),

                        // is_following (내가 그 사람을 팔로우 중인지 여부)
                        JPAExpressions
                                .select(Wildcard.count)
                                .from(d)
                                .where(
                                        d.follower.userId.eq(targetUserId)
                                                .and(d.following.userId.eq(b.userId))
                                )
                                .gt(0L) // count > 0 → true
                ))
                .from(a)
                .join(b).on(a.following.userId.eq(b.userId))
                .where(a.follower.userId.eq(targetUserId))
                .fetch();
    }
}
