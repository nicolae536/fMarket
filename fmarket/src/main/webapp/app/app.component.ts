import * as _ from "underscore";

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Location, CORE_DIRECTIVES} from "@angular/common";

import {AlertComponent} from "ng2-bootstrap/ng2-bootstrap";

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {Subject} from "rxjs/Rx";

import {AuthorizationService} from "./services/authorizationService";
import {NotificationService} from "./services/notificationService";
import {ApplicationConstants} from "./models/applicationConstansts";
import {LocalStorageService} from "./services/localStorageService";
import {RegistrationService} from "./services/registrationService";
import {JqueryService} from "./services/jqueryService";
import {ApplicationStateService} from "./services/applicationStateService";

import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {FooterComponent} from "./components/footerComponent/footerComponent";

import {Role} from "./models/Roles";
import {AdminPage} from "./pages/adminPage/adminPage";
import {AccountSettingsPage} from "./pages/accountSettingsPage/accountSettingsPage";
import {HomePage} from "./pages/homePage/homePage";
import {RegistrationPage} from "./pages/registrationPage/registrationPage";
import {LoginPage} from "./pages/registrationPage/loginPage/loginPage";
import {ForgetPasswordPage} from "./pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {SuccessPage} from "./pages/registrationPage/successPages/successPage";
import {CompanieDetailPage} from "./pages/companiesPage/companieDetailPage/companieDetailPage";
import {TokenConfirmPage} from "./pages/registrationPage/tokenConfirmPage/tokenConfirmPage";
import {CompaniesPage} from "./pages/companiesPage/companiesPage";

import {ROUTER_DIRECTIVES} from "@angular/router";

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
    directives: [ROUTER_DIRECTIVES , HeaderComponent, AlertComponent, CORE_DIRECTIVES, FooterComponent],
    precompile: [
        AdminPage,
        AccountSettingsPage,
        HomePage,
        RegistrationPage,
        LoginPage,
        ForgetPasswordPage,
        SuccessPage,
        CompaniesPage,
        CompanieDetailPage,
        TokenConfirmPage,
    ]
})

export class AppComponent implements OnInit {

    //<editor-fold desc="Services">
    private router:Router;
    private location:Location;
    private _notificationService:NotificationService;
    private _registrationService:RegistrationService;
    private _applicationStateService:ApplicationStateService;
    private _localeStorageService:LocalStorageService;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    private _notifications:IAlert [];
    private addItem:boolean = true;
    private adminDemandsWatcher;
    //</editor-fold>

    constructor(router:Router,
                location:Location,
                notificationService:NotificationService,
                registrationService:RegistrationService,
                applicationStateService:ApplicationStateService,
                localeStorageService:LocalStorageService) {

        //<editor-fold desc="Services initialization">
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._localeStorageService = localeStorageService;
        this._applicationStateService = applicationStateService;
        this.router = router;
        this.location = location;
        //</editor-fold>

        this._notifications = new Array<IAlert>();
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
                                if (response && +response > 0) {
                                    let alertMessage = {
                                        type: "danger",
                                        dismisable: true,
                                        message: `(${response}) Cereri noi de validat!`,
                                        timeout: null
                                    };
                                    me._notifications.push(alertMessage);

                                }
                            },
                            error => {
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
            context.router.navigate(['']);
        }
    }
}

export interface IAlert {
    type:string;
    dismisable:boolean;
    message:string;
    timeout:number;
}