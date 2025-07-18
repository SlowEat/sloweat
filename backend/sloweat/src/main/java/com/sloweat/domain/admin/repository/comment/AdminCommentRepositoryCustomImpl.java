package com.sloweat.domain.admin.repository.comment;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sloweat.domain.admin.dto.comment.AdminCommentRequest;
import com.sloweat.domain.admin.dto.comment.AdminCommentResponse;
import com.sloweat.domain.admin.dto.comment.QAdminCommentResponse;
import com.sloweat.domain.comment.entity.QComment;
import com.sloweat.domain.comment.entity.QCommentReport;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class AdminCommentRepositoryCustomImpl implements AdminCommentRepositoryCustom {
  private final JPAQueryFactory queryFactory;

  public AdminCommentRepositoryCustomImpl(JPAQueryFactory queryFactory) {
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<AdminCommentResponse> getComments(AdminCommentRequest request, Pageable pageable) {
    // Querydsl 객체 선언
    QComment comment = QComment.comment;
    QCommentReport commentReport = QCommentReport.commentReport;

    // 동적 검색 조건 생성
    // 검색 조건이 있을 때만 where 절에 추가하는 방식 => null-safe + 유연성
    BooleanBuilder where = new BooleanBuilder();

    if(request.getContent() != null && !request.getContent().isBlank()){
      where.and(comment.content.containsIgnoreCase(request.getContent()));
    }
    if(request.getAuthor() != null && !request.getAuthor().isBlank()){
      where.and(comment.user.nickname.containsIgnoreCase(request.getAuthor()));
    }

    // status 필터링 추가
    if (request.getStatus() != null && !request.getStatus().isBlank()) {
      where.and(comment.status.stringValue().eq(request.getStatus()));
    }

    // 메인 쿼리
    List<AdminCommentResponse> responses = queryFactory
        .select(new QAdminCommentResponse( // dto로 매핑
            comment.commentId,
            comment.content,
            comment.user.nickname,
            comment.recipe.recipeId,
            comment.createdAt,
            commentReport.reportId.count().intValue(),
            comment.status.stringValue()
        ))
        .from(comment)
        .leftJoin(commentReport).on(commentReport.comment.eq(comment))  // 레시피 신고 수를 가져오기 위해 leftjoin
        .where(where)
        .groupBy(comment.commentId, comment.content, comment.user.nickname, comment.recipe.recipeId, comment.createdAt)
        .offset(pageable.getOffset()) // 페이지네이션 처리
        .limit(pageable.getPageSize())
        .orderBy(comment.createdAt.desc()) // 최신순 정렬
        .fetch();

    // 전체 개수 쿼리 (count 쿼리)
    // 페이징 처리 위해 전체 레코드 수 필요
    Long total = queryFactory
        .select(comment.count())
        .from(comment)
        .where(where)
        .fetchOne();

    // 페이지 객체로 반환
    return new PageImpl<>(responses, pageable, total != null ? total : 0);
  }
}
