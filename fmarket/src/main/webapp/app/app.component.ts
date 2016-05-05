import {Component} from "angular2/core";
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {Alert} from "ng2-bootstrap/ng2-bootstrap";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {AuthorizationService} from "./services/authorizationService";
import {HeaderComponent} from "./components/headerComponent/headerComponent";
import {NotificationService} from "./services/notificationService";
import {ApplicationConstants} from "./models/applicationConstansts";
//= {type: "success", dismisable: true, message:""};
@Component({
    selector: 'my-app',
    template: `
        <header-component></header-component>
        <div class="page-container">
            <div *ngFor="#notification of _notifications" class="notification-helper">
                <alert [type]="notification.type" dismissible="true" (close)="closeAlert(notification)">
                    {{notification.message}}
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
    _notifications:IAlert []
    private _notificationService:NotificationService;

    constructor(router:Router, location:Location, notificationService:NotificationService) {
        let me = this;

        this.router = router;
        this.location = location;
        this._notifications = new Array<IAlert>();

        this._notificationService = notificationService;
        this._notificationService.notificationFlux.subscribe(event=> {
            me.showDissmisableNotification(event, 3);
        });

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
                                    message: response + " cereri noi!"
                                }, 3);

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
}

export interface IAlert {
    type:string;
    dismisable:boolean;
    message:string;
}