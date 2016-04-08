//import libraryes
import {Component, OnInit, ViewEncapsulation,Injectable} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location } from 'angular2/router';

//import application modules
import {UsersPage} from './usersPage/usersPage';
import {SubscribersPage} from './subscribersPage/subscribersPage';
import {CategoriesPage} from './categoriesPage/categoriesPage';

var applicationPath:string = '/app/pages/adminPage';

@Component({
    selector: 'admin-Page',
    templateUrl: applicationPath + '/adminPage.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({path: '/users', component: UsersPage, name: 'Users'}),
    new Route({path: '/subscribers', component: SubscribersPage, name: 'Subscribers'}),
    new Route({path: '/categorii/...', component: CategoriesPage, name: 'Categories'}),
    //{ path: '/jquery', component: JqueryIntegration, name: 'JqueryIntegration' }),
])

export class AdminPage {

    location:Location;
    router:Router;

    constructor(location:Location, router:Router) {
        this.location = location;
        this.router = router;
    }
} 