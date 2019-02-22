import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
employee: any;
  constructor(private auth: AngularFireAuth) {}

  signUpUser(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }
}
