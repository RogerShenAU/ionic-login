import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  credentials = {username: '', password: '', remember: 'yes'}; // select remember by default

  constructor(private nav: NavController, private auth: AuthProvider, public global:GlobalProvider, private storage: Storage) {

  }

  ngOnInit(){
    
    this.storage.get('username').then((val) => {

      if(val != null){

        this.credentials.username = val;
      }
    });

    this.storage.get('password').then((val) => {

      if(val != null){

        this.credentials.password = val;
      }
    });
  }

  updateStatus(){

    if(this.credentials.remember == 'no'){

      this.credentials.remember = 'yes';
    }else{

      this.credentials.remember = 'no';
    }
  }
  
  public login() {

    this.global.showLoading();

    this.auth.login(this.credentials).subscribe(allowed => {

      if (allowed) {

        this.nav.setRoot('HomePage');

      } else {

        this.global.showError("Access Denied");
      }
    },
      error => {

        this.global.showError(error);
      });
  }
}