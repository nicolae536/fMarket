import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location } from 'angular2/router';

import {CompaniesPage} from "./companiesPage/companiesPage";


let applicationPath: string = '/app/pages/adminPage/categoriesPage';

@Component({
	selector: 'categoryes-page',
	templateUrl: applicationPath + '/categoriesPage.html',
	styleUrls:[	applicationPath + '/categoriesPage.css'],
	directives:[ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({ path: '/firme', component: CompaniesPage, name: 'Companies' }),
    //new Route({ path: '/cereri', component: SubscribersPage, name: 'Firme' }),
    //{ path: '/jquery', component: JqueryIntegration, name: 'JqueryIntegration' }),
])


export class CategoriesPage {
	
	location:Location;
	router:Router;
	tabPagesList = new Array<Object>({name:'Companii', link:'Categories/Companies'});

    constructor(location:Location, router:Router) {
        this.location = location;
        this.router = router;
    }
} 