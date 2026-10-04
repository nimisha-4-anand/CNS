package com.campus.navigation.navigation;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class DijkstraService {

    public List<Long> findShortestPath(
            NavigationGraph graph,
            Long startId,
            Long destinationId) {

        Map<Long, Double> distances = new HashMap<>();
        Map<Long, Long> previous = new HashMap<>();

        PriorityQueue<NodeDistance> queue =
                new PriorityQueue<>(
                        Comparator.comparingDouble(
                                NodeDistance::getDistance
                        )
                );

        // Initialize distances
        for (Long node : graph.getGraph().keySet()) {
            distances.put(node, Double.POSITIVE_INFINITY);
        }

        distances.put(startId, 0.0);

        queue.add(
                new NodeDistance(startId, 0.0)
        );

        // Dijkstra algorithm
        while (!queue.isEmpty()) {

            NodeDistance current = queue.poll();

            Long currentId = current.getNodeId();

            // Destination reached
            if (currentId.equals(destinationId)) {
                break;
            }

            // Ignore outdated queue entries
            if (current.getDistance()
                    > distances.get(currentId)) {
                continue;
            }

            List<NavigationEdge> edges =
                    graph.getGraph()
                         .getOrDefault(
                                 currentId,
                                 new ArrayList<>()
                         );

            for (NavigationEdge edge : edges) {

                Long neighbour =
                        edge.getDestinationId();

                double newDistance =
                        distances.get(currentId)
                        + edge.getDistance();

                if (newDistance
                        < distances.getOrDefault(
                                neighbour,
                                Double.POSITIVE_INFINITY)) {

                    distances.put(
                            neighbour,
                            newDistance
                    );

                    previous.put(
                            neighbour,
                            currentId
                    );

                    queue.add(
                            new NodeDistance(
                                    neighbour,
                                    newDistance
                            )
                    );
                }
            }
        }

        // Build the path
        List<Long> path = new ArrayList<>();

        Long current = destinationId;

        if (!current.equals(startId)
                && !previous.containsKey(current)) {

            return path;
        }

        while (current != null) {

            path.add(current);

            if (current.equals(startId)) {
                break;
            }

            current = previous.get(current);
        }

        Collections.reverse(path);

        return path;
    }


    // Helper class
    private static class NodeDistance {

        private Long nodeId;

        private double distance;

        public NodeDistance(
                Long nodeId,
                double distance) {

            this.nodeId = nodeId;
            this.distance = distance;
        }

        public Long getNodeId() {
            return nodeId;
        }

        public double getDistance() {
            return distance;
        }
    }
}
