package com.campus.navigation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus.navigation.entity.Route;

public interface RouteRepository extends JpaRepository<Route, Long> {
}