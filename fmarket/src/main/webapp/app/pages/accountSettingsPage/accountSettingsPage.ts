/**
 * Created by nick_ on 4/26/2016.
 */

import {Component} from "@angular/core";
import { Router} from "@angular/router";

import {NotificationService} from "../../services/notificationService";
import {JqueryService} from "../../services/jqueryService";


import {ApplicationConstants} from "../../models/applicationConstansts";
import {TabsRoutingComponent} from "../../components/tabsComponent/tabsRoutingComponent";
import {APPLICATION_ROUTER_DIRECTIVE} from "../../components/applicationRouter/applicationRouter";
let template = require('./accountSettingsPage.html');


@Component({
    selector: 'account-settings-Page',
    template:template,
    directives: [APPLICATION_ROUTER_DIRECTIVE, TabsRoutingComponent]
})

export class AccountSettingsPage{

    //<editor-fold desc="Services">
    router:Router;
    _notificationService:NotificationService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private tabPagesList;
    //</editor-fold>

    constructor(router:Router, notificationService:NotificationService) {
        this.router = router;
        this.tabPagesList = [{name: 'Contul meu', link: '/account/details', enableMarker:false, markerContent: ""},
            {name: 'Cererile mele', link: '/account/demands', enableMarker:false, markerContent: ""}];
        this._notificationService = notificationService;
        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }

    // routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    //     if(!(AuthorizationService.isLoggedIn() && !AuthorizationService.hasRole(Role.ADMIN))){
    //         this.router.navigate(['/login']);
    //         this._notificationService.e("Nu aveti access la acest modul !!!",5)
    //     }
    // }
}
