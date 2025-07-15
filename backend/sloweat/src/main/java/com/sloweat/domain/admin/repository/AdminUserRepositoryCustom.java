package com.sloweat.domain.admin.repository;

import com.sloweat.domain.admin.dto.AdminUserRequest;
import com.sloweat.domain.admin.dto.AdminUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminUserRepositoryCustom {
  Page<AdminUserResponse> getUsers(AdminUserRequest request, Pageable pageable);
}
