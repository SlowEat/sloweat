package com.sloweat.domain.user.repository;

import com.sloweat.domain.user.dto.MyPageCommentResponseDto;
import com.sloweat.domain.user.dto.MyPageRecipeResponseDto;

import java.util.List;

public interface MyPageRepositoryCustom {

    List<MyPageRecipeResponseDto> getMyRecipes(Integer userId);

    List<MyPageCommentResponseDto> getMyComments(Integer userId);
}
