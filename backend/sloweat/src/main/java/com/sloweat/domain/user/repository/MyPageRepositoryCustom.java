package com.sloweat.domain.user.repository;

import com.sloweat.domain.user.dto.MyPageCommentResponseDto;
import com.sloweat.domain.user.dto.MyPageRecipeResponseDto;

import java.util.List;

public interface MyPageRepositoryCustom {
    
    //내가 작성한 레시피
    List<MyPageRecipeResponseDto> getMyRecipes(Integer userId);
    //내가 작성한 댓글
    List<MyPageCommentResponseDto> getMyComments(Integer userId);

    //타인이 작성한 레시피
    List<MyPageRecipeResponseDto> getUserRecipes(Integer loginUserId, Integer userId);
    //타인이 작성한 댓글
    List<MyPageCommentResponseDto> getUserComments(Integer loginUserId, Integer userId);
}
