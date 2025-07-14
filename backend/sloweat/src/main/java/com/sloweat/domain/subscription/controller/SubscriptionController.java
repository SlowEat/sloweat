package com.sloweat.domain.subscription.controller;

import com.sloweat.domain.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
}
