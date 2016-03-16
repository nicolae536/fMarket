import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {User} from "../models/user";
import {USERS} from "./mock-providers/mock-Users";

@Injectable()
export class UserService {
	http: Http;

	constructor(http: Http) {
		console.log('Http injected');
		this.http = http;
	}

	getUsers() {
		console.log('try to get users');
		return Promise.resolve(USERS);
	}

	updateUser(user:User){

	}
}