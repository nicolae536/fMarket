import {Component, OnInit, ViewEncapsulation,Injectable} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location } from 'angular2/router';
import {UsersPage} from '../usersPage/usersPage';

var applicationPath:string = '/app/pages/AdminPage';

@Component({
	selector: 'admin-Page',
	templateUrl: applicationPath + '/adminPage.html',
	directives:[ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({ path: '/users', component: UsersPage, name: 'Users' }),
    //{ path: '/jquery', component: JqueryIntegration, name: 'JqueryIntegration' }),
])

export class AdminPage {
	
	 location:Location;

    constructor(location:Location) {
        this.location = location;
    }
} 