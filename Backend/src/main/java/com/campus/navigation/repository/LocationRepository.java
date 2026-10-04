package com.campus.navigation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus.navigation.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}