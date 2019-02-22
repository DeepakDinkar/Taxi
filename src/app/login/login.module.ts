import { FirebaseModule } from './../firebase/firebase.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { LoginPage } from './login.page';
import { RegisterComponent } from '../register/register.component';

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
export class LoginPageModule {}
