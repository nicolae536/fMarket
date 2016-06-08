import {Component, AfterViewChecked, ViewChild} from "@angular/core";
import {Routes, Router, ROUTER_DIRECTIVES, Route, OnActivate, RouteSegment, RouteTree } from "@angular/router";
import {Location} from "@angular/common";

import {JqueryService} from "../../services/jqueryService";
import {AuthorizationService} from "../../services/authorizationService";
import {NotificationService} from "../../services/notificationService";

import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {CompanieCreatePage} from "./companiesPage/companiesEditPage/companiesCreatePage";
import {Role} from "../../models/Roles";

let template = require('./adminPage.html');

@Component({
    selector: 'admin-Page',
    template:template,
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    new Route({
        path: '/users',
        component: UsersPage,
    }),
    new Route({
        path: '/subscribers',
        component: SubscribersPage,
    }),
    new Route({
        path: '/categorii',
        component: CategoriesPage,
    }),
    new Route({
        path: '/cereri',
        component: DemandsPage,
    }),
    new Route({
        path: '/cerere-detalii/:id',
        component: DemandsEditPage,
    }),
    new Route({
        path: '/companii',
        component: CompaniesPage,
    }),
    new Route({
        path: '/detalii-companie/:id',
        component: CompaniesEditPage,
    }),
    new Route({
        path: '/ceeaza-companie/ceeaza',
        component: CompanieCreatePage,
    })
])
export class AdminPage implements AfterViewChecked, OnActivate{
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

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        if(!(AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN))){
            this.router.navigate(['/login']);
        }
    }

    ngAfterViewChecked():any {
        // JqueryService.setAdminPageHeight(this.leftMenu.nativeElement, this.rightMenu.nativeElement);
        this._notificationService.removeLoading();
    }
    
    checkRoute(link){
        return this.location.path().indexOf(link) !==-1;
    }
}
