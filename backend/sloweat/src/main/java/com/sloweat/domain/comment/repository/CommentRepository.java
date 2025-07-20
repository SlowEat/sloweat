package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c JOIN FETCH c.user WHERE c.recipe.recipeId = :recipeId AND c.isDeleted = false")
    Page<Comment> findByRecipe_RecipeIdAndIsDeletedFalse(@Param("recipeId") Integer recipeId, Pageable pageable);
}
