package com.campus.navigation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campus.navigation.entity.Route;
import com.campus.navigation.repository.RouteRepository;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }
}