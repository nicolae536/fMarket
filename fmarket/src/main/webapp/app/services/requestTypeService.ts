import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";


@Injectable()
export class RequestTypeService {
    _requestDomains:string = '/demand/domains';
    api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getRequestTypesWithFilters(searchQuery?:string) {
        // + `/?searchQuery=${searchQuery}`
        return this.api.get(this._requestDomains);
    }

    deleteRequestType(requestId) {
        return this.api.delete(this._requestDomains + `/${requestId}`);
    }

    editRequestType(request) {
        return this.api.put(this._requestDomains +`/${request.id}`, JSON.stringify({id:request.id, newName:request.name}));
    }

    addRequestType(request) {
        return this.api.post(this._requestDomains, JSON.stringify({name: request}));
    }
}
