//import libraryes
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, Location, CanActivate, Route} from 'angular2/router';
import {AuthorizationService} from "../../services/authorizationService";

import {Role} from "../../models/Roles";
import {UsersPage} from "./usersPage/usersPage";
import {SubscribersPage} from "./subscribersPage/subscribersPage";
import {CategoriesPage} from "./categoriesPage/categoriesPage";
import {DemandsPage} from "./demandsPage/demandsPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {CompaniesEditPage} from "./companiesPage/companiesEditPage/companiesEditPage";
import {DemandsEditPage} from "./demandsPage/demandsEditPage/demandsEditPage";

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

export class AdminPage {

    location:Location;
    router:Router;

    constructor(location:Location, router:Router) {
        this.location = location;
        this.router = router;
    }
} 