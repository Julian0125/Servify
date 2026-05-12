package com.servify.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {
    private Integer id;
    private String name;
    private String role;
    private String avatar;
    private Integer rating;
    private String text;
    private String type; // "professional" or "client"
}
