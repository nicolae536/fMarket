import {Component} from "@angular/core";
import {RouteConfig, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Location} from "@angular/common";
import {CORE_DIRECTIVES, FormBuilder} from "@angular/common";

import {Alert} from "ng2-bootstrap/ng2-bootstrap";

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {AuthorizationService} from "./services/authorizationService";
import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {NotificationService} from "./services/notificationService";
import {ApplicationConstants} from "./models/applicationConstansts";
import {LocalStorageService} from "./services/localStorageService";
import {FooterComponent} from "./components/footerComponent/footerComponent";
import {RegistrationService} from "./services/registrationService";
import {AccountService} from "./services/accountService";
import {CategoriesMenuService} from "./services/categoriesMenuService";
import {CompanieTypeService} from "./services/companieTypesService";
import {DemandService} from "./services/demandService";
import {RequestTypeService} from "./services/requestTypeService";
import {SubscribersService} from "./services/subscribersService";
import {UserService} from "./services/usersService";
import {CompaniesService} from "./services/companiesService";
import {Role} from "./models/Roles";

//= {type: "success", dismisable: true, message:""};
@Component({
    selector: 'my-app',
    template: `
        <div class="application-wrapper">
            <header-component></header-component>
            <div class="page-container">
                <div *ngFor="let notification of _notifications" class="notification-helper">
                    <alert [type]="notification.type" dismissible="true" (close)="closeAlert(notification)">
                        {{notification.message}}
                    </alert>
                </div>
                <router-outlet></router-outlet>
            </div>
            <footer-component></footer-component>
        </div>
    `,
    styles: [`
        .application-wrapper{
            padding-bottom: 186px;
            position: relative;
            min-height: 100vh;
            background-color: white;
        }
        
        .page-container{
            margin-top: 50px;
        }
        
        .page-container .notification-helper{
            position: fixed;
            max-width: 100%;
            z-index: 10001;
            right: 6.3%;
            top:8%;
        }
        
        
        @media (max-width: 768px){
            .application-wrapper{
                    padding-bottom: 400px !important;
            }
    }
    `],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, Alert, CORE_DIRECTIVES, FooterComponent],
    providers: [
        FormBuilder,

        NotificationService,
        LocalStorageService,
        RegistrationService,
        AccountService,
        AuthorizationService,
        CategoriesMenuService,
        CompanieTypeService,
        DemandService,
        RegistrationService,
        RequestTypeService,
        SubscribersService,
        UserService,
        CompaniesService
    ]
})

@RouteConfig(AuthorizationService.getApplicationRootRoutes())

export class AppComponent {
    router:Router;
    location:Location;
    _notifications:IAlert []
    private _notificationService:NotificationService;
    private _registrationService:RegistrationService;
    private _localeStorageService:LocalStorageService;

    constructor(router:Router, location:Location, notificationService:NotificationService, registrationService:RegistrationService, localeStorageService:LocalStorageService) {
        this._registrationService = registrationService;
        this._localeStorageService = localeStorageService;
        let me = this;

        this.router = router;
        this.location = location;
        this._notifications = new Array<IAlert>();

        this._notificationService = notificationService;
        this._notificationService.notificationFlux.subscribe(event=> {
            if(event.timeout) {
                me.showDissmisableNotification(event, event.timeout);
            }
            else {
                me._notifications.push(event);
            }
        });

        _.defer(this.checkApplicationStatus, this);
        //this.startDemadsWatcher();
    }

    private startDemadsWatcher() {
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
    }
}

export interface IAlert {
    type:string;
    dismisable:boolean;
    message:string;
    timeout:number;
}