import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { PostProvider } from '../../providers/post/post';
import { GlobalProvider } from '../../providers/global/global';

export class User {
  
  displayname: string;
  username: string;
  password: string;
  remember: string;

  constructor(displayname: string, username: string, password: string, remember: string) {

    this.displayname = displayname;
    this.username = username;
    this.password = password;
    this.remember = remember;
  }
}

@Injectable()

export class AuthProvider {

  currentUser: User;
  returnAccess: any;

  constructor(protected injector: Injector, public global:GlobalProvider, private storage: Storage, private post: PostProvider ){

  }

  public login(credentials) {
    
    if (credentials.username === null || credentials.password === null) {

      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {

        this.post.restAuth(credentials.username,credentials.password).subscribe( response => {

          this.returnAccess = response;

          if(this.returnAccess.result != "Success!"){

            this.global.showError(this.returnAccess.result);
          }else{            

            if(credentials.remember == "yes"){

              this.storage.set('displayname', this.returnAccess.displayname);
              this.storage.set('username', credentials.username);
              this.storage.set('password', credentials.password);
            }else{

              this.storage.remove("username");
              this.storage.remove("password");
              this.storage.remove("displayname");
            }       
            
            this.currentUser = new User(this.returnAccess.displayname, credentials.username, credentials.password, credentials.remember);      
            
            observer.next(true);
            observer.complete();
          }
        });
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
     
      if(this.currentUser.remember == "no"){
        this.storage.remove("username");
        this.storage.remove("password");
        this.storage.remove("displayname");
      }
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  postAuth(username, password){

    this.post.restAuth(username,password).subscribe( response => {

      this.returnAccess = response;
    });
  }
}