package com.campus.navigation.navigation;

	public class NavigationNode {

	    private Long locationId;

	    private String locationName;

	    public NavigationNode(Long locationId, String locationName) {
	        this.locationId = locationId;
	        this.locationName = locationName;
	    }

	    public Long getLocationId() {
	        return locationId;
	    }

	    public String getLocationName() {
	        return locationName;
	    }
	}

