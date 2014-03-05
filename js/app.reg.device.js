			var pushNotification;
            
			function callbackAPPID(data) {
				window.location.href = "my-vehicles.html";
							
			}	
            // handle GCM notifications for Android
			
           
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }

            function onNotificationGCM(e) {
				switch( e.event ) {
                    case 'registered':
					if ( e.regid.length > 0 ) {
						currentUser = getLocalStorage("User");
						//userId = currentUser.id;
						params = { callback : 'callbackAPPID', controller : 'Users', action : 'appid', data : [{ deviceRegId : e.regid, userId : currentUser.id }] }; 
						getAjaxData(params, 'callbackAPPID');
					}
                    break;
                }
            }
            
            function tokenHandler (result) { }
			function successHandler (result) {  }
            function errorHandler (error) { }
            