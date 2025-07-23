package com.sloweat.domain.sample.service;

import com.sloweat.domain.sample.dto.SampleRequest;
import com.sloweat.domain.sample.entity.Sample;
import com.sloweat.domain.sample.repository.SampleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SampleService {
    private final SampleRepository sampleRepository;

    public Sample createSample(SampleRequest dto) {
        Sample sample = Sample.builder().name(dto.getName()).build();
        return sampleRepository.save(sample);
    }

    public Sample getSample(Long id) {
        return sampleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("샘플 데이터를 찾을 수 없습니다."));
    }
}
