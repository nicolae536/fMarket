import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, BaseRequestOptions, Headers} from 'angular2/http';
import {User} from "../models/user";
import {AccountStatus} from "../models/user";
import {USERS} from "./mock-providers/mock-Users";

@Injectable()
export class UserService {
	http: Http;
	adminUsersControllerRoute:string = '/admin/users';

	constructor(http: Http) {
		console.log('Http injected');
		this.http = http;
	}

	getUsers() {
		return Promise.resolve(USERS);
	}

	updateUser(user:User){
		this.http.put('/admin/users', JSON.stringify(user));
	}

	createUser(user:User){
		return this.http.post(this.adminUsersControllerRoute, JSON.stringify(user), this.getRequestOptions());
	}

	getUsersWithFilters(id:number, emailFilter :string, nameFilter :string, selectedStatusFilter :AccountStatus, cityId :number, pageIndex:number){
		var requestOptions:RequestOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
		return this.http.post(this.adminUsersControllerRoute + '/search?page=' + pageIndex, JSON.stringify(requestOptions), this.getRequestOptions());
	}

	buildSearchObject(id:number, emailFilter :string, nameFilter :string, selectedStatusFilter :AccountStatus, cityId :number, pageIndex:number):RequestOptions{
		var requestOptions:RequestOptions ={
			id:id === -1 ? -1 : id, 
			email: emailFilter,
			name: nameFilter, 
			status: selectedStatusFilter ? selectedStatusFilter : AccountStatus.AUTO, 
			cityId: cityId === -1 ? -1 : cityId 			
		};
		return requestOptions;
	}

	getRequestOptions(){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return {headers:headers};
	}
}

interface SearchObject{
	searchObject:RequestOptions;
	page:number;
}

interface RequestOptions{
	id	:number;
	email:string;
	name:string;
	status:AccountStatus;
	cityId:number;
}
