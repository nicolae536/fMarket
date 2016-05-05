/**
 * Created by nick_ on 4/26/2016.
 */

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, Router, CanActivate} from "angular2/router";
import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {AuthorizationService} from "../../services/authorizationService";

var applicationPath:string = '/app/pages/accountSettingsPage';

@Component({
    selector: 'account-settings-Page',
    templateUrl: applicationPath + '/accountSettingsPage.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({
        path: '/details',
        component: AccountEditPage,
        name: 'Details',
        useAsDefault:true
    }),
    new Route({
        path: '/demands',
        component: AccountDemandsPage,
        name: 'Demands'
    })
])
@CanActivate(()=>{return AuthorizationService.isLoggedIn();})
export class AccountSettingsPage{
    router:Router;

    constructor(router:Router) {
        this.router = router;
    }
}