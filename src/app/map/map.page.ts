import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
	selector: 'app-map',
	templateUrl: './map.page.html',
	styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
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
	// constructor(
	// 	private platform: Platform,
	// 	private splashScreen: SplashScreen,
	// 	private statusBar: StatusBar
	// 	) {
	// 	this.initializeApp();
	// }

	ngOnInit() {
	}

	// initializeApp() {
	// 	this.platform.ready().then(() => {
	// 		this.statusBar.styleDefault();
	// 		this.splashScreen.hide();
	// 	});
	// }

}
