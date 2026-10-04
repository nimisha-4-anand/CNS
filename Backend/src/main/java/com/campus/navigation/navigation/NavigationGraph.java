package com.campus.navigation.navigation;

import java.util.*;

public class NavigationGraph {

    private Map<Long, List<NavigationEdge>> graph = new HashMap<>();

    public void addNode(Long locationId) {

        graph.putIfAbsent(locationId, new ArrayList<>());
    }

    public void addConnection(
            Long from,
            Long to,
            double distance) {

        graph.putIfAbsent(from, new ArrayList<>());
        graph.putIfAbsent(to, new ArrayList<>());

        graph.get(from).add(
                new NavigationEdge(to, distance)
        );

        graph.get(to).add(
                new NavigationEdge(from, distance)
        );
    }

    public Map<Long, List<NavigationEdge>> getGraph() {

        return graph;
    }
}