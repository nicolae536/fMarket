/**
 * Created by nick_ on 4/21/2016.
 */
import {Component} from '@angular/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, CanActivate} from '@angular/router-deprecated';

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
@CanActivate(()=>{    return AuthorizationService.hasRole(Role.ADMIN) && AuthorizationService.isLoggedIn();})
@RouteConfig([
    new Route({
        path: '/newDemands',
        component: NewDemandsListPage,
        name: 'NewDemandsList',
        useAsDefault:true
    }),
    new Route({
        path: '/lista',
        component: AllDemandsListPage,
        name: 'DemandsList',
    })
])


export class DemandsPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Cereri noi', link: 'Demands/NewDemandsList', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: 'Demands/DemandsList', enableMarker:true, markerContent: ""},
            // {name: 'Cereri', link: 'Categories/Requests', enableMarker:false, markerContent: ""}];
        ];
    }
}