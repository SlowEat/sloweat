package com.sloweat.domain.auth.repository;

import com.sloweat.domain.auth.entity.Refresh;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<Refresh,Integer> {
    Boolean existsByRefreshToken(String refresh);
    void deleteByRefreshToken(String refresh);
}
