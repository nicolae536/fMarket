import {Component, OnInit} from "@angular/core";
import {Routes, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Location, CORE_DIRECTIVES, FormBuilder} from "@angular/common";
import {AlertComponent} from "ng2-bootstrap/ng2-bootstrap";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {AuthorizationService} from "./services/authorizationService";
import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {NotificationService} from "./services/notificationService";
import {ApplicationConstants} from "./models/applicationConstansts";
import {LocalStorageService} from "./services/localStorageService";
import {FooterComponent} from "./components/footerComponent/footerComponent";
import {RegistrationService} from "./services/registrationService";
import {Role} from "./models/Roles";
import {JqueryService} from "./services/jqueryService";
import * as _ from 'underscore';

@Component({
    selector: 'my-app',
    template: `                
        <div class="application-wrapper">
            <header-component></header-component>
            <div class="page-container">
                <div class="notification-wrapper">
                    <div *ngFor="let notification of _notifications"  class="wrapper-inner">
                        <div [class.ng-for-item]="notification.new"  class="notification-helper">
                                <alert [type]="notification.type" dismissible="true" (close)="closeAlert(notification)">
                                    {{notification.message}}
                                </alert>
                        </div>
                    </div>
                </div>
                <router-outlet></router-outlet>
            </div>
            <footer-component></footer-component>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, AlertComponent, CORE_DIRECTIVES, FooterComponent]
})

@Routes(AuthorizationService.getApplicationRootRoutes())

export class AppComponent implements OnInit {
    router:Router;
    location:Location;
    _notifications:IAlert [];
    private _notificationService:NotificationService;
    private _registrationService:RegistrationService;
    private _localeStorageService:LocalStorageService;
    addItem:boolean=true;

    constructor(router:Router, location:Location, notificationService:NotificationService, registrationService:RegistrationService, localeStorageService:LocalStorageService) {
        this._registrationService = registrationService;
        this._localeStorageService = localeStorageService;
        let me = this;

        this.router = router;
        this.location = location;
        this._notifications = new Array<IAlert>();

        this._notificationService = notificationService;
        this._notificationService.notificationFlux.subscribe(event=> {
            event.new = true;

            if (event.timeout) {
                me.showDissmisableNotification(event, event.timeout);
            }
            else {
                console.log(event);
                me._notifications.push(event);
            }
            setTimeout(()=>{me._notifications[me._notifications.length-1]['new']=false;}, 500);
        });

        _.defer(this.checkApplicationStatus, this);
        //this.startDemadsWatcher();
    }

    ngOnInit():any {
        let me = this;

        this._notificationService.firstLoad.subscribe(event=> {
            if(ApplicationConstants.FIRST_LOAD){
                let element = document.getElementById('loadingSpinnerComponent');
                if(!element){
                    return;
                }

                JqueryService.removeElementWithAnimation(element);
                // JqueryService.setAppBackground();
            }
        });
    }

    private startDemadsWatcher() {
        let me = this;

        //noinspection TypeScriptUnresolvedFunction
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
                            if (response && response > 0) {
                                me.showDissmisableNotification({
                                    type: "success",
                                    dismisable: true,
                                    message: response + " cereri noi!",
                                    timeout: 5
                                }, 5);

                            }
                        },
                        error => {
                        }
                    );
            },
            error => {

            }
        );
    }

    showDissmisableNotification(notification:IAlert, seconds:number) {
        let me = this;

        this._notifications.push(notification);
        setTimeout(function () {
            me.closeAlert(notification);
        }, seconds * ApplicationConstants.SECOND)
    }

    closeAlert(notification:IAlert) {
        let index = this._notifications.indexOf(notification);
        if (index !== -1) {
            this._notifications.splice(index, 1);
        }
    }

    private checkApplicationStatus(context) {
        let me = context;
        Observable.interval(60 * ApplicationConstants.SECOND).subscribe(
            success => {
                context._registrationService.checkIfLoggedIn()
                    .map(response => {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                    .subscribe(
                        response=> {
                            context._localeStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, response);
                        },
                        error=> {
                            context._localeStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, {
                                email: null,
                                accountType: Role.USER,
                                loggedIn: false
                            });
                        }
                    );
            },
            error=>{

            });
    }
}

export interface IAlert {
    type:string;
    dismisable:boolean;
    message:string;
    timeout:number;
}