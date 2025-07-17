package com.sloweat.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Enumerated(EnumType.STRING)
    private JoinType joinType;

    private String localEmail;
    private String localPassword;
    private String kakaoId;
    private String kakaoEmail;

    @Column(nullable = false)
    private String nickname;

    private String profileImgPath;
    private String introduce;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private LocalDateTime createdAt;


    public enum JoinType {
        LOCAL("로컬"),
        KAKAO("카카오");

        private final String label;

        JoinType(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }

    public enum Role {
        ROLE_USER("사용자"),
        ROLE_ADMIN("관리자");

        private final String label;

        Role(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }

    public enum Status {
        ACTIVE("활성"),
        BANNED("정지"),
        WITHDRAWN("탈퇴");

        private final String label;

        Status(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }
}

