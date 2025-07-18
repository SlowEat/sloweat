package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Page<Comment> findByRecipe_RecipeIdAndIsDeletedFalse(Integer recipeId, Pageable pageable);
    List<Comment> findByParent_CommentIdAndIsDeletedFalse(Integer parentId);
}
