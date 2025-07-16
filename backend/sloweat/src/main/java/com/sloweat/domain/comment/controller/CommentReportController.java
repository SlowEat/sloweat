package com.sloweat.domain.comment.controller;

import com.sloweat.domain.comment.service.CommentReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class CommentReportController {

    private final CommentReportService commentReportService;

    @PostMapping("/comments/{commentId}/report")
    public void reportComment(@PathVariable Integer commentId,
                              @RequestParam Integer userId,
                              @RequestParam String reason) {
        commentReportService.reportComment(commentId, userId, reason);
    }
}
