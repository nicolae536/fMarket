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

	getUsersWithFilters(id, emailFilter, nameFilter, selectedStatusFilter :AccountStatus, cityId, pageIndex){
		var requestOptions:FilterOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
		return this.http.post(this.adminUsersControllerRoute + '/search?page=' + pageIndex, JSON.stringify(requestOptions), this.getRequestOptions());
	}

	buildSearchObject(id:number, emailFilter :string, nameFilter :string, selectedStatusFilter :AccountStatus, cityId :number, pageIndex:number):FilterOptions{
		var requestOptions:FilterOptions ={
			id:id , 
			email: emailFilter,
			name: nameFilter, 
			status: selectedStatusFilter ? selectedStatusFilter : AccountStatus.AUTO, 
			cityId: cityId === -1 ? null : cityId		
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
	searchObject:FilterOptions;
	page:number;
}

interface FilterOptions{
	id	:Object;
	email:Object;
	name:Object;
	status:AccountStatus;
	cityId:Object;
}
