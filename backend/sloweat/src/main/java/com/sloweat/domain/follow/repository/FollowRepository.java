package com.sloweat.domain.follow.repository;

import com.sloweat.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Integer> {
}
