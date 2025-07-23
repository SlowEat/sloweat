package com.sloweat.domain.admin.repository.user;

import com.sloweat.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<User, Integer>, AdminUserRepositoryCustom{

}
