import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'ride', loadChildren: './ride/ride.module#RidePageModule' },
  { path: 'cab-list', loadChildren: './cab-list/cab-list.module#CabListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
