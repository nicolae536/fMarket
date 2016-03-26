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
		return this.http.put(this.adminUsersControllerRoute + '/'+ user.id, JSON.stringify(user), this.getRequestOptions());
	}

	createUser(user:User){
		return this.http.post(this.adminUsersControllerRoute, JSON.stringify(user), this.getRequestOptions());
	}

	deleteUser(user:User){
		return this.http.delete(this.adminUsersControllerRoute + '/' + user.id, this.getRequestOptions());
	}

	getUsersWithFilters(id, emailFilter, nameFilter, selectedStatusFilter :AccountStatus, cityId, pageIndex){
		var requestOptions:FilterOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
		return this.http.post(this.adminUsersControllerRoute + '/search?page=' + pageIndex, JSON.stringify(requestOptions), this.getRequestOptions());
	}

	buildSearchObject(id:number, emailFilter :string, nameFilter :string, selectedStatusFilter :AccountStatus, cityId :number, pageIndex:number):FilterOptions{
		var requestOptions:FilterOptions ={
			id: null , 
			email: emailFilter.length > 0 ? emailFilter : null,
			name: nameFilter.length > 0 ? emailFilter : null, 
			status: selectedStatusFilter ? selectedStatusFilter : null, 
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
