			var pushNotification;
            
			function callbackAPPID(data) {
				//window.location.href = "my-vehicles.html";
							
			}	

            function onNotificationGCM(e) {
				switch( e.event ) {
                    case 'registered':
					if ( e.regid.length > 0 ) {
						//currentUser = getLocalStorage("User");
						//userId = currentUser.id;
						//params = { callback : 'callbackAPPID', controller : 'Users', action : 'appid', data : [{ deviceRegId : e.regid, userId : currentUser.id }] }; 
						//getAjaxData(params, 'callbackAPPID');
						getLocalStorage("deviceRegId",e.regid);
					}
                    break;
					
					case 'message':
					if (e.foreground){
						//$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
							
							// if the notification contains a soundname, play it.
						//	var my_media = new Media("/android_asset/www/"+e.soundname);
						//	my_media.play();
						
					}
					
					//alert(e.payload.message+"Yes");
					if(e.payload.message == 'Job Accepted') {
						//alert(e.payload.message+"Zahid");
						
						$('#popupDialog').popup('close');
						urlString = "rate-taxi.html";
						window.open(urlString);
					}else if( e.payload.message == 'Taxi Arrived'){
						
					}
		
					break;
                }
            }
            
            function tokenHandler (result) { }
			function successHandler (result) { 
					alert(result+"false");
			}
            function errorHandler (error) { }
            