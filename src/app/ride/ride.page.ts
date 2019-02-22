import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

declare var google: any;
@Component({
	selector: 'app-ride',
	templateUrl: './ride.page.html',
	styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
	private autoComplete: any;
	showSuggestion: string;
	destinationLocations: any[] = [];
	startPointLocations: any[] = [];
	destination = 'Bangalore India';	// Temporary
	startingPoint = 'Chennai India';	// Temporary
	constructor(private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.autoComplete = new google.maps.places.AutocompleteService();
	}

	navigate() {
		const employee = { id: '139832' };
		this.authService.employee = employee;
		this.router.navigate(['/cab-list']);

	}

	searchDestination(event: any) {
		this.showSuggestion = 'Destination';
		this.autoComplete.getPlacePredictions({ input: this.destination }, (predictions) => {
			this.destinationLocations = predictions;
		});
	}

	searchStartPoint(event: any) {
		this.showSuggestion = 'StartingPoint';
		this.autoComplete.getPlacePredictions({ input: this.startingPoint }, (predictions) => {
			this.startPointLocations = predictions;
		});
	}

	selectSuggestion(value: any) {
		if (this.showSuggestion === 'StartingPoint') {
			this.startingPoint = value.description;
		} else {
			this.destination = value.description;
		}
		this.showSuggestion = '';
	}
}
