import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerGroup: FormGroup;
	progressBar: boolean;
	invalidUser: boolean;
	constructor(private location: Location, private router: Router, private authService: AuthService, private fb: FormBuilder) { }

	ngOnInit() {
		this.registerGroup = this.fb.group({
			userName: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
			reEnterPassword: new FormControl('', [Validators.required, this.isPassWordMismatch]),
			phoneNumber: new FormControl('', Validators.required),
		});
	}

	navigate() {
		this.location.back();
	}

	register(value: any) {
		this.progressBar = true;
		this.authService.signUpUser(value.email, value.password).then(result => {
			this.router.navigate(['/ride']);
		}).catch(error => {
			this.invalidUser = true;
			this.progressBar = false;
		});
	}

	isPassWordMismatch(control: AbstractControl) {
		if (control.parent) {
			const password = control.parent.get('password').value;
			if (control.value !== password) {
				return { mismatch: true };
			}
		}
		return null;
	}
}
