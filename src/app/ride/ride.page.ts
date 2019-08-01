import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import cities from 'cities.json';
import { Trip } from './trip';

declare var google: any;
const COUNTRY_CODE = 'IN';
@Component({
    selector: 'app-ride',
    templateUrl: './ride.page.html',
    styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
    private autoComplete: any;
    private allLocations: any[] = [];
    showSuggestion: string;
    locations: any[] = [];
    destination = '';
    startingPoint = '';
    trip = new Trip();
    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.autoComplete = new google.maps.places.AutocompleteService();
        this.allLocations = cities.filter(city => city.country === COUNTRY_CODE);
    }

    navigate() {
        this.authService.setTrip(this.trip);
        this.router.navigate(['/cab-list']);
    }

    searchDestination(event: any) {
        this.showSuggestion = 'Destination';
        if (this.destination !== '') {
            this.locations = this.allLocations.filter(city =>
                city.name.toLowerCase().includes(this.destination.toLowerCase()));
        } else {
            this.locations = [];
        }
        // this.autoComplete.getPlacePredictions({ input: this.destination }, (predictions) => {
        // });
    }

    searchStartPoint(event: any) {
        this.showSuggestion = 'StartingPoint';
        if (this.startingPoint !== '') {
            this.locations = this.allLocations.filter(city =>
                city.name.toLowerCase().includes(this.startingPoint.toLowerCase()));
        } else {
            this.locations = [];
        }
        // this.autoComplete.getPlacePredictions({ input: this.startingPoint }, (predictions) => {
        // });
    }

    selectSuggestion(value: any) {
        if (this.showSuggestion === 'StartingPoint') {
            this.startingPoint = value.name;
            this.trip.start = value;
        } else {
            this.destination = value.name;
            this.trip.end = value;
        }
        this.locations = [];
        this.showSuggestion = '';
    }
}
