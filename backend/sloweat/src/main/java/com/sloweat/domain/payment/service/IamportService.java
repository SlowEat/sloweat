package com.sloweat.domain.payment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sloweat.common.config.IamportConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class IamportService {

    private final RestTemplate restTemplate;
    private final IamportConfig iamportConfig;
    private final ObjectMapper objectMapper;

    private String accessToken;

    /**
     * 아임포트 액세스 토큰 발급
     */
    public String getAccessToken() {
        if (accessToken != null) {
            return accessToken;
        }

        String url = iamportConfig.getApiUrl() + "/users/getToken";

        Map<String, String> body = new HashMap<>();
        body.put("imp_key", iamportConfig.getApiKey());
        body.put("imp_secret", iamportConfig.getApiSecret());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            if (jsonNode.get("code").asInt() == 0) {
                accessToken = jsonNode.get("response").get("access_token").asText();
                return accessToken;
            } else {
                throw new RuntimeException("Failed to get access token: " + jsonNode.get("message").asText());
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse access token response", e);
        }
    }

    /**
     * 빌링키를 사용한 정기결제 요청
     */
    public JsonNode requestSubscriptionPayment(String customerUid, int amount, String orderName) {
        String url = iamportConfig.getApiUrl() + "/subscribe/payments/again";

        Map<String, Object> body = new HashMap<>();
        body.put("customer_uid", customerUid);
        body.put("merchant_uid", "merchant_" + System.currentTimeMillis());
        body.put("amount", amount);
        body.put("name", orderName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAccessToken());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            return objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse payment response", e);
        }
    }

    /**
     * 빌링키 조회
     */
    public JsonNode getBillingKey(String customerUid) {
        String url = iamportConfig.getApiUrl() + "/subscribe/customers/" + customerUid;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse billing key response", e);
        }
    }

    /**
     * 빌링키 삭제
     */
    public JsonNode deleteBillingKey(String customerUid) {
        String url = iamportConfig.getApiUrl() + "/subscribe/customers/" + customerUid;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
            return objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse delete billing key response", e);
        }
    }

    /**
     * 결제 취소/환불 요청
     */
    public JsonNode cancelPayment(String impUid, Integer amount, String reason) {
        String url = iamportConfig.getApiUrl() + "/payments/cancel";

        Map<String, Object> body = new HashMap<>();
        body.put("imp_uid", impUid);
        body.put("amount", amount);
        body.put("reason", reason);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAccessToken());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            return objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse cancel payment response", e);
        }
    }

    /**
     * 결제 정보 조회
     */
    public JsonNode getPaymentInfo(String impUid) {
        String url = iamportConfig.getApiUrl() + "/payments/" + impUid;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse payment info response", e);
        }
    }
}