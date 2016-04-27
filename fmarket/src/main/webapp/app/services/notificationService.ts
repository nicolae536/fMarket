/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";


@Injectable()
export class NotificationService {
    private _NotificationController:string = '/notify';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getStatus(){
        return this.api.get('/admin/demands/newcount');
    }
}