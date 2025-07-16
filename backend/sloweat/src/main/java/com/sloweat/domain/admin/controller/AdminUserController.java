package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.dto.AdminCommentRequest;
import com.sloweat.domain.admin.dto.AdminCommentResponse;
import com.sloweat.domain.admin.dto.AdminUserRequest;
import com.sloweat.domain.admin.dto.AdminUserResponse;
import com.sloweat.domain.admin.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 관리자 권한 체크 (PreAuthorize 적용 예정)
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {
  private final AdminUserService adminUserService;

  @GetMapping("/users")
  public Page<AdminUserResponse> getUsers(
      @RequestParam(required = false) String nickname,
      @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
  ){
    AdminUserRequest request = new AdminUserRequest(nickname);
    return adminUserService.getUsers(request, pageable);
  }

  @GetMapping("/users/{userId}")
  public AdminUserResponse getUserById(@PathVariable Integer userId) {
    return adminUserService.getUserById(userId);
  }

  @PatchMapping("/users/{userId}/ban")
  public ResponseEntity<Void> banUser(@PathVariable Integer userId) {
    adminUserService.banUser(userId);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/users/{userId}/withdraw")
  public ResponseEntity<Void> withdrawUser(@PathVariable Integer userId) {
    adminUserService.withdrawUser(userId);
    return  ResponseEntity.noContent().build();
  }

  @PatchMapping("/users/{userId}/activate")
  public ResponseEntity<Void> activateUser(@PathVariable Integer userId) {
    adminUserService.activateUser(userId);
    return ResponseEntity.noContent().build();
  }
}
