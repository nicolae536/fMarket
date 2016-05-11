import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {FMarketApi} from "./fMarketApi";

@Injectable()
export class SubscribersService {
    api:FMarketApi;
    apiSubscribersControllerUrl:string = "/admin/subscribers";
    apiUserSubscribeController:string = "/subscribers";

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getSubscribersWithFilters(id, email, currentPageIndex, sortKey, ascendingOrder) {
        var filterObject:SubscriberSearchObject = {
            id: id,
            email: email == "" ? null : email,
            sortKey: sortKey.length > 0 ? sortKey : null,
            desc: !ascendingOrder
        };
        return this.api.post(this.apiSubscribersControllerUrl + `/search?page=${currentPageIndex}`, JSON.stringify(filterObject));
    }

    subscribe(email) {
        return this.api.post(this.apiSubscribersControllerUrl, JSON.stringify({email: email}));
    }

    unsubscribe(id) {
        return this.api.put(this.apiSubscribersControllerUrl + `/${id}/unsubscribe`, "");
    }

    delete(id) {
        return this.api.delete(this.apiSubscribersControllerUrl + `/${id}`);
    }

    subscribeTowebsite(email:any) {
        return this.api.post(this.apiUserSubscribeController, JSON.stringify(email));
    }
}

interface SubscriberSearchObject {
    id;
    email;
    sortKey;
    desc;
}