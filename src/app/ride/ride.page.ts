import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var google: any;
@Component({
	selector: 'app-ride',
	templateUrl: './ride.page.html',
	styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
	private autoComplete: any;
	destinationLocations: any[] = [];
	destination: string;
	constructor(private router: Router) { }

	ngOnInit() {
		this.autoComplete = new google.maps.places.AutocompleteService();
		this.destination = '';
	}

	navigate() {
		this.router.navigate(['/cab-list']);
	}

	searchDestination() {
		// this.autoComplete.getPlacePredictions({ input: this.destination }, ( predictions ) => {
		// 	this.destinationLocations = predictions;
		// });
	}
}
