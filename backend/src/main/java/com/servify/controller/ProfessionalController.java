package com.servify.controller;

import com.servify.model.Professional;
import com.servify.service.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professionals")
public class ProfessionalController {

    private final MockDataService mockDataService;

    public ProfessionalController(MockDataService mockDataService) {
        this.mockDataService = mockDataService;
    }

    @GetMapping
    public ResponseEntity<List<Professional>> getAllProfessionals(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String categoryId) {
        
        if (query != null || location != null || categoryId != null) {
            return ResponseEntity.ok(mockDataService.searchProfessionals(query, location, categoryId));
        }
        return ResponseEntity.ok(mockDataService.getAllProfessionals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professional> getProfessionalById(@PathVariable String id) {
        return mockDataService.getProfessionalById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Professional>> getProfessionalsByCategory(@PathVariable String categoryId) {
        return ResponseEntity.ok(mockDataService.getProfessionalsByCategory(categoryId));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Professional>> getFeaturedProfessionals() {
        List<Professional> featured = mockDataService.getAllProfessionals().stream()
            .filter(Professional::getPremium)
            .limit(6)
            .toList();
        return ResponseEntity.ok(featured);
    }
}
