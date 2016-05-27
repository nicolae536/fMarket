import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES, Route} from "@angular/router";

import {CompaniesPage} from "./companiesPage/companiesPage";
import {DomainsPage} from "./domainsPage/domainsPage";
import {CategoriesMenuPage} from "./categoriesMenuPage/categoriesMenuPage";
import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {TabHeader} from "../../../models/TabHeader";
import {Role} from "../../../models/Roles";
import {AuthorizationService} from "../../../services/authorizationService";

let applicationPath:string = '/app/pages/adminPage/categoriesPage';

@Component({
    selector: 'categoryes-page',
    templateUrl: applicationPath + '/categoriesPage.html',
    styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES]
})
@Routes([
    new Route({
        path: '/meniu',
        component: CategoriesMenuPage,
    }),
    new Route({
        path: '/firme',
        component: CompaniesPage,
    }),
    new Route({
        path: '/domenii',
        component: DomainsPage,
    }),
])


export class CategoriesPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Meniu', link: '/admin/categorii/meniu', enableMarker:false, markerContent: ""},
            {name: 'Companii', link: '/admin/categorii/firme', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/categorii/domenii', enableMarker:false, markerContent: ""}];
    }
} 