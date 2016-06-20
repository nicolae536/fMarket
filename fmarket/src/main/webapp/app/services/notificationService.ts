/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from '@angular/core';
import {FMarketApi} from "./fMarketApi";
import {Subject} from "rxjs/Subject";
import {IAlert} from "../app.component";
import {ApplicationConstants} from "../models/applicationConstansts";


@Injectable()
export class NotificationService {
    private api:FMarketApi;
    public notificationFlux:Subject<any> = new Subject();
    public firstLoad:Subject<any> = new Subject();

    public homePageNotifications:Subject<any> = new Subject();
    
    constructor(api:FMarketApi) {
        this.api = api;
    }

    getStatus(){
        return this.api.get('/admin/demands/newcount');
    }

    emitNotificationToRootComponent(notification:IAlert){
        this.notificationFlux.next(notification);
    }

    emitSuccessNotificationToRootComponent(message:string, timeout:number){
        this.notificationFlux.next({
            message:message,
            type:'success',
            dismisable:true,
            timeout:timeout
        });
    }

    emitErrorNotificationToRootComponent(message:string, timeout:number){
        this.notificationFlux.next({
            message: message,
            type: 'danger',
            dismisable: true,
            timeout: timeout
        });
    }

    emitWarningNotificationToRootComponent(message:string, timeout:number){
        this.notificationFlux.next({
            message: message,
            type: 'warning',
            dismisable: true,
            timeout: timeout
        });
    }

    removeLoading() {
        this.firstLoad.next(ApplicationConstants.FIRST_LOAD);
    }
}