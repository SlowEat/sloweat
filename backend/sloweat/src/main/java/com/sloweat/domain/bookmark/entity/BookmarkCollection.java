package com.sloweat.domain.bookmark.entity;

import com.sloweat.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookmark_collection")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer collectionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String collectionName;

    private LocalDateTime createdAt;
}

