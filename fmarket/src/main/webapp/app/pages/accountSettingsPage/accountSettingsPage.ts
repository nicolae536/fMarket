/**
* Created by nick_ on 4/26/2016.
*/
import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";

import {NotificationService} from "../../services/notificationService";
import {JqueryService} from "../../services/jqueryService";

import {ApplicationConstants} from "../../models/applicationConstansts";
import {TabsRoutingComponent} from "../../components/tabsComponent/tabsRoutingComponent";
import * as template from './accountSettingsPage.html';
import {AccountEditPage} from "./accountEditPage/accountEditPage";
import {AccountDemandsPage} from "./accountDemandsPage/accountDemandsPage";
import {ENTER_LEAVE_ANIMATION} from "../pageAnimations/enterLeavePage";
import {AUTO_HEIGHT_ANIMATION} from "../pageAnimations/autoHeightAnimation";

@Component({
    selector: 'account-settings-Page',
    template:template,
    directives: [ROUTER_DIRECTIVES, TabsRoutingComponent],
    precompile:[
        AccountEditPage,
        AccountDemandsPage
    ],
    animations: ENTER_LEAVE_ANIMATION.concat(AUTO_HEIGHT_ANIMATION)
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
                 this.tabPagesList = [{name: 'Contul meu', link: 'details', enableMarker:false, markerContent: ""},
                         {name: 'Cererile mele', link: 'demands', enableMarker:false, markerContent: ""}];
                 this._notificationService = notificationService;
                 JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
             }
}
