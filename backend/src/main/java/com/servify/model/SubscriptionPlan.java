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
public class SubscriptionPlan {
    private String id;
    private String name;
    private String icon;
    private String description;
    private Integer monthlyPrice;
    private Integer yearlyPrice;
    private List<String> features;
    private Boolean highlighted;
    private String cta;
}
