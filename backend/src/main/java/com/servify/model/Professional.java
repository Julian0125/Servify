package com.servify.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Professional {
    private String id;
    private String name;
    private String profession;
    private String avatar;
    private Double rating;
    private Integer reviews;
    private String location;
    private String distance;
    private Boolean verified;
    private Boolean premium;
    private String responseTime;
    private String hourlyRate;
    private String description;
    private List<String> skills;
    private String categoryId;
    private String phone;
    private String email;
}
