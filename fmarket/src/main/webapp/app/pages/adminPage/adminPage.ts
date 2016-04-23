//import libraryes
import {Component, OnInit, ViewEncapsulation,Injectable} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, Location } from 'angular2/router';

//import application modules
import {UsersPage} from './usersPage/usersPage';
import {SubscribersPage} from './subscribersPage/subscribersPage';
import {CategoriesPage} from './categoriesPage/categoriesPage';
import {DemandsPage} from "./demandsPage/demandsPage";

var applicationPath:string = '/app/pages/adminPage';

@Component({
    selector: 'admin-Page',
    templateUrl: applicationPath + '/adminPage.html',
    directives: [ROUTER_DIRECTIVES]
})

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