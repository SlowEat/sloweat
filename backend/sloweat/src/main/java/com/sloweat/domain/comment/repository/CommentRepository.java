package com.sloweat.domain.comment.repository;

import com.sloweat.domain.comment.entity.Comment;
import com.sloweat.domain.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByRecipe_RecipeIdAndIsDeletedFalse(Integer recipeId);
    List<Comment> findByParent_CommentIdAndIsDeletedFalse(Integer parentId);
}
