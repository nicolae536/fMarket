import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CompanieType} from "../models/companieType";
import {AccountStatus} from "../models/user";
//import {USERS} from "./mock-providers/mock-Users";
import {FMarketApi} from "./fMarketApi";


@Injectable()
export class CompanieTypeService {
	adminUsersControllerRoute:string = '/company/types';
	api:FMarketApi;

	constructor(http:Http) {
		this.api = new FMarketApi(http);
	}

	getCompanyTypesWithFilters(searchQuery:string){
		return this.api.get(this.adminUsersControllerRoute+`/?searchQuery=${searchQuery}`);
	}

	deleteCompanyType(companyId){
		return this.api.delete(this.adminUsersControllerRoute +`/${companyId}`);
	}

	editCompaniType(company){
		return this.api.put(this.adminUsersControllerRoute, JSON.stringify(company));
	}

	addCompanyType(company){
		return this.api.put(this.adminUsersControllerRoute, JSON.stringify(company));	
	}
}
