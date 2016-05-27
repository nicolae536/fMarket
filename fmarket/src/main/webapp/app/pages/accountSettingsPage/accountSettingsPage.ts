/**
 * Created by nick_ on 4/26/2016.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes, Route, Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {AuthorizationService} from "../../services/authorizationService";
import {JqueryService} from "../../services/jqueryService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {TabsRoutingComponent} from "../../components/tabsComponent/tabsRoutingComponent";
import {NotificationService} from "../../services/notificationService";
import {Role} from "../../models/Roles";
var applicationPath:string = '/app/pages/accountSettingsPage';

@Component({
    selector: 'account-settings-Page',
    templateUrl: applicationPath + '/accountSettingsPage.html',
    directives: [ROUTER_DIRECTIVES, TabsRoutingComponent]
})

@Routes([
    new Route({
        path: '/details',
        component: AccountEditPage,
    }),
    new Route({
        path: '/demands',
        component: AccountDemandsPage,
    })
])
export class AccountSettingsPage implements OnActivate{
    router:Router;
    _notificationService:NotificationService;
    private tabPagesList;
    constructor(router:Router, notificationService:NotificationService) {
        this.router = router;
        this.tabPagesList = [{name: 'Contul meu', link: '/account/details', enableMarker:false, markerContent: ""},
            {name: 'Cererile mele', link: '/account/demands', enableMarker:false, markerContent: ""}];
        this._notificationService = notificationService;
        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        if(!(AuthorizationService.isLoggedIn() && !AuthorizationService.hasRole(Role.ADMIN))){
            this.router.navigate(['/login']);
            this._notificationService.emitSuccessNotificationToRootComponent("Nu aveti access la acest modul !!!",5)
        }
    }
}
