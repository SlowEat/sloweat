package com.sloweat.domain.admin.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminUserRequest {
  private String nickname;
  private String status;
}
