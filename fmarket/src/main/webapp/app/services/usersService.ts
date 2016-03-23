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
		this.http.post('/admin/users', JSON.stringify(user));
	}

	getUsersWithFilters(id:number, emailFilter :string, nameFilter :string, selectedStatusFilter :AccountStatus, cityId :number, pageIndex:number){
		var requestOptions:RequestOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);

		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(this.adminUsersControllerRoute + '/search?page=' + pageIndex, JSON.stringify(requestOptions), {headers:headers});
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
