/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {IAlert} from "../app.component";


@Injectable()
export class NotificationService {
    private _NotificationController:string = '/notify';
    private api:FMarketApi;
    public notificationFlux:Subject<any> = new Subject();

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getStatus(){
        return this.api.get('/admin/demands/newcount');
    }

    emitNotificationToRootComponent(notification:IAlert){
        this.notificationFlux.next(notification);
    }
}