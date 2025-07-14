package com.sloweat.domain.admin.controller;

import com.sloweat.domain.admin.service.AdminRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AdminRecipeController {

    private final AdminRecipeService adminRecipeService;

}
