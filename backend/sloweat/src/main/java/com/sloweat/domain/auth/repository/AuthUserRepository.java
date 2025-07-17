package com.sloweat.domain.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sloweat.domain.user.entity.User;

public interface AuthUserRepository extends JpaRepository<User,Integer> {
    Boolean existsBylocalEmail(String localEmail);
    Boolean existsBynickname(String nickname);
    User findByLocalEmail(String localEmail);
}
