import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {RequestType} from "../models/requestType";
import {AccountStatus} from "../models/user";
//import {USERS} from "./mock-providers/mock-Users";
import {FMarketApi} from "./fMarketApi";


@Injectable()
export class RequestTypeService {
	controllerRoute:string = '/request/types';
	api:FMarketApi;

	constructor(http:Http) {
		this.api = new FMarketApi(http);
	}

	getRequestTypesWithFilters(searchQuery:string){
		return this.api.get(this.controllerRoute+`/?searchQuery=${searchQuery}`);
	}

	deleteRequestType(requestId){
		return this.api.delete(this.controllerRoute +`/${requestId}`);
	}

	editRequestType(request){
		return this.api.put(this.controllerRoute, JSON.stringify(request));
	}

	addCompanyType(request){
		return this.api.put(this.controllerRoute, JSON.stringify(request));	
	}
}
