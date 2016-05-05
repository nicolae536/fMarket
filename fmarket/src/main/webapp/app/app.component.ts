import {Component} from "angular2/core";
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES, Route} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";

import {Alert} from "ng2-bootstrap/ng2-bootstrap";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

import {AuthorizationService} from "./services/authorizationService";
import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {NotificationService} from "./services/notificationService";
import {ApplicationConstants} from "./models/applicationConstansts";

@Component({
    selector: 'my-app',
    template: `
        <header-component></header-component>
        <div class="page-container">
            <div *ngIf="_notifications > 0" class="notification-helper">
                <alert [type]="_alert.type" dismissible="true" (close)="closeAlert()">
                    {{_notifications}} cereri noi!
                </alert>
            </div>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .page-container{
            padding-top:5%;
            padding-left: 5%;
            padding-right: 5%;
        }
        
        .page-container .notification-helper{
            position: fixed;
            max-width: 100%;
            z-index: 10001;
            right: 6.3%;
        }
    `],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, Alert, CORE_DIRECTIVES],
    providers: [NotificationService]
})

@RouteConfig(AuthorizationService.getApplicationRootRoutes())

export class AppComponent {
    router:Router;
    location:Location;
    _alert:IAlert = {type: "success", dismisable: true};
    private _notificationService:NotificationService;
    _notifications:number;

    constructor(router:Router, location:Location, notificationService:NotificationService) {
        this.router = router;
        this.location = location;
        this._notificationService = notificationService;
        //this.startChangeWatcher();
    }

    private startChangeWatcher() {
        let me = this;

        Observable.interval(15 * ApplicationConstants.SECOND).subscribe(
            success => {
                me._notificationService.getStatus()
                    .map((response)=> {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                    .subscribe(
                        response => {
                            me._notifications = response;
                        },
                        error => {
                            me.closeAlert();
                        }
                    );
            },
            error => {

            }
        );
    }

    closeAlert() {
        this._notifications = 0;
    }
}

export interface IAlert {
    type:string;
    dismisable:boolean
}