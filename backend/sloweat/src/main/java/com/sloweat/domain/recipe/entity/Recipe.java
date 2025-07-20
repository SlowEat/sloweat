package com.sloweat.domain.recipe.entity;

import com.sloweat.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private Integer cookingTime;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Integer views;
    private Integer likes;

    private Boolean isSubscribed;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.NONE;

    public enum Status {
        NONE("신고 없음"),
        REQUEST("대기"),
        APPROVE("처리"),
        REJECT("반려");

        private final String label;

        Status(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        @Override
        public String toString() {
            return label;
        }
    }

    /**
     * ✅ JPA 저장 시 null 방지용 기본값 초기화
     */
    @PrePersist
    protected void onCreate() {
        if (views == null) views = 0;
        if (likes == null) likes = 0;
        if (isSubscribed == null) isSubscribed = false;
    }
}
