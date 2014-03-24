/*var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}*/
var marker;
var clientMarker;
var bounds = new google.maps.LatLngBounds();


function getPos() {//initial function to read the position
    estado = "livre";
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
    setTimeout(keep_alive, 10000); //read every 10 seconds
 }

 function onSuccess(position) {//read map and mark it in the map
	option = getLocalStorage('option');
	
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log("Found - LAT: ", lat, "LON: ", lon);

    //var image = '/img/taxi_green.png';
    var mapoptions = {
        zoom: 16,
        center: new google.maps.LatLng(lat,lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //icon: image
    };
	
    map = new google.maps.Map(document.getElementById("map-canvas"), mapoptions);
	
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        map: map
    });
	bounds.extend(new google.maps.LatLng(lat,lon));

	map.panTo(new google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
	));
    //save_position();
}

function keep_alive() {//read position and mark it in the map
   navigator.geolocation.getCurrentPosition(onRefresh, onError, {enableHighAccuracy:true});
   //save_position();
   setTimeout(keep_alive, 10000); //read every 10 seconds   
}

//refresh only the marker
function onRefresh(position) {
   lat = position.coords.latitude;
   lon = position.coords.longitude;

   console.log("Found - LAT: ", lat, "LON: ", lon);

   marker.setPosition(new google.maps.LatLng(lat, lon));//refresh marker
   map.setCenter(new google.maps.LatLng(lat, lon));//resfresh center of the map
   
		params = { callback : 'callbackGetLocation', controller : 'DriversVehicles', action : 'getLocation', data : [{ vehicleId : 5 /*localStorage.getItem("driverid")*/ }] };
		getAjaxData(params, 'callbackGetLocation');
   
   map.fitBounds(bounds);
   
   //23.7623751 LON:  90.3908276 
}

function trace_client(client_lat,client_lon) {//mark clients position in the map
   //clientMarker.setPosition(new google.maps.LatLng(client_lat, client_lon));
   clientMarker = new google.maps.Marker({
        position: new google.maps.LatLng(client_lat,client_lon),
        map: map
    });
   console.log("client marked in the map");
   bounds.extend(new google.maps.LatLng(client_lat,client_lon));
}

function onError(error) {
   console.log('code: '    + error.code, 'message: ' + error.message);
}

function callbackGetLocation(data){
	if (data.success == true) {
		console.log(data.data[0].DriversVehicle.current_lat);
		console.log(data.data[0].DriversVehicle.current_long);
		//window.location.reload();
		trace_client(data.data[0].DriversVehicle.current_lat,data.data[0].DriversVehicle.current_long);
		//alert('success');
	} else {

	}
}


google.maps.event.addDomListener(window, 'load', getPos);
