import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../models/user";
import {FMarketApi} from "./fMarketApi";
import {AccountStatus} from "../models/accountStatus";


@Injectable()
export class UserService {
    adminUsersControllerRoute:string = '/admin/users';
    api:FMarketApi;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    updateUser(user:User) {
        return this.api.put(this.adminUsersControllerRoute + `/${user.id}`, JSON.stringify(user));
    }

    createUser(user:User) {
        return this.api.post(this.adminUsersControllerRoute, JSON.stringify(user));
    }

    deleteUser(user:User) {
        return this.api.delete(this.adminUsersControllerRoute + `/${user.id}`);
    }

    getUsersWithFilters(id, emailFilter, nameFilter, selectedStatusFilter:AccountStatus, cityId, pageIndex) {
        var requestOptions:FilterOptions = this.buildSearchObject(id, emailFilter, nameFilter, selectedStatusFilter, cityId, pageIndex);
        return this.api.post(this.adminUsersControllerRoute + `/search?page=${pageIndex}`, JSON.stringify(requestOptions));
    }

    buildSearchObject(id:number, emailFilter:string, nameFilter:string, selectedStatusFilter:AccountStatus, cityId:number, pageIndex:number):FilterOptions {
        var requestOptions:FilterOptions = {
            id: id === undefined || id == null || id === -1 ? null : id,
            email: emailFilter.length > 0 ? emailFilter : null,
            name: nameFilter.length > 0 ? emailFilter : null,
            status: selectedStatusFilter ? selectedStatusFilter : null,
            cityId:  cityId === undefined || cityId == null || cityId === -1 ? null : cityId,
        };
        return requestOptions;
    }
}

interface SearchObject {
    searchObject:FilterOptions;
    page:number;
}

interface FilterOptions {
    id:number;
    email:Object;
    name:Object;
    status:AccountStatus;
    cityId:Object;
}
