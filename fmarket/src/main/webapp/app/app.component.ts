import {Component, OnInit} from "@angular/core";
import {Routes, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Location, CORE_DIRECTIVES} from "@angular/common";
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
import * as _ from "underscore";
import {ApplicationStateService} from "./services/applicationStateService";
import {Subject} from "rxjs/Rx";

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
    private router:Router;
    private location:Location;
    private _notifications:IAlert [];
    private _notificationService:NotificationService;
    private _registrationService:RegistrationService;
    private addItem:boolean = true;
    private _applicationStateService:ApplicationStateService;
    private _localeStorageService:LocalStorageService;
    private adminDemandsWatcher;
    private rsSubject:Subject;

    constructor(router:Router,
                location:Location,
                notificationService:NotificationService,
                registrationService:RegistrationService,
                applicationStateService:ApplicationStateService,
                localeStorageService:LocalStorageService) {
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._applicationStateService = applicationStateService;

        this.router = router;
        this.location = location;
        this._localeStorageService = localeStorageService;

        this._notifications = new Array<IAlert>();
        this.rsSubject = new Subject();
        this.startDemadsWatcher();


        _.defer(this.checkApplicationStatus, this);
    }

    ngOnInit():any {
        let me = this;

        this._notificationService.notificationFlux.subscribe(event=> {
            event.new = true;

            if (event.timeout) {
                me.showDissmisableNotification(event, event.timeout);
            }
            else {
                console.log(event);
                me._notifications.push(event);
            }
            setTimeout(()=> {
                me._notifications[me._notifications.length - 1]['new'] = false;
            }, 500);
        });

        this._notificationService.firstLoad.subscribe(event=> {
            if (ApplicationConstants.FIRST_LOAD) {
                let element = document.getElementById('loadingSpinnerComponent');
                if (!element) {
                    return;
                }

                JqueryService.removeElementWithAnimation(element);
            }
        });

        // this._localeStorageService.storageStateChange.subscribe(
        //     event=>{
        //             this.rsSubject.next(true);
        //             return;
        //         }
        //         this.rsSubject.next(false);
        //     }
        // )
    }

    private startDemadsWatcher() {
        let me = this;

        //noinspection TypeScriptUnresolvedFunction
        this.adminDemandsWatcher = Observable.interval(15 * ApplicationConstants.SECOND).subscribe(
            success => {
                if (AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN)) {

                    me._notificationService.getStatus()
                        .subscribe(
                            response => {
                                console.log(1);
                                if (response && response > 0) {
                                    let alertMessage = {
                                        type: "danger",
                                        dismisable: true,
                                        message: `(${response}) Cereri noi de validat!`,
                                        timeout: null
                                    };
                                    debugger;
                                    me._notifications.push(alertMessage);

                                }
                            },
                            error => {
                                console.log(1);
                            }
                        );
                }
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

        let errorHandler = function () {
            let response = {
                email: null,
                accountType: Role.USER,
                loggedIn: false
            };
            context._applicationStateService.removeUserSession();
            context.handleUserState(response, context);
        }

        context._registrationService.checkIfLoggedIn()
            .subscribe(
                response=> {
                    context._applicationStateService.setApplicationSessionState(response);
                    context.handleUserState(response, context);
                },
                errorHandler
            );
    }

    private handleUserState(response, context) {
        if (!response.loggedIn && (context.location.path().indexOf('/admin') !== -1 || context.location.path().indexOf('/account') !== -1)) {
            context.router.navigate(['/']);
        }
    }
}

export interface IAlert {
    type:string;
    dismisable:boolean;
    message:string;
    timeout:number;
}