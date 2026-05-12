package com.servify.service;

import com.servify.model.*;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class MockDataService {

    private List<Professional> professionals = new ArrayList<>();
    private List<Category> categories = new ArrayList<>();
    private List<SubscriptionPlan> subscriptionPlans = new ArrayList<>();
    private List<Testimonial> testimonials = new ArrayList<>();
    private BusinessMetrics businessMetrics;

    @PostConstruct
    public void init() {
        initializeCategories();
        initializeProfessionals();
        initializeSubscriptionPlans();
        initializeTestimonials();
        initializeBusinessMetrics();
    }

    private void initializeCategories() {
        categories = Arrays.asList(
            Category.builder().id("plomeria").name("Plomeria").icon("Wrench").count(45).color("bg-blue-500").build(),
            Category.builder().id("electricidad").name("Electricidad").icon("Zap").count(38).color("bg-yellow-500").build(),
            Category.builder().id("pintura").name("Pintura").icon("Paintbrush").count(52).color("bg-pink-500").build(),
            Category.builder().id("clases").name("Clases Particulares").icon("GraduationCap").count(67).color("bg-green-500").build(),
            Category.builder().id("limpieza").name("Limpieza").icon("Home").count(89).color("bg-cyan-500").build(),
            Category.builder().id("fotografia").name("Fotografia").icon("Camera").count(34).color("bg-purple-500").build(),
            Category.builder().id("programacion").name("Programacion").icon("Code").count(41).color("bg-orange-500").build(),
            Category.builder().id("belleza").name("Belleza").icon("Scissors").count(56).color("bg-rose-500").build()
        );
    }

    private void initializeProfessionals() {
        professionals = Arrays.asList(
            Professional.builder()
                .id("1")
                .name("Carlos Rodriguez")
                .profession("Plomero Profesional")
                .avatar("CR")
                .rating(4.9)
                .reviews(127)
                .location("San Alonso, Bucaramanga")
                .distance("1.2 km")
                .verified(true)
                .premium(true)
                .responseTime("Responde en 30 min")
                .hourlyRate("$45.000/hora")
                .description("Plomero con 15 anos de experiencia. Especialista en instalaciones, reparaciones y mantenimiento de sistemas hidraulicos.")
                .skills(Arrays.asList("Instalaciones", "Reparaciones", "Mantenimiento"))
                .categoryId("plomeria")
                .phone("+57 300 123 4567")
                .email("carlos.rodriguez@email.com")
                .build(),
            Professional.builder()
                .id("2")
                .name("Maria Gonzalez")
                .profession("Electricista Certificada")
                .avatar("MG")
                .rating(4.8)
                .reviews(89)
                .location("Cabecera, Bucaramanga")
                .distance("2.5 km")
                .verified(true)
                .premium(true)
                .responseTime("Responde en 1 hora")
                .hourlyRate("$50.000/hora")
                .description("Electricista certificada con experiencia en instalaciones residenciales y comerciales. Trabajo garantizado.")
                .skills(Arrays.asList("Instalaciones", "Emergencias", "Iluminacion"))
                .categoryId("electricidad")
                .phone("+57 300 234 5678")
                .email("maria.gonzalez@email.com")
                .build(),
            Professional.builder()
                .id("3")
                .name("Andres Martinez")
                .profession("Disenador Grafico")
                .avatar("AM")
                .rating(4.7)
                .reviews(64)
                .location("Centro, Bucaramanga")
                .distance("3.1 km")
                .verified(true)
                .premium(false)
                .responseTime("Responde en 2 horas")
                .hourlyRate("$35.000/hora")
                .description("Disenador grafico freelance especializado en branding, logos y material publicitario para emprendedores.")
                .skills(Arrays.asList("Branding", "Logos", "Social Media"))
                .categoryId("programacion")
                .phone("+57 300 345 6789")
                .email("andres.martinez@email.com")
                .build(),
            Professional.builder()
                .id("4")
                .name("Laura Perez")
                .profession("Profesora de Matematicas")
                .avatar("LP")
                .rating(5.0)
                .reviews(156)
                .location("Floridablanca")
                .distance("4.8 km")
                .verified(true)
                .premium(true)
                .responseTime("Responde en 15 min")
                .hourlyRate("$40.000/hora")
                .description("Profesora de matematicas con metodologia personalizada. Preparo estudiantes para ICFES y universidades.")
                .skills(Arrays.asList("ICFES", "Universitario", "Bachillerato"))
                .categoryId("clases")
                .phone("+57 300 456 7890")
                .email("laura.perez@email.com")
                .build(),
            Professional.builder()
                .id("5")
                .name("Roberto Silva")
                .profession("Pintor Profesional")
                .avatar("RS")
                .rating(4.6)
                .reviews(45)
                .location("Giron")
                .distance("5.2 km")
                .verified(true)
                .premium(false)
                .responseTime("Responde en 3 horas")
                .hourlyRate("$30.000/hora")
                .description("Pintor profesional con mas de 10 anos de experiencia en pintura de interiores y exteriores.")
                .skills(Arrays.asList("Interiores", "Exteriores", "Acabados"))
                .categoryId("pintura")
                .phone("+57 300 567 8901")
                .email("roberto.silva@email.com")
                .build(),
            Professional.builder()
                .id("6")
                .name("Diana Castro")
                .profession("Fotografa")
                .avatar("DC")
                .rating(4.9)
                .reviews(78)
                .location("Piedecuesta")
                .distance("6.1 km")
                .verified(true)
                .premium(true)
                .responseTime("Responde en 1 hora")
                .hourlyRate("$80.000/sesion")
                .description("Fotografa profesional especializada en eventos, retratos y fotografia de producto para emprendedores.")
                .skills(Arrays.asList("Eventos", "Retratos", "Producto"))
                .categoryId("fotografia")
                .phone("+57 300 678 9012")
                .email("diana.castro@email.com")
                .build()
        );
    }

    private void initializeSubscriptionPlans() {
        subscriptionPlans = Arrays.asList(
            SubscriptionPlan.builder()
                .id("basico")
                .name("Plan Basico")
                .icon("Zap")
                .description("Ideal para comenzar a conseguir clientes")
                .monthlyPrice(35000)
                .yearlyPrice(306000)
                .features(Arrays.asList(
                    "Perfil verificado en la plataforma",
                    "Hasta 5 fotos en portafolio",
                    "Posicionamiento estandar en busquedas",
                    "Insignia de verificado",
                    "Notificaciones de contactos",
                    "Soporte por correo electronico"
                ))
                .highlighted(false)
                .cta("Comenzar Gratis")
                .build(),
            SubscriptionPlan.builder()
                .id("premium")
                .name("Plan Premium")
                .icon("Crown")
                .description("Mayor visibilidad y mas oportunidades")
                .monthlyPrice(62500)
                .yearlyPrice(637500)
                .features(Arrays.asList(
                    "Todo lo del Plan Basico",
                    "Hasta 20 fotos en portafolio",
                    "Posicionamiento destacado",
                    "Sello Premium visible",
                    "Estadisticas de perfil (visitas, contactos)",
                    "Soporte prioritario",
                    "Apareces primero en tu zona",
                    "Badge de profesional premium"
                ))
                .highlighted(true)
                .cta("Elegir Premium")
                .build(),
            SubscriptionPlan.builder()
                .id("enterprise")
                .name("Plan Empresarial")
                .icon("Sparkles")
                .description("Para equipos y empresas de servicios")
                .monthlyPrice(150000)
                .yearlyPrice(1530000)
                .features(Arrays.asList(
                    "Todo lo del Plan Premium",
                    "Multiples perfiles de empleados",
                    "Dashboard de administracion",
                    "Reportes avanzados",
                    "API de integracion",
                    "Account manager dedicado",
                    "Facturacion empresarial",
                    "Onboarding personalizado"
                ))
                .highlighted(false)
                .cta("Contactar Ventas")
                .build()
        );
    }

    private void initializeTestimonials() {
        testimonials = Arrays.asList(
            Testimonial.builder()
                .id(1)
                .name("Juan Perez")
                .role("Plomero Independiente")
                .avatar("JP")
                .rating(5)
                .text("Desde que me uni a Servify, mis ingresos aumentaron un 40%. Antes dependia solo de referidos, ahora tengo clientes constantes cada semana.")
                .type("professional")
                .build(),
            Testimonial.builder()
                .id(2)
                .name("Maria Rodriguez")
                .role("Cliente - Ama de casa")
                .avatar("MR")
                .rating(5)
                .text("Encontre un electricista excelente en menos de 10 minutos. Las resenas me dieron confianza y el trabajo quedo perfecto. Muy recomendado.")
                .type("client")
                .build(),
            Testimonial.builder()
                .id(3)
                .name("Andres Gomez")
                .role("Disenador Grafico")
                .avatar("AG")
                .rating(5)
                .text("Como freelancer, conseguir clientes era mi mayor reto. Servify me permite mostrar mi portafolio y los clientes me contactan directamente.")
                .type("professional")
                .build(),
            Testimonial.builder()
                .id(4)
                .name("Carolina Silva")
                .role("Cliente - Emprendedora")
                .avatar("CS")
                .rating(5)
                .text("Necesitaba un fotografo para mi negocio. Pude comparar precios, ver trabajos anteriores y elegir el mejor. El proceso fue muy transparente.")
                .type("client")
                .build(),
            Testimonial.builder()
                .id(5)
                .name("Roberto Martinez")
                .role("Profesor Particular")
                .avatar("RM")
                .rating(5)
                .text("El plan Premium me puso primero en las busquedas de mi zona. Ahora tengo mas estudiantes de los que puedo atender.")
                .type("professional")
                .build(),
            Testimonial.builder()
                .id(6)
                .name("Laura Herrera")
                .role("Cliente - Padre de familia")
                .avatar("LH")
                .rating(5)
                .text("Contrate un pintor para renovar mi casa. Ver las calificaciones de otros clientes me dio mucha tranquilidad. Excelente servicio.")
                .type("client")
                .build()
        );
    }

    private void initializeBusinessMetrics() {
        businessMetrics = BusinessMetrics.builder()
            .marketData(BusinessMetrics.MarketData.builder()
                .tam(BusinessMetrics.MarketSegment.builder()
                    .professionals("79,450")
                    .households("276,556")
                    .label("TAM - Mercado Total")
                    .build())
                .sam(BusinessMetrics.MarketSegment.builder()
                    .professionals("23,835")
                    .households("55,311")
                    .label("SAM - Mercado Direccionable")
                    .build())
                .som(BusinessMetrics.MarketSegment.builder()
                    .professionals("~143")
                    .households("~166")
                    .label("SOM - Objetivo Ano 1")
                    .build())
                .build())
            .valuePropositions(Arrays.asList(
                BusinessMetrics.ValueProposition.builder()
                    .title("Enfoque 100% Local")
                    .description("Conectamos profesionales y clientes dentro de la misma ciudad o barrio, reduciendo tiempos de desplazamiento.")
                    .icon("MapPin")
                    .build(),
                BusinessMetrics.ValueProposition.builder()
                    .title("Verificacion de Perfiles")
                    .description("Los profesionales completan un proceso de validacion de identidad y experiencia antes de aparecer.")
                    .icon("Shield")
                    .build(),
                BusinessMetrics.ValueProposition.builder()
                    .title("Resenas Verificadas")
                    .description("Solo usuarios que hayan efectuado un contacto registrado pueden calificar al profesional.")
                    .icon("CheckCircle")
                    .build(),
                BusinessMetrics.ValueProposition.builder()
                    .title("Acceso Gratuito para Clientes")
                    .description("Los consumidores no pagan nada para buscar, comparar y contactar profesionales.")
                    .icon("Users")
                    .build()
            ))
            .revenueStreams(Arrays.asList(
                BusinessMetrics.RevenueStream.builder()
                    .title("Suscripciones Mensuales")
                    .description("Fuente principal de ingresos. Profesionales pagan una tarifa mensual segun el plan elegido.")
                    .percentage("70%")
                    .icon("Wallet")
                    .build(),
                BusinessMetrics.RevenueStream.builder()
                    .title("Suscripciones Anuales")
                    .description("Pago anual con descuento del 15% como incentivo de permanencia.")
                    .percentage("20%")
                    .icon("TrendingUp")
                    .build(),
                BusinessMetrics.RevenueStream.builder()
                    .title("Visibilidad Adicional")
                    .description("Espacios de publicidad destacada para profesionales que deseen mayor exposicion.")
                    .percentage("10%")
                    .icon("Target")
                    .build()
            ))
            .projections(Arrays.asList(
                BusinessMetrics.Projection.builder().period("Mes 3").revenue("$500K - $900K").subscribers("20-30").build(),
                BusinessMetrics.Projection.builder().period("Mes 6").revenue("$1.5M - $2.5M").subscribers("50-65").build(),
                BusinessMetrics.Projection.builder().period("Mes 9").revenue("$2.8M - $4.2M").subscribers("80-100").build(),
                BusinessMetrics.Projection.builder().period("Ano 1").revenue("$4.5M - $6M").subscribers("120-150").build(),
                BusinessMetrics.Projection.builder().period("Ano 2").revenue("$80M - $130M (anual)").subscribers("200-260").build()
            ))
            .investments(Arrays.asList(
                BusinessMetrics.Investment.builder().concept("Desarrollo MVP (web + app)").amount("$8M - $15M").build(),
                BusinessMetrics.Investment.builder().concept("Diseno de marca e identidad").amount("$1M - $2M").build(),
                BusinessMetrics.Investment.builder().concept("Tramites legales").amount("$400K - $700K").build(),
                BusinessMetrics.Investment.builder().concept("Registro de marca SIC").amount("$700K - $1M").build(),
                BusinessMetrics.Investment.builder().concept("Equipos de computo").amount("$3.5M - $5M").build(),
                BusinessMetrics.Investment.builder().concept("Capital de trabajo (3 meses)").amount("$8M - $15M").build(),
                BusinessMetrics.Investment.builder().concept("Marketing de lanzamiento").amount("$1.5M - $3M").build()
            ))
            .risks(Arrays.asList(
                BusinessMetrics.Risk.builder()
                    .risk("Bajo numero de profesionales suscritos")
                    .level("Alto")
                    .mitigation("Periodo de acceso gratuito inicial y alianzas con asociaciones de oficios.")
                    .build(),
                BusinessMetrics.Risk.builder()
                    .risk("Baja adopcion por clientes finales")
                    .level("Alto")
                    .mitigation("Campanas de marketing digital y estrategia de referidos.")
                    .build(),
                BusinessMetrics.Risk.builder()
                    .risk("Competidor con mayor musculo financiero")
                    .level("Medio")
                    .mitigation("Construccion rapida de comunidad local y diferenciacion por precio.")
                    .build(),
                BusinessMetrics.Risk.builder()
                    .risk("Problemas tecnicos en la plataforma")
                    .level("Medio")
                    .mitigation("Pruebas exhaustivas y acuerdos de mantenimiento.")
                    .build()
            ))
            .build();
    }

    // Getters
    public List<Professional> getAllProfessionals() {
        return new ArrayList<>(professionals);
    }

    public List<Professional> getProfessionalsByCategory(String categoryId) {
        return professionals.stream()
            .filter(p -> p.getCategoryId().equals(categoryId))
            .toList();
    }

    public List<Professional> searchProfessionals(String query, String location, String categoryId) {
        return professionals.stream()
            .filter(p -> {
                boolean matchesQuery = query == null || query.isEmpty() ||
                    p.getName().toLowerCase().contains(query.toLowerCase()) ||
                    p.getProfession().toLowerCase().contains(query.toLowerCase()) ||
                    p.getDescription().toLowerCase().contains(query.toLowerCase());
                
                boolean matchesLocation = location == null || location.isEmpty() ||
                    location.equals("Todas las zonas") ||
                    p.getLocation().toLowerCase().contains(location.toLowerCase());
                
                boolean matchesCategory = categoryId == null || categoryId.isEmpty() ||
                    p.getCategoryId().equals(categoryId);
                
                return matchesQuery && matchesLocation && matchesCategory;
            })
            .sorted((a, b) -> {
                // Premium professionals first
                if (a.getPremium() && !b.getPremium()) return -1;
                if (!a.getPremium() && b.getPremium()) return 1;
                // Then by rating
                return Double.compare(b.getRating(), a.getRating());
            })
            .toList();
    }

    public Optional<Professional> getProfessionalById(String id) {
        return professionals.stream()
            .filter(p -> p.getId().equals(id))
            .findFirst();
    }

    public List<Category> getAllCategories() {
        return new ArrayList<>(categories);
    }

    public List<SubscriptionPlan> getAllSubscriptionPlans() {
        return new ArrayList<>(subscriptionPlans);
    }

    public List<Testimonial> getAllTestimonials() {
        return new ArrayList<>(testimonials);
    }

    public BusinessMetrics getBusinessMetrics() {
        return businessMetrics;
    }
}
