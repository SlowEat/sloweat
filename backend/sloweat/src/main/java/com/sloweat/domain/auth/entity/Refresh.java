package com.sloweat.domain.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
//Refresh 토큰 저장 위한 Entity
public class Refresh {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer refreshId;

    private String username; //id
    private String refreshToken; //직전 refresh 토큰
    private String expiration; //만료기간
}
