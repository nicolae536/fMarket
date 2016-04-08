/**
 * Created by nick_ on 4/8/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {CompanieType} from "../models/companieType";
import {MenuItem, MenuData} from "../components/menuComponent/baseMenuComponent/baseMenuComponent"
import {AccountStatus} from "../models/user";
//import {USERS} from "./mock-providers/mock-Users";
import {FMarketApi} from "./fMarketApi";
import {Observable} from "../../node_modules/rxjs/Observable";

@Injectable()
export class CategoriesMenuService {
    private adminUsersControllerRoute:string = '/company/menu';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getMenuDictionary():Observable<Object> {
        return this.api.get(this.adminUsersControllerRoute);
    }

    deleteMenuItem(id:string):Observable<Object> {
        return this.api.delete(this.adminUsersControllerRoute + `/${id}`);
    }

    editMenuItem(menuItem:MenuItem):Observable<Object> {
        return this.api.put(this.adminUsersControllerRoute, JSON.stringify(menuItem));
    }

    addMenuItem(menuData:MenuData):Observable<Object> {
        return this.api.post(this.adminUsersControllerRoute, JSON.stringify(menuData));
    }
}
