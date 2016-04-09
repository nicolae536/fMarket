/**
 * Created by nick_ on 4/8/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CompanieType} from "../models/companieType";
import {MenuItem, NewDomainMenuItemRequest, UpdateDomainMenuItemRequest} from "../components/menuComponent/baseMenuComponent/baseMenuComponent"
import {AccountStatus} from "../models/user";
//import {USERS} from "./mock-providers/mock-Users";
import {FMarketApi} from "./fMarketApi";
import {Observable} from "../../node_modules/rxjs/Observable";

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

    addMenuItem(newDomainMenuItem:NewDomainMenuItemRequest):Observable<Object> {
        return this.api.post(this._domainMenuController, JSON.stringify(newDomainMenuItem));
    }

    deleteMenuItem(id:number):Observable<Object> {
        return this.api.delete(this._domainMenuController + `/${id}`);
    }

    updateMenuItem(menuItem:UpdateDomainMenuItemRequest):Observable<Object> {
        return this.api.put(this._domainMenuController, JSON.stringify(menuItem));
    }

}
