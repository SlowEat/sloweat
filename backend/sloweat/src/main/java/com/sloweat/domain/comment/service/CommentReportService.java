package com.sloweat.domain.comment.service;

import com.sloweat.domain.comment.repository.CommentReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentReportService {

    private final CommentReportRepository commentReportRepository;

}
