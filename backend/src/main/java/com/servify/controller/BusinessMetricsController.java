package com.servify.controller;

import com.servify.model.BusinessMetrics;
import com.servify.service.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/business")
public class BusinessMetricsController {

    private final MockDataService mockDataService;

    public BusinessMetricsController(MockDataService mockDataService) {
        this.mockDataService = mockDataService;
    }

    @GetMapping("/metrics")
    public ResponseEntity<BusinessMetrics> getBusinessMetrics() {
        return ResponseEntity.ok(mockDataService.getBusinessMetrics());
    }
}
