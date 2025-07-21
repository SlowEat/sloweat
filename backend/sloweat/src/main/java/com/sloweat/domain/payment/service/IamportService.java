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

import java.time.LocalDateTime;
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
    private LocalDateTime tokenExpireTime;

    /**
     * 아임포트 액세스 토큰 발급
     */
    public String getAccessToken() {
        return getAccessToken(false);
    }

    /**
     * 아임포트 액세스 토큰 발급
     * @param forceRefresh 강제로 새 토큰 발급 여부
     */
    private String getAccessToken(boolean forceRefresh) {
        log.info("Loaded imp_key: [{}]", iamportConfig.getApiKey());
        log.info("Loaded imp_secret: [{}]", iamportConfig.getApiSecret());

        // 강제 갱신이 아니고 토큰이 존재하고 만료되지 않았다면 기존 토큰 반환
        if (!forceRefresh && accessToken != null && tokenExpireTime != null && LocalDateTime.now().isBefore(tokenExpireTime)) {
            return accessToken;
        }

        String url = iamportConfig.getApiUrl() + "/users/getToken";

        String requestBody = "{\"imp_key\":\"" + iamportConfig.getApiKey() + "\", "
                + "\"imp_secret\":\"" + iamportConfig.getApiSecret() + "\"}";

        try {
            String jsonBody = objectMapper.writeValueAsString(requestBody);
            log.info("Actual JSON body being sent: {}", jsonBody);
        } catch (JsonProcessingException e) {
            log.error("JSON serialization failed", e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            if (jsonNode.has("code") && jsonNode.get("code").asInt() == 0) {
                JsonNode responseNode = jsonNode.get("response");
                accessToken = responseNode.get("access_token").asText();

                // 아임포트에서 제공하는 만료 시간 정보 확인
                if (responseNode.has("expired_at") && !responseNode.get("expired_at").isNull()) {
                    long expiredAt = responseNode.get("expired_at").asLong();
                    tokenExpireTime = LocalDateTime.now().plusSeconds(expiredAt - System.currentTimeMillis() / 1000 - 60); // 1분 여유
                } else {
                    // 만료 시간 정보가 없으면 기본적으로 30분으로 설정 (아임포트 기본값)
                    tokenExpireTime = LocalDateTime.now().plusMinutes(30);
                }

                log.info("New access token obtained, expires at: {}", tokenExpireTime);
                return accessToken;
            } else {
                String errorMessage = jsonNode.has("message") && !jsonNode.get("message").isNull()
                        ? jsonNode.get("message").asText()
                        : "Unknown error";
                throw new RuntimeException("Failed to get access token: " + errorMessage);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse access token response", e);
        }
    }

    /**
     * 토큰 만료 처리를 포함한 API 호출
     */
    private JsonNode callApiWithTokenRetry(String url, HttpMethod method, Object requestBody) {
        int maxRetries = 1;
        int retryCount = 0;

        while (retryCount <= maxRetries) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(getAccessToken());

                HttpEntity<?> entity = new HttpEntity<>(requestBody, headers);

                ResponseEntity<String> response = restTemplate.exchange(url, method, entity, String.class);
                JsonNode jsonNode = objectMapper.readTree(response.getBody());

                // 토큰 만료 에러 체크 (아임포트 응답 코드 기준)
                if (jsonNode.has("code") && !jsonNode.get("code").isNull() && jsonNode.get("code").asInt() == -401) {
                    log.warn("Access token expired, attempting to refresh token");
                    accessToken = getAccessToken(true); // 강제 갱신
                    retryCount++;
                    continue;
                }

                return jsonNode;

            } catch (Exception e) {
                // HTTP 401 상태 코드로 토큰 만료 감지
                if (e.getMessage().contains("401") && retryCount < maxRetries) {
                    log.warn("Received 401 error, attempting to refresh token");
                    accessToken = getAccessToken(true); // 강제 갱신
                    retryCount++;
                    continue;
                }
                throw new RuntimeException("API call failed after retries", e);
            }
        }

        throw new RuntimeException("Maximum retry attempts reached");
    }

    /**
     * 빌링키를 사용한 정기결제 요청
     */
    public JsonNode requestSubscriptionPayment(String customerUid, int amount, String orderName) {
        String url = iamportConfig.getApiUrl() + "/subscribe/payments/again";

        // Map 객체 대신 JSON 문자열을 직접 생성
        String requestBody = "{\"customer_uid\":\"" + customerUid + "\", "
                + "\"merchant_uid\":\"merchant_" + System.currentTimeMillis() + "\", "
                + "\"amount\":" + amount + ", "
                + "\"name\":\"" + orderName + "\"}";

        return callApiWithTokenRetry(url, HttpMethod.POST, requestBody);
    }

    /**
     * 빌링키 조회
     */
    public JsonNode getBillingKey(String customerUid) {
        String url = iamportConfig.getApiUrl() + "/subscribe/customers/" + customerUid;
        return callApiWithTokenRetry(url, HttpMethod.GET, null);
    }

    /**
     * 빌링키 삭제
     */
    public JsonNode deleteBillingKey(String customerUid) {
        String url = iamportConfig.getApiUrl() + "/subscribe/customers/" + customerUid;
        return callApiWithTokenRetry(url, HttpMethod.DELETE, null);
    }

    /**
     * 결제 취소/환불 요청
     */
    public JsonNode cancelPayment(String impUid, Integer amount, String reason) {
        String url = iamportConfig.getApiUrl() + "/payments/cancel";

        Map<String, Object> body = new HashMap<>();
        body.put("imp_uid", impUid);
        if (amount != null) {
            body.put("amount", amount);
        }
        if (reason != null) {
            body.put("reason", reason);
        }

        return callApiWithTokenRetry(url, HttpMethod.POST, body);
    }

    /**
     * 결제 정보 조회
     */
    public JsonNode getPaymentInfo(String impUid) {
        String url = iamportConfig.getApiUrl() + "/payments/" + impUid;
        return callApiWithTokenRetry(url, HttpMethod.GET, null);
    }

    /**
     * 빌링키 정보 조회 (카드 정보 포함)
     */
    public JsonNode getBillingKeyWithCardInfo(String customerUid) {
        String url = iamportConfig.getApiUrl() + "/subscribe/customers/" + customerUid;
        return callApiWithTokenRetry(url, HttpMethod.GET, null);
    }
}