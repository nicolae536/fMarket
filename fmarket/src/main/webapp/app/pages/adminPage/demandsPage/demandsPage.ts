/**
 * Created by nick_ on 4/21/2016.
 */
import {Component} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, } from 'angular2/router';

import {Tab, TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {DemandsListPage} from "./demandsListPage/demandsListPage";
import {DemandsEditPage} from "./demandsEditPage/demandsEditPage";
import {NewDemandsListPage} from "./demandsListPage/newDemandsListPage";

let applicationPath:string = '/app/pages/adminPage/categoriesPage';

@Component({
    selector: 'categoryes-page',
    templateUrl: applicationPath + '/categoriesPage.html',
    styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
    new Route({
        path: '/lista',
        component: DemandsListPage,
        name: 'DemandsList',
        useAsDefault:true
    }),
    new Route({
        path: '/newDemands',
        component: NewDemandsListPage,
        name: 'NewDemandsList',
    }),
    new Route({
        path: '/detalii/:id',
        component: DemandsEditPage,
        name: 'EditDemand',
    }),
])


export class DemandsPage {

    tabPagesList:Array<Tab>;

    constructor() {
        this.tabPagesList = [{name: 'Cereri', link: 'Demands/DemandsList', enableMarker:true, markerContent: ""},
            {name: 'Cereri noi', link: 'Demands/NewDemandsList', enableMarker:false, markerContent: ""},
            // {name: 'Cereri', link: 'Categories/Requests', enableMarker:false, markerContent: ""}];
        ];
    }
}