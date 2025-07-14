package com.sloweat.domain.payment.entity;

import com.sloweat.domain.comment.entity.CommentReport;
import com.sloweat.domain.subscription.entity.Subscription;
import com.sloweat.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscription;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Method method;

    private LocalDateTime payDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RefundStatus refundStatus;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String refundReason;

    private LocalDateTime refundDate;
    private LocalDateTime createdAt;


    public enum Status {
        PAID("결제완료"),
        CANCEL("결제취소"),
        REFUND("환불");

        private final String label;

        Status(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }

    public enum Method {
        CARD("카드"),
        CASH("계좌이체");

        private final String label;

        Method(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }

    public enum RefundStatus {
        REQUEST("요청"),
        APPROVE("승인"),
        REJECT("반려");

        private final String label;

        RefundStatus(String label) {this.label = label;}

        public String getLabel() {
            return label;
        }
    }
}
