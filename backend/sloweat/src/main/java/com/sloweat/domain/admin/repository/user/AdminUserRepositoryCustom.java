package com.sloweat.domain.admin.repository.user;

import com.sloweat.domain.admin.dto.user.AdminUserRequest;
import com.sloweat.domain.admin.dto.user.AdminUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminUserRepositoryCustom {
  Page<AdminUserResponse> getUsers(AdminUserRequest request, Pageable pageable);
}
