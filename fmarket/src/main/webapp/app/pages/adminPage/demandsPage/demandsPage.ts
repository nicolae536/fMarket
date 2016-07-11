/**
 * Created by nick_ on 4/21/2016.
 */
import {Component} from "@angular/core";

import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {TabHeader} from "../../../models/TabHeader";
import {APPLICATION_ROUTER_DIRECTIVE} from "../../../components/applicationRouter/applicationRouter";

let template = require('./demandsPage.html');

@Component({
    selector: 'demands-page',
    template:template,
    //styleUrls: [applicationPath + '/demandsPage.css'],
    directives: [TabsRoutingComponent, APPLICATION_ROUTER_DIRECTIVE]
})
export class DemandsPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Cereri noi', link: '/admin/cereri/newDemands', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/cereri/lista', enableMarker:true, markerContent: ""}
        ];
    }
}