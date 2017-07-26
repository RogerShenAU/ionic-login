import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {

  	http: any;
	authUrl: string;

	constructor(http:Http){

		this.http = http;
		
		/* 
		Option 1
		change below authUrl to your RESTful URL for authorisation
		*/
		// this.authUrl = 'https://www.example.com/login.php'; 

		/* 
		Option 2
		to integrate with WordPress, visit https://github.com/RogerShenAU/wp-ionic-login-auth and follow the instructions
		*/
		// this.authUrl = 'https://www.example.com/wp-ionic-login-auth'; 

		/* 
		Option 3
		to use PHP as server side authorisation, visit https://github.com/RogerShenAU/php-ionic-login-auth and follow the instructions
		*/
		// this.authUrl = 'https://www.example.com/php-ionic-login-auth/login.php'; 
	}

	restAuth(username,password){
		return this.http.post(this.authUrl,{"username":username,"password":password})
			.map(res => res.json());
	}
}
