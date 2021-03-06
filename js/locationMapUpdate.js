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
    //navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
    setTimeout(keep_alive, 10000); //read every 10 seconds
 }

 function onSuccess() {//read map and mark it in the map
	
	option = getLocalStorage('option');
	
    lat = option.current_lat;
    lon = option.current_lng;
    console.log("Found - LAT: ", lat, "LON: ", lon);

    //var image = '/img/taxi_green.png';
    var mapoptions = {
        zoom: 16,
        center: new google.maps.LatLng(lat,lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //icon: image
    };
	
    map = new google.maps.Map(document.getElementById("map-canvas"), mapoptions);
	//alert('Executed onsuccess after the line map');
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        map: map
    });
	//alert('Executed onsuccess after the line marker');
	

	map.panTo(new google.maps.LatLng( lat, lon));
    //save_position();
	//alert('Executed onsuccess last line');
	bounds.extend(new google.maps.LatLng(lat,lon));
	setTimeout(keep_alive, 10000);
}

function keep_alive() {//read position and mark it in the map
	params = { callback : 'callbackGetLocation', controller : 'DriversVehicles', action : 'getLocation', data : [{ jobId : localStorage.getItem("jobId") }] };
	getAjaxData(params, 'callbackGetLocation');
	
    setTimeout(keep_alive, 10000); //read every 10 seconds   
}



function trace_client(client_lat,client_lon) {//mark clients position in the map
   clientMarker = new google.maps.Marker({
        position: new google.maps.LatLng(client_lat,client_lon),
        map: map
    });
   console.log("client marked in the map");
   bounds.extend(new google.maps.LatLng(client_lat,client_lon));
   map.fitBounds(bounds);
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


google.maps.event.addDomListener(window, 'load', onSuccess);
