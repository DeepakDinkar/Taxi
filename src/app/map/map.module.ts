import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';

import { MapComponent } from './map.component';
import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapPage, MapComponent],
  providers: [Geolocation]
})
export class MapPageModule {}
