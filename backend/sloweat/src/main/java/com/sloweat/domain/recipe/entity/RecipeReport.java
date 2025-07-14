package com.sloweat.domain.recipe.entity;

import com.sloweat.domain.payment.entity.Payment;
import com.sloweat.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recipe_report")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public enum Status {
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
