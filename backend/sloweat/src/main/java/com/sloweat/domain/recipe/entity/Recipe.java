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

    private Integer views = 0;
    private Integer likes = 0;

    private Boolean isSubscribed = false;

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

        Status(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }
}

