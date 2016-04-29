import {Component} from "angular2/core";
import {RouteConfig, Router, Route, Location, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

import {Alert} from "ng2-bootstrap/ng2-bootstrap";

import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {AdminPage} from "./pages/adminPage/adminPage";
import {HomePage} from "./pages/homePage/homePage";
import {RegistrationPage} from "./pages/registrationPage/registrationPage";
import {ForgetPasswordPage} from "./pages/registrationPage/forgetPasswordPage/forgetPasswordPage";
import {NotificationService} from "./services/notificationService";
import {LoginPage} from "./pages/registrationPage/loginPage/loginPage";
import {AccountSettingsPage} from "./pages/accountSettingsPage/accountSettingsPage";

const SECOND:number = 1000;
const MINUTE:number = 60000;
const HOUR:number = 3600000;

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

@RouteConfig([
    new Route({
        path: '/',
        name: 'Home',
        component: HomePage,
        useAsDefault: true
    }),
    new Route({
        path: '/registration',
        name: 'Registration',
        component: RegistrationPage
    }),
    new Route({
        path: '/login',
        name: 'Login',
        component: LoginPage
    })
    , new Route({
        path: '/forget-password',
        name: 'ForgetPassword',
        component: ForgetPasswordPage
    }),
    new Route({
        path: '/admin/...',
        name: 'Admin',
        component: AdminPage
    }),
    new Route({
        path: '/account/...',
        name: 'Account',
        component: AccountSettingsPage
    })])

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
        let j = 0;

        Observable.interval(15 * SECOND).subscribe(
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
            error =>{

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