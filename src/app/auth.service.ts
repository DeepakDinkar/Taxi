import { Trip } from './ride/trip';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    employee: any;
    private trip: any;
    constructor(private auth: AngularFireAuth) { }

    signUpUser(email: string, password: string) {
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    }

    signInUser(email: string, password: string) {
        return this.auth.auth.signInWithEmailAndPassword(email, password);
    }

    setTrip(trip: Trip): void {
        this.trip = trip;
    }

    getTrip(): Trip {
        return this.trip;
    }
}
