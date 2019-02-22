import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginGroup: FormGroup;
	invalidUser: boolean;
	progressBar: boolean;

	constructor(private location: Location, private router: Router, private fb: FormBuilder, private authService: AuthService) { }

	ngOnInit() {
		this.loginGroup = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required)
		});
	}

	navigate() {
		this.location.back();
	}

	login(value: any) {
		this.progressBar = true;
		this.authService.signInUser(value.email, value.password).then(result => {
			this.router.navigate(['/ride']);
		}).catch(error => {
			this.invalidUser = true;
			this.progressBar = false;
		});
	}

}
