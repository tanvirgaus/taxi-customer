//create map
	
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var clientCenter = new google.maps.LatLng(40.700683, -73.925972),
var map;

function initializeMap()
{
	directionsDisplay = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById('map-canvas-test'), {
	   zoom: 13,
	   center: clientCenter,
	   mapTypeId: google.maps.MapTypeId.ROADMAP
	 });
	 
	directionsDisplay.setMap(map);
}

function locError(error) {
	// the current position could not be located
	alert("The current position could not be found!");
}

function setCurrentPosition(pos) {
	currentPositionMarker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(
			pos.coords.latitude,
			pos.coords.longitude
		),
		title: "Current Position"
	});
	map.panTo(new google.maps.LatLng(
			pos.coords.latitude,
			pos.coords.longitude
		));
}

function displayAndWatch(position) {
	// set current position
	//setCurrentPosition(position);
	// watch position
	watchCurrentPosition();
}

function watchCurrentPosition() {
	var options = {timeout: 5000};
	var positionTimer = navigator.geolocation.watchPosition(
		function (position) {
			end = position;
		
		}, function () {
			alert('cannot update position');
		}, options);
}

function setMarkerPosition(marker, position) {
	marker.setPosition(
		new google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude)
	);
}

function initLocationProcedure() {
	initializeMap();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
	} else {
		alert("Your browser does not support the Geolocation API");
	}
}

$(document).ready(function() {
	initLocationProcedure();
});
