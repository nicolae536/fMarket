import {Component, AfterViewChecked, ViewChild} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Location} from "@angular/common";

import {JqueryService} from "../../services/jqueryService";
import {NotificationService} from "../../services/notificationService";

import {ApplicationConstants} from "../../models/applicationConstansts";
import {APPLICATION_ROUTER_DIRECTIVE} from "../../components/applicationRouter/applicationRouter";

let template = require('./adminPage.html');

@Component({
    selector: 'admin-Page',
    template:template,
    directives: [APPLICATION_ROUTER_DIRECTIVE, ROUTER_DIRECTIVES]
})

export class AdminPage implements AfterViewChecked{
    //<editor-fold="Services">
    router:Router;
    location:Location;
    private _notificationService:NotificationService;
    //</editor-fold>

    //<editor-fold="Variables">
    @ViewChild('leftMenu') leftMenu;
    @ViewChild('rightMenu') rightMenu;
    //</editor-fold>

    constructor(location:Location, router:Router, notificationService:NotificationService) {
        this.location = location;
        this.router = router;
        this._notificationService = notificationService;
        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }

    // routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    //     if(!(AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN))){
    //         this.router.navigate(['/login']);
    //     }
    // }

    ngAfterViewChecked():any {
        // JqueryService.setAdminPageHeight(this.leftMenu.nativeElement, this.rightMenu.nativeElement);
        this._notificationService.removeLoading();
    }
    
    checkRoute(link){
        return this.location.path().indexOf(link) !==-1;
    }
}
