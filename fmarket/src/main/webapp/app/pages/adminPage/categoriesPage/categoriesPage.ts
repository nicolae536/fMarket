import {Component} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';

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
@CanActivate(()=>{    return AuthorizationService.hasRole(Role.ADMIN) && AuthorizationService.isLoggedIn();})
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

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Meniu', link: 'Categories/CategoriesMenu', enableMarker:false, markerContent: ""},
            {name: 'Companii', link: 'Categories/Companies', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: 'Categories/Domains', enableMarker:false, markerContent: ""}];
    }
} 