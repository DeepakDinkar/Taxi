import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';

declare var google: any;
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild('Map') mapElement: ElementRef;
	map: any;
	mapOptions: any;
	location = { lat: null, lng: null };
	markerOptions: any = { position: null, map: null, title: null };
	marker: any;
	apiKey: any = environment.mapsApiKey;
	markerArray = [];
	autoComplete: any;

	// Instantiate a directions service.


	constructor(public zone: NgZone, private geolocation: Geolocation) {
		const script = document.createElement('script');
		script.id = 'googleMap';
		script.src = environment.mapsURL + this.apiKey;
		document.head.appendChild(script);
		this.geolocation.getCurrentPosition().then(location => {
			this.location = {
				lat: location.coords.latitude,
				lng: location.coords.longitude
			}
			this.mapOptions = {
				center: this.location,
				zoom: 10,
				mapTypeControlOptions: {
					mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
						'styled_map']
				},
				mapTypeControl: false
			};
		});

		setTimeout(() => {
			const styleMap = new google.maps.StyledMapType([
				{
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#f5f5f5'
						}
					]
				},
				{
					'elementType': 'labels.icon',
					'stylers': [
						{
							'visibility': 'off'
						}
					]
				},
				{
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#616161'
						}
					]
				},
				{
					'elementType': 'labels.text.stroke',
					'stylers': [
						{
							'color': '#f5f5f5'
						}
					]
				},
				{
					'featureType': 'administrative',
					'elementType': 'geometry',
					'stylers': [
						{
							'visibility': 'off'
						}
					]
				},
				{
					'featureType': 'administrative.land_parcel',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#bdbdbd'
						}
					]
				},
				{
					'featureType': 'poi',
					'stylers': [
						{
							'visibility': 'off'
						}
					]
				},
				{
					'featureType': 'poi',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#eeeeee'
						}
					]
				},
				{
					'featureType': 'poi',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#757575'
						}
					]
				},
				{
					'featureType': 'poi.park',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#e5e5e5'
						}
					]
				},
				{
					'featureType': 'poi.park',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#9e9e9e'
						}
					]
				},
				{
					'featureType': 'road',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#ffffff'
						}
					]
				},
				{
					'featureType': 'road',
					'elementType': 'labels.icon',
					'stylers': [
						{
							'visibility': 'off'
						}
					]
				},
				{
					'featureType': 'road.arterial',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#757575'
						}
					]
				},
				{
					'featureType': 'road.highway',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#dadada'
						}
					]
				},
				{
					'featureType': 'road.highway',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#616161'
						}
					]
				},
				{
					'featureType': 'road.highway.controlled_access',
					'elementType': 'geometry.fill',
					'stylers': [
						{
							'visibility': 'simplified'
						}
					]
				},
				{
					'featureType': 'road.local',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#9e9e9e'
						}
					]
				},
				{
					'featureType': 'transit',
					'stylers': [
						{
							'visibility': 'off'
						}
					]
				},
				{
					'featureType': 'transit.line',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#e5e5e5'
						}
					]
				},
				{
					'featureType': 'transit.station',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#eeeeee'
						}
					]
				},
				{
					'featureType': 'water',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#c9c9c9'
						}
					]
				},
				{
					'featureType': 'water',
					'elementType': 'geometry.stroke',
					'stylers': [
						{
							'color': '#00ff40'
						}
					]
				},
				{
					'featureType': 'water',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'color': '#9e9e9e'
						}
					]
				}
			]);
			this.autoComplete = new google.maps.places.AutocompleteService();
			// this.autoComplete.getPlacePredictions({ input: 'chennai' }).then((places: any) => {
			// 	console.log(places);
			// });
			
			this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
			const directionsService = new google.maps.DirectionsService;
			const directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });
			const stepDisplay = new google.maps.InfoWindow;
			this.calculateAndDisplayRoute(directionsDisplay, directionsService, this.markerArray, stepDisplay, this.map);
			this.map.mapTypes.set('styled_map', styleMap);
			this.map.setMapTypeId('styled_map');
			this.markerOptions = { position: this.location, map: this.map, title: 'My Location' };
			this.marker = new google.maps.Marker(this.markerOptions);
		}, 3000);
	}

	calculateAndDisplayRoute(directionsDisplay: any, directionsService: any, markerArray: any, stepDisplay: any, map: any) {
		for (let i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}

		// Retrieve the start and end locations and create a DirectionsRequest using
		// WALKING directions.
		directionsService.route({
			origin: document.getElementById('start'),
			destination: document.getElementById('end'),
			travelMode: 'WALKING'
		}, function (response, status) {
			// Route the directions and pass the response to a function to create
			// markers for each step.
			if (status === 'OK') {
				document.getElementById('warnings-panel').innerHTML =
					'<b>' + response.routes[0].warnings + '</b>';
				directionsDisplay.setDirections(response);
				this.showSteps(response, markerArray, stepDisplay, map);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	showSteps(directionResult: any, markerArray: any, stepDisplay: any, map: any) {
		// For each step, place a marker, and add the text to the marker's infowindow.
		// Also attach the marker to an array so we can keep track of it and remove it
		// when calculating new routes.
		const myRoute = directionResult.routes[0].legs[0];
		for (let i = 0; i < myRoute.steps.length; i++) {
			const marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
			marker.setMap(map);
			marker.setPosition(myRoute.steps[i].start_location);
			this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
		}
	}

	attachInstructionText(stepDisplay: any, marker: any, text: any, map: any) {
		google.maps.event.addListener(marker, 'click', function () {
			stepDisplay.setContent(text);
			stepDisplay.open(map, marker);
		});
	}
}

