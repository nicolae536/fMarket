/**
 * Created by nick_ on 4/21/2016.
 */
import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Route} from "@angular/router";

import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {NewDemandsListPage} from "./demandsListPage/newDemandsListPage";
import {AllDemandsListPage} from "./demandsListPage/allDemandsListPage";
import {TabHeader} from "../../../models/TabHeader";
import {Role} from "../../../models/Roles";
import {AuthorizationService} from "../../../services/authorizationService";

let applicationPath:string = '/app/pages/adminPage/demandsPage';

@Component({
    selector: 'demands-page',
    templateUrl: applicationPath + '/demandsPage.html',
    styleUrls: [applicationPath + '/demandsPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES]
})
@Routes([
    new Route({
        path: '/newDemands',
        component: NewDemandsListPage,
    }),
    new Route({
        path: '/lista',
        component: AllDemandsListPage,
    })
])
export class DemandsPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Cereri noi', link: '/admin/cereri/newDemands', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/cereri/lista', enableMarker:true, markerContent: ""},
            // {name: 'Cereri', link: 'Categories/Requests', enableMarker:false, markerContent: ""}];
        ];
    }
}