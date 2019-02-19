import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private location: Location, private router: Router) { }

	ngOnInit() {
	}

	navigate() {
		this.location.back();
	}

	login() {
		this.router.navigate(['/ride']);
	}

}
