package com.servify.controller;

import com.servify.model.SubscriptionPlan;
import com.servify.service.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final MockDataService mockDataService;

    public SubscriptionController(MockDataService mockDataService) {
        this.mockDataService = mockDataService;
    }

    @GetMapping
    public ResponseEntity<List<SubscriptionPlan>> getAllPlans() {
        return ResponseEntity.ok(mockDataService.getAllSubscriptionPlans());
    }
}
