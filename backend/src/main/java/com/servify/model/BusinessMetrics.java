package com.servify.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessMetrics {
    private MarketData marketData;
    private List<RevenueStream> revenueStreams;
    private List<Projection> projections;
    private List<Investment> investments;
    private List<Risk> risks;
    private List<ValueProposition> valuePropositions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MarketData {
        private MarketSegment tam;
        private MarketSegment sam;
        private MarketSegment som;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MarketSegment {
        private String professionals;
        private String households;
        private String label;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevenueStream {
        private String title;
        private String description;
        private String percentage;
        private String icon;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Projection {
        private String period;
        private String revenue;
        private String subscribers;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Investment {
        private String concept;
        private String amount;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Risk {
        private String risk;
        private String level;
        private String mitigation;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ValueProposition {
        private String title;
        private String description;
        private String icon;
    }
}
