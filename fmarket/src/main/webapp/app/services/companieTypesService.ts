import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CompanieType} from "../models/companieType";
import {AccountStatus} from "../models/user";
//import {USERS} from "./mock-providers/mock-Users";
import {FMarketApi} from "./fMarketApi";


@Injectable()
export class CompanieTypeService {
    private _CompanyDomainController:string = '/company/domains';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getCompanyTypesWithFilters(searchQuery:string) {
        //+ `/?searchQuery=${searchQuery}`
        return this.api.get(this._CompanyDomainController );
    }

    deleteCompanyType(companyId) {
        return this.api.delete(this._CompanyDomainController + `/${companyId}`);
    }

    editCompaniType(companyDomain) {
        return this.api.put(this._CompanyDomainController, JSON.stringify({id:companyDomain.id, newName:companyDomain.name}));
    }

    addCompanyType(companyDomain) {
        return this.api.post(this._CompanyDomainController, JSON.stringify({name: companyDomain}));
    }
}