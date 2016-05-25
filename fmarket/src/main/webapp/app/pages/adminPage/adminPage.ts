//import libraryes
import {Component, AfterViewChecked, ViewChild} from '@angular/core';
import {RouteConfig, CanActivate, Router, ROUTER_DIRECTIVES, Route} from '@angular/router-deprecated';
import {Location} from '@angular/common';

import {AuthorizationService} from "../../services/authorizationService";

import {Role} from "../../models/Roles";
import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";
import {JqueryService} from "../../services/jqueryService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {NotificationService} from "../../services/notificationService";

var applicationPath:string = '/app/pages/adminPage';

@Component({
    selector: 'admin-Page',
    templateUrl: applicationPath + '/adminPage.html',
    directives: [ROUTER_DIRECTIVES]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
@RouteConfig([
    new Route({
        path: '/users',
        component: UsersPage,
        name: 'Users',
        useAsDefault:true
    }),
    new Route({
        path: '/subscribers',
        component: SubscribersPage,
        name: 'Subscribers'
    }),
    new Route({
        path: '/categorii/...',
        component: CategoriesPage,
        name: 'Categories'
    }),
    new Route({
        path: '/cereri/...',
        component: DemandsPage,
        name: 'Demands'
    }),
    new Route({
        path: '/cerere-detalii/:id',
        component: DemandsEditPage,
        name: 'EditDemand',
    }),
    new Route({
        path: '/lista',
        component: CompaniesPage,
        name: 'Companies'
    }),
    new Route({
        path: '/detalii/:id',
        component: CompaniesEditPage,
        name: 'CompanieDetails'
    }),
])

export class AdminPage implements AfterViewChecked{
    @ViewChild('leftMenu') leftMenu;
    @ViewChild('rightMenu') rightMenu;
    location:Location;

    router:Router;
    private _notificationService:NotificationService;

    constructor(location:Location, router:Router, notificationService:NotificationService) {
        this.location = location;
        this.router = router;
        this._notificationService = notificationService;
        JqueryService.removeElementWithAnimation(document.getElementById(ApplicationConstants.LOADING_SPINNER));
    }

    ngAfterViewChecked():any {
        // JqueryService.setAdminPageHeight(this.leftMenu.nativeElement, this.rightMenu.nativeElement);
        this._notificationService.removeLoading();
    }
}
