/**
 * Created by nick_ on 4/21/2016.
 */
import {Component} from "@angular/core";

import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {TabHeader} from "../../../models/TabHeader";
import {NewDemandsListPage} from "./demandsListPage/newDemandsListPage";
import {AllDemandsListPage} from "./demandsListPage/allDemandsListPage";
import {ROUTER_DIRECTIVES} from "@angular/router";

let template = require('./demandsPage.html');

@Component({
    selector: 'demands-page',
    template:template,
    //styleUrls: [applicationPath + '/demandsPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES],
    precompile: [NewDemandsListPage, AllDemandsListPage]
})
export class DemandsPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Cereri noi', link: '/admin/cereri/newDemands', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/cereri/lista', enableMarker:true, markerContent: ""}
        ];
    }
}