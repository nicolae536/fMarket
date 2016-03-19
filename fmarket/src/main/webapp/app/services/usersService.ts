import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, BaseRequestOptions} from 'angular2/http';
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
		return Promise.resolve(USERS);
	}

	updateUser(user:User){
		this.http.post('/admin/users', JSON.stringify(user));
	}

	getUsersWithFilters(pageIndex:number, emailFilter :string, nameFilter :string, selectedStatusFilter :string, cityFilter :string){
		var requestOptions:RequestOptions = {email:emailFilter, name:nameFilter, status:selectedStatusFilter, city:cityFilter, pageIndex:pageIndex};
		return this.http.get('/admin/users', requestOptions);
	}
}

interface RequestOptions{	
	email:string;
	name:string;
	status:string;
	city:string;
	pageIndex:number;
}