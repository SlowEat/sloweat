package com.sloweat.domain.admin.service;

import com.sloweat.domain.admin.dto.AdminUserRequest;
import com.sloweat.domain.admin.dto.AdminUserResponse;
import com.sloweat.domain.admin.repository.AdminUserRepository;
import com.sloweat.domain.user.entity.User;
import com.sloweat.domain.user.entity.User.JoinType;
import com.sloweat.domain.user.entity.User.Status;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

  // 중복 로직 리팩토링
  private User getUserOrThrow(Integer id) {
    return adminUserRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("회원이 존재하지 않습니다."));
  }

  public AdminUserResponse getUserById(Integer id) {
    User user = getUserOrThrow(id);

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

  @Transactional
  public void banUser(Integer id) {
    getUserOrThrow(id).setStatus(Status.BANNED);
  }

  @Transactional
  public void withdrawUser(Integer id){
    getUserOrThrow(id).setStatus(Status.WITHDRAWN);
  }

  @Transactional
  public void activateUser(Integer id){
    getUserOrThrow(id).setStatus(Status.ACTIVE);
  }
}
