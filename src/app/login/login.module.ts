import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RegisterComponent } from '../register/register.component';
import { FirebaseModule } from './../firebase/firebase.module';
import { LoginComponent } from './login.component';
import { LoginPage } from './login.page';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'userLogin',
        component: LoginComponent
    },
    {
        path: 'userRegister',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        FirebaseModule
    ],
    declarations: [LoginPage, LoginComponent, RegisterComponent]
})
export class LoginPageModule { }
