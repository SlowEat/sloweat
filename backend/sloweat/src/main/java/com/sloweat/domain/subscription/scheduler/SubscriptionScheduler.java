
package com.sloweat.domain.subscription.scheduler;

import com.sloweat.domain.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SubscriptionScheduler {

    private final SubscriptionService subscriptionService;

    /**
     * 매일 오전 9시에 자동 갱신 처리
     */
   @Scheduled(cron = "0 0 9 * * *")
   //  테스트를 위해 매 10분마다 실행 (00, 10, 20, 30, 40, 50분)
   //@Scheduled(cron = "0 0/10 * * * *")
    public void processAutoRenewal() {
        log.info("자동 갱신 시작 ~~~");
        try {
            subscriptionService.processAutoRenewal();
            log.info("자동 갱신완료");
        } catch (Exception e) {
            log.error("갱신 중 오류 발생 ", e);
        }
    }

    /**
     * 매일 오전 10시에 만료된 구독 처리
     */
    @Scheduled(cron = "0 0 10 * * *")
    public void processExpiredSubscriptions() {
        log.info("Starting expired subscription process");
        try {
            subscriptionService.processExpiredSubscriptions();
            log.info("Expired subscription process completed");
        } catch (Exception e) {
            log.error("Error during expired subscription process", e);
        }
    }

}