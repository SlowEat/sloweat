package com.sloweat.domain.user.service;

import com.sloweat.domain.user.dto.MyPageCommentResponseDto;
import com.sloweat.domain.user.dto.MyPageRecipeResponseDto;
import com.sloweat.domain.user.repository.MyPageRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageRepositoryCustom myPageRepositoryCustom;

    public List<MyPageRecipeResponseDto> getMyRecipes(Integer userId) {
        List<MyPageRecipeResponseDto> result = myPageRepositoryCustom.getMyRecipes(userId);

        return result;
    }

    public List<MyPageCommentResponseDto> getMyComments(Integer userId) {
        List<MyPageCommentResponseDto> result = myPageRepositoryCustom.getMyComments(userId);

        return result;
    }
}
