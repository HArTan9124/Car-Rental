package com.example.carrental.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:3000", "http://localhost:3001").allowedMethods("GET","POST","PUT","DELETE","OPTIONS");
    }

    @Override
    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        // Serve uploaded files from the filesystem directory './backend-uploads' under the URL path '/uploads/**'
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./backend-uploads/")
                .setCachePeriod(3600);
    }
}
