package com.campus.navigation.navigation;

public class NavigationEdge {

    private Long destinationId;

    private double distance;

    public NavigationEdge(Long destinationId, double distance) {
        this.destinationId = destinationId;
        this.distance = distance;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public double getDistance() {
        return distance;
    }
}