package com.campus.navigation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.campus.navigation.entity.Route;
import com.campus.navigation.service.RouteService;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    // Get all routes
    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    // Add a new route
    @PostMapping
    public Route addRoute(@RequestBody Route route) {
        return routeService.addRoute(route);
    }
}