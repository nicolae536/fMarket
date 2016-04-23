import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES, Location } from 'angular2/router';

import {CompaniesPage} from "./companiesPage/companiesPage";
import {DomainsPage} from "./domainsPage/domainsPage";
import {CategoriesMenuPage} from "./categoriesMenuPage/categoriesMenuPage";
import {Tab, TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";

let applicationPath:string = '/app/pages/adminPage/categoriesPage';

@Component({
    selector: 'categoryes-page',
    templateUrl: applicationPath + '/categoriesPage.html',
    styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({
        path: '/meniu',
        component: CategoriesMenuPage,
        name: 'CategoriesMenu',
        useAsDefault:true
    }),
    new Route({
        path: '/firme',
        component: CompaniesPage,
        name: 'Companies'
    }),
    new Route({
        path: '/domenii',
        component: DomainsPage,
        name: 'Domains'
    }),
])


export class CategoriesPage {

    tabPagesList:Array<Tab>;

    constructor() {
        this.tabPagesList = [{name: 'Meniu', link: 'Categories/CategoriesMenu', enableMarker:false, markerContent: ""},
            {name: 'Companii', link: 'Categories/Companies', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: 'Categories/Domains', enableMarker:false, markerContent: ""}];
    }
} 