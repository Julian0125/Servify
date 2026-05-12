package com.servify.controller;

import com.servify.model.Category;
import com.servify.service.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final MockDataService mockDataService;

    public CategoryController(MockDataService mockDataService) {
        this.mockDataService = mockDataService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(mockDataService.getAllCategories());
    }
}
