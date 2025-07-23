package com.sloweat.domain.admin.repository.user;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.admin.dto.user.AdminUserRequest;
import com.sloweat.domain.admin.dto.user.AdminUserResponse;
import com.sloweat.domain.admin.dto.user.QAdminUserResponse;
import com.sloweat.domain.user.entity.QUser;
import com.sloweat.domain.user.entity.User.JoinType;
import com.sloweat.domain.user.entity.User.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class AdminUserRepositoryCustomImpl implements AdminUserRepositoryCustom{
  private final JPAQueryFactory queryFactory;

  public AdminUserRepositoryCustomImpl(JPAQueryFactory queryFactory) {
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<AdminUserResponse> getUsers(AdminUserRequest request, Pageable pageable) {
    // Querydsl 객체 선언
    QUser user = QUser.user;

    // 동적 검색 조건 생성
    // 검색 조건이 있을 때만 where 절에 추가하는 방식 => null-safe + 유연성
    BooleanBuilder where = new BooleanBuilder();

    if(request.getNickname() != null && !request.getNickname().isBlank()){
      where.and(user.nickname.containsIgnoreCase(request.getNickname()));
    }

    // 상태 필터링 추가
    if(request.getStatus() != null && !request.getStatus().isBlank()){
      where.and(user.status.eq(Status.valueOf(request.getStatus())));
    }

    // 가입 방식에 따라 이메일 선택
    StringExpression emailExpr = new CaseBuilder()
        .when(user.joinType.eq(JoinType.LOCAL)).then(user.localEmail)
        .otherwise(user.kakaoEmail);

    // 메인 쿼리
    List<AdminUserResponse> responses = queryFactory
        .select(new QAdminUserResponse(
            user.userId,
            user.nickname,
            emailExpr,
            user.createdAt,
            user.status.stringValue()
        ))
        .from(user)
        .where(where)
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .orderBy(user.createdAt.desc())
        .fetch();

    Long total = queryFactory
        .select(user.count())
        .from(user)
        .where(where)
        .fetchOne();

    return new PageImpl<>(responses, pageable, total != null ? total : 0);
  }
}
