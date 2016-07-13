import {Component, AfterViewChecked, ViewChild} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Location} from "@angular/common";

import {JqueryService} from "../../services/jqueryService";
import {NotificationService} from "../../services/notificationService";

import {ApplicationConstants} from "../../models/applicationConstansts";
import {AdminPage} from "./adminPage";
import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";
import {CompaniesPage} from "./categoriesPage/companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {CompanieCreatePage} from "./companiesPage/companiesEditPage/companiesCreatePage";
import * as template from './adminPage.html';
import {ENTER_LEAVE_ANIMATION} from "../pageAnimations/enterLeavePage";
import {FADE_IN_ANIMATION} from "../pageAnimations/fadeIn";
import {SLIDE_DOWN_ANIMATION} from "../pageAnimations/slideDown";

@Component({
    selector: 'admin-Page',
    template:template,
    directives: [ROUTER_DIRECTIVES, ROUTER_DIRECTIVES],
    precompile: [
        UsersPage,
        SubscribersPage,
        CategoriesPage,
        DemandsPage,
        DemandsEditPage,
        CompaniesPage,
        CompaniesEditPage,
        CompanieCreatePage,
    ],
    animations: SLIDE_DOWN_ANIMATION.concat(FADE_IN_ANIMATION)
})

export class AdminPage implements AfterViewChecked {
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

    ngAfterViewChecked():any {
        this._notificationService.removeLoading();
    }
    
    checkRoute(link){
        return this.location.path().indexOf(link) !== -1;
    }
}
