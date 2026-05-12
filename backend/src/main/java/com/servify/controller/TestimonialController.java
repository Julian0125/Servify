package com.servify.controller;

import com.servify.model.Testimonial;
import com.servify.service.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final MockDataService mockDataService;

    public TestimonialController(MockDataService mockDataService) {
        this.mockDataService = mockDataService;
    }

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(mockDataService.getAllTestimonials());
    }
}
