package com.sloweat.domain.recipe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tag")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tagId;

    @Column(nullable = false, unique = true)
    private String tagName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag.TagType tagType;

    private LocalDateTime createdAt;


    public enum TagType {
        TYPE("종류"),
        SITUATION("상황"),
        INGREDIENT("재료"),
        METHOD("방법");

        private final String label;

        TagType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }
}
