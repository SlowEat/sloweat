package com.sloweat.domain.recipe.dto;

import lombok.Data;

/**
 * 사용자가 신고할 때 신고 사유(reason)를 담는 요청 DTO
 * 예: { "reason": "욕설이 포함되어 있어요" }
 */
@Data
public class ReportRequestDto {
    private String reason;
}
