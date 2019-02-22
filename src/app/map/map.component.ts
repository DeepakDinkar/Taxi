import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;
@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@ViewChild('Map') mapElement: ElementRef;
	private map: any;
	private mapOptions: any;
	private location = { lat: null, lng: null };
	private markerOptions: any = { position: null, map: null, title: null };
	private marker: any;
	markerArray = [];

	ngOnInit() { }

	constructor(public zone: NgZone, private geolocation: Geolocation) {
		this.getCurrentPosition();
	}

	private getCurrentPosition() {
		this.geolocation.getCurrentPosition().then((position) => {
			this.location.lat = position.coords.latitude;
			this.location.lng = position.coords.longitude;
			this.mapOptions = {
				center: this.location,
				zoom: 21,
				mapTypeControl: false,
				zoomControl: false,
			};
			this.setMap();
			this.setMarker();
		});
	}

	private setMap() {
		this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
	}

	private setMarker() {
		this.markerOptions.position = this.location;
		this.markerOptions.map = this.map;
		this.markerOptions.title = 'My Location';
		this.marker = new google.maps.Marker(this.markerOptions);
	}

	calculateAndDisplayRoute(directionsDisplay: any, directionsService: any, markerArray: any, stepDisplay: any, map: any) {
		for (let i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}
		directionsService.route({
				origin: document.getElementById('start'),
				destination: document.getElementById('end'),
				travelMode: 'WALKING'
			}, (response, status) => {
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
