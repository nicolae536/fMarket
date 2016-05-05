//import libraryes
import {Component} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, Location, CanActivate} from 'angular2/router';
import {AuthorizationService} from "../../services/authorizationService";

//import application modules
import {UsersPage} from './usersPage/usersPage';
import {SubscribersPage} from './subscribersPage/subscribersPage';
import {CategoriesPage} from './categoriesPage/categoriesPage';
import {DemandsPage} from "./demandsPage/demandsPage";
import {Role} from "../../models/Roles";

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
])

export class AdminPage {

    location:Location;
    router:Router;

    constructor(location:Location, router:Router) {
        this.location = location;
        this.router = router;
    }
} 