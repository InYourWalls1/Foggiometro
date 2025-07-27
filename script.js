let destinationLatitude;
let destinationLongitude;

if (document.title == "Foggiometro"){
	destinationLatitude = 41.462299;
	destinationLongitude = 15.544744;
} else if (document.title == "Bosometro"){
	destinationLatitude = 40.2964939254985;
	destinationLongitude = 8.499781672343888;
} else if (document.title == "Isiliometro"){
	destinationLatitude = 39.74026952022464;
	destinationLongitude = 9.10920453422067;
} else if (document.title == "Kirkometro"){
	destinationLatitude = 39.2001770149445;
	destinationLongitude = 9.152413952578316;
} else if (document.title == "Ollollaiometro"){
	destinationLatitude = 40.168901524733585;
	destinationLongitude = 9.179073650351103;
}


let watchId = null;

function distance(){
	
	if (watchId !== null) {
    return; //this means we're already watching
	}
	
	if (!navigator.geolocation) {
    console.error("Geolocation not supported");
    return;
	}
	
	watchId = navigator.geolocation.watchPosition(
		function(position) {
			console.log(position.coords.latitude, position.coords.longitude);
			console.log(document.title)
			
			const lat1 = position.coords.latitude
			const lon1 = position.coords.longitude
			
			const R = 6371*(10**3); // metres
			const phi1 = lat1 * Math.PI/180; // φ, λ in radians
			const phi2 = destinationLatitude * Math.PI/180;
			const delta_phi = (destinationLatitude-lat1) * Math.PI/180;
			const delta_lambda = (destinationLongitude-lon1) * Math.PI/180;

			const a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
					  Math.cos(phi1) * Math.cos(phi2) *
					  Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			const d = R * c;
			
			const km = (d / 1000).toFixed(2);
			
			console.log(`distanza da X: ${km}`)
			
			const display = document.getElementById("distanceDisplay");
			if (display) {
			display.textContent = `${km} km`;
			}
		},
		function(error){
			console.error(error);
		},
		{
		enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 10000
		}
	);
}

window.addEventListener("DOMContentLoaded", distance);

//see https://www.movable-type.co.uk/scripts/latlong.html for haversine calculation script
