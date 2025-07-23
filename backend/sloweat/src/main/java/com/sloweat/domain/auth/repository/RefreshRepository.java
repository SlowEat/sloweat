package com.sloweat.domain.auth.repository;

import com.sloweat.domain.auth.entity.Refresh;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshRepository extends JpaRepository<Refresh,Integer> {
    //refresh 토큰 기준
    Boolean existsByRefreshToken(String refresh);

    @Transactional
    void deleteByRefreshToken(String refresh);
    
    //username 기준
    @Transactional
    void deleteByUsername(String localEmail);

    boolean existsByUsername(String localEmail);
}
