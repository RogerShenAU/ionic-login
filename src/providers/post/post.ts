import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {

  	http: any;
	authUrl: string;

	constructor(http:Http){

		this.http = http;
		this.authUrl = 'https://www.example.com/login.php'; // change this to your RESTful URL
		/*
			to integrate with WordPress, visit ...
			to integrate with PHP, visit ...
		*/
	}

	restAuth(username,password){
		return this.http.post(this.authUrl,{"username":username,"password":password})
			.map(res => res.json());
	}
}
