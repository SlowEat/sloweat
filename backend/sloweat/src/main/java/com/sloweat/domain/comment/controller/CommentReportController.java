package com.sloweat.domain.comment.controller;

import com.sloweat.domain.auth.dto.CustomUserDetails;
import com.sloweat.domain.comment.dto.CommentReportRequest;
import com.sloweat.domain.comment.service.CommentReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes/comments")
@RequiredArgsConstructor
public class CommentReportController {

    private final CommentReportService commentReportService;

    @PostMapping("/{commentId}/report")
    public void reportComment(@PathVariable Integer commentId,
                              @RequestBody CommentReportRequest request,  // ✅ 요청 본문에서 reason 받기
                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentReportService.reportComment(commentId, userDetails.getUserId(), request.getReason());
    }
}
