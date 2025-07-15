package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.AdminUserRequest;
import com.sloweat.domain.admin.dto.AdminUserResponse;
import com.sloweat.domain.admin.repository.AdminUserRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.entity.User.JoinType;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserService {
  private final AdminUserRepository adminUserRepository;

  public Page<AdminUserResponse> getUsers(AdminUserRequest request, Pageable pageable) {
    return adminUserRepository.getUsers(request, pageable);
  }

  public AdminUserResponse getUserById(Integer id) {
    User user = adminUserRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));

    String email = user.getJoinType() == JoinType.LOCAL
        ? user.getLocalEmail()
        : user.getKakaoEmail();

    return new AdminUserResponse(
        user.getUserId(),
        user.getNickname(),
        email,
        user.getCreatedAt(),
        user.getStatus().name()
    );
  }
}
