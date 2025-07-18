package com.sloweat.domain.auth.repository;

import com.sloweat.domain.auth.entity.Refresh;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<Refresh,Integer> {
    Boolean existsByRefreshToken(String refresh);

    @Transactional
    void deleteByRefreshToken(String refresh);

    @Transactional
    void deleteByUsername(String localEmail);
}
