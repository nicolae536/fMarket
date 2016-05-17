/**
 * Created by nick_ on 4/26/2016.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, Router, CanActivate} from "@angular/router-deprecated";
import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {AuthorizationService} from "../../services/authorizationService";
import {JqueryService} from "../../services/jqueryService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {TabsRoutingComponent} from "../../components/tabsComponent/tabsRoutingComponent";

var applicationPath:string = '/app/pages/accountSettingsPage';

@Component({
    selector: 'account-settings-Page',
    templateUrl: applicationPath + '/accountSettingsPage.html',
    directives: [ROUTER_DIRECTIVES, TabsRoutingComponent]
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
    private tabPagesList;

    constructor(router:Router) {
        this.router = router;
        this.tabPagesList = [{name: 'Contul meu', link: 'Account/Details', enableMarker:false, markerContent: ""},
            {name: 'Cererile mele', link: 'Account/Demands', enableMarker:false, markerContent: ""}];

        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }
}