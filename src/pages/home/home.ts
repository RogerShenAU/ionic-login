import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public nav: NavController, private auth: AuthProvider) {
  }

	public logout() {
		this.auth.logout().subscribe(succ => {
		  this.nav.setRoot('LoginPage');
		});
	}

}
