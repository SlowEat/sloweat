package com.sloweat.domain.sample.controller;

import com.sloweat.common.response.ApiResponse;
import com.sloweat.domain.sample.dto.SampleRequest;
import com.sloweat.domain.sample.entity.Sample;
import com.sloweat.domain.sample.service.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sample")
@RequiredArgsConstructor
public class SampleController {
    private final SampleService sampleService;

    @PostMapping
    public ResponseEntity<Sample> create(@RequestBody SampleRequest dto) {
        Sample sample = sampleService.createSample(dto);
        return ResponseEntity.ok(sample);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Sample>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(sampleService.getSample(id)));
    }
}
