function getPos() {//initial function to read the position
         estado = "livre";
         navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
         setTimeout(keep_alive, 10000); //read every 10 seconds
 }

 function onSuccess(position) {//read map and mark it in the map
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log("Found - LAT: ", lat, "LON: ", lon);

    var image = '/img/taxi_green.png';
    var mapoptions = {
        zoom: 16,
        center: new google.maps.LatLng(lat,lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        icon: image
    };
    map = new google.maps.Map(document.getElementById("mapTest"), mapoptions);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        map: map
    });
    save_position();
}

function keep_alive() {//read position and mark it in the map
   navigator.geolocation.getCurrentPosition(onRefresh, onError, {enableHighAccuracy:true});
   save_position();
   setTimeout(keep_alive, 10000); //read every 10 seconds   
}

//refresh only the marker
function onRefresh(position) {
   lat = position.coords.latitude;
   lon = position.coords.longitude;

   console.log("Found - LAT: ", lat, "LON: ", lon);

   marker.setPosition(new google.maps.LatLng(lat, lon));//refresh marker
   map.setCenter(new google.maps.LatLng(lat, lon));//resfresh center of the map
}

function trace_client() {//mark clients position in the map
   //clientMarker.setPosition(new google.maps.LatLng(client_lat, client_lon));
   clientMarker = new google.maps.Marker({
        position: new google.maps.LatLng(client_lat,client_lon),
        map: map
    });
   console.log("client marked in the map");
}

function onError(error) {
   console.log('code: '    + error.code, 'message: ' + error.message);
}