import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location } from 'angular2/router';

import {CompaniesPage} from "./companiesPage/companiesPage";
import {RequestsPage} from "./requestsPage/requestsPage";
import {CategoriesMenuPage} from "./categoriesMenuPage/categoriesMenuPage";

let applicationPath:string = '/app/pages/adminPage/categoriesPage';

@Component({
    selector: 'categoryes-page',
    templateUrl: applicationPath + '/categoriesPage.html',
    styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({path: '/meniu', component: CategoriesMenuPage, name: 'CategoriesMenu'}),
    new Route({path: '/firme', component: CompaniesPage, name: 'Companies'}),
    new Route({path: '/cereri', component: RequestsPage, name: 'Requests'}),
    //{ path: '/jquery', component: JqueryIntegration, name: 'JqueryIntegration' }),
])


export class CategoriesPage {

    location:Location;
    router:Router;
    tabPagesList = [{name: 'Meniu', link: 'Categories/CategoriesMenu'},
        {name: 'Companii', link: 'Categories/Companies'},
        {name: 'Cereri', link: 'Categories/Requests'}];

    constructor(location:Location, router:Router) {
        this.location = location;
        this.router = router;
    }
} 