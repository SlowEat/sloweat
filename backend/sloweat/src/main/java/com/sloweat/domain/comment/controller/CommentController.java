package com.sloweat.domain.comment.controller;

import com.sloweat.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

}
