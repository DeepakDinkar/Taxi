import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	public appPages = [
		{
			title: 'Home',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'List',
			url: '/list',
			icon: 'list'
		}
	];

	constructor(private menu: MenuController) { }

	ngOnInit() {
	}


	openFirst() {
		this.menu.enable(true, 'first');
		this.menu.open('first');
	}

	openEnd() {
		this.menu.open('end');
	}

	openCustom() {
		this.menu.enable(true, 'custom');
		this.menu.open('custom');
	}
}
