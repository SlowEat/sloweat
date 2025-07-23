package com.sloweat.domain.admin.dto.user;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class AdminUserResponse {
  private Integer id;
  private String nickname;
  private String email; // 카카오 or 로컬
  private LocalDateTime createdAt;
  private String status;

  @QueryProjection
  public AdminUserResponse(Integer id,  String nickname, String email, LocalDateTime createdAt, String status) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
    this.createdAt = createdAt;
    this.status = status;
  }
}
