$(document).ready(function(){	
	$("#accordion").click(function(){

		if ($("#accordion-in").is(":hidden")){
			$( "#accordion-in" ).show( "fast" );
			$("#arrow").css("transform", "rotate(90deg)").css("color", "#4d4d4d");
		}else {
			$( "#accordion-in").slideUp("fast");
			$("#arrow").css("transform", "none").css("color", "#00adee");}
	})	
});

function initMap() {
	
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 50.5548306, lng: 30.7812118},
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.TERRAIN   
		});

		var infowindow = new google.maps.InfoWindow({
			content: "x.id"
		});

		var info = function(x) {
			infowindow.content = x.title
			infowindow.open(map,x);			
		}
		
		var changeToActive = function (marker) {
			marker.setIcon("img/marker2.png");
		    marker.riverCoordinate.setMap(map);
		    infowindow = new google.maps.InfoWindow({
				content: ""
			});

		info(marker)
		};

		var changeToNotActive = function (marker) {
			marker.setIcon("img/marker1.png");
		    marker.riverCoordinate.setMap(null);
		    infowindow.setMap(null)
		};

		var changeMarkerAndRiverCoordinate = function() {							
						if 	(this.icon == "img/marker1.png"){				  
						   changeToActive(this);
						   
						} else {
							changeToNotActive(this);
						}						
		};

		var changeDependsOfMenu = function(link, marker) {
			google.maps.event.addDomListener(link, "mouseover", function(argument) {
				changeToActive(marker);
			});
			google.maps.event.addDomListener(link, "mouseout", function(argument) {
				changeToNotActive(marker);
			})
		};
		
		$.getScript("data/rivers.js", function (){	
			
			for (i in rivers){
				if (rivers.hasOwnProperty(i)){
					var marker = new google.maps.Marker({ 
						position:{
							lat: rivers[i].lat,
							lng: rivers[i].lng
						},												
						title: rivers[i].name,
						id: rivers[i].id,
						map: map,
						icon: "img/marker1.png",						
					});
				};

					var coordinates = [];					
					for (var n = 0; n < rivers[i].coordinates.length; n++){
						 coordinates[n] = new google.maps.LatLng(rivers[i].coordinates[n].lat, rivers[i].coordinates[n].lng);						 
					};
					
					var riverPath = new google.maps.Polyline({
					    path: coordinates,
					    strokeColor: '#00adee',
					    strokeOpacity: .8,
					    strokeWeight: 5
					  });					

										
					var riverMenuLink = document.getElementById(i).parentNode;

					var unicMarker = marker;
					
					marker.riverCoordinate = riverPath;
					
					google.maps.event.addListener(marker, 'mouseover', changeMarkerAndRiverCoordinate); 
					
					google.maps.event.addListener(marker, 'mouseout', changeMarkerAndRiverCoordinate);

					changeDependsOfMenu(riverMenuLink, unicMarker);
			};			  					
		});
};