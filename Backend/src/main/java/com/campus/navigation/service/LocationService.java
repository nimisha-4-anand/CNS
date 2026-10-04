package com.campus.navigation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campus.navigation.entity.Location;
import com.campus.navigation.repository.LocationRepository;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    // Get all locations
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Add a new location
    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    // Update an existing location
    public Location updateLocation(Long id, Location updatedLocation) {

        Location existingLocation =
                locationRepository.findById(id).orElse(null);

        if (existingLocation == null) {
            return null;
        }

        existingLocation.setName(updatedLocation.getName());
        existingLocation.setDescription(updatedLocation.getDescription());
        existingLocation.setLatitude(updatedLocation.getLatitude());
        existingLocation.setLongitude(updatedLocation.getLongitude());
        existingLocation.setType(updatedLocation.getType());
        existingLocation.setBuilding(updatedLocation.getBuilding());
        existingLocation.setFloor(updatedLocation.getFloor());

        return locationRepository.save(existingLocation);
    }
}