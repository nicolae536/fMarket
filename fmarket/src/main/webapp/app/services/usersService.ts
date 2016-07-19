import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../models/user";
import {FMarketApi} from "./fMarketApi";
import {AccountStatus} from "../models/accountStatus";
import {IListResponse} from '../models/interfaces/iListResponse';

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
        return this.api.post<IListResponse>(this.adminUsersControllerRoute + `/search?page=${pageIndex}`, JSON.stringify(requestOptions));
    }

    buildSearchObject(id:number, emailFilter:string, nameFilter:string, selectedStatusFilter:AccountStatus, cityId:number, pageIndex:number):FilterOptions {
        var requestOptions:FilterOptions = {
            id: id === undefined || id == null || id === -1 ? null : id,
            email: emailFilter.length > 0 ? emailFilter : null,
            name: nameFilter.length > 0 ? nameFilter : null,
            status: selectedStatusFilter ? selectedStatusFilter : null,
            cityId:  cityId == -1 || !cityId ? null : cityId,
        };
        return requestOptions;
    }

    getStatuese(){
        return this.api.get<Array<Object>>(`/admin/users/statuses`);
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
