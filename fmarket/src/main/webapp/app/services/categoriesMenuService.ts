/**
 * Created by nick_ on 4/8/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {INewDomainMenuItemRequest} from "../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../models/interfaces/iUpdateDomainMenuItemRequest";

@Injectable()
export class CategoriesMenuService {
    private _domainMenuController:string = '/menu/domain';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getMenuDictionary():Observable<Object> {
        return this.api.get(this._domainMenuController);
    }

    getDomains():Observable<Object> {
        return this.api.get('/demand/domains');
    }

    addMenuItem(newDomainMenuItem:INewDomainMenuItemRequest):Observable<Object> {
        return this.api.post(this._domainMenuController, JSON.stringify(newDomainMenuItem));
    }

    deleteMenuItem(id:number):Observable<Object> {
        return this.api.delete(this._domainMenuController + `/${id}`);
    }

    updateMenuItem(menuItem:IUpdateDomainMenuItemRequest):Observable<Object> {
        return this.api.put(this._domainMenuController, JSON.stringify(menuItem));
    }

}
