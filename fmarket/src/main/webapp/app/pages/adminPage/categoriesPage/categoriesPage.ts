import {Component} from "@angular/core";

import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {TabHeader} from "../../../models/TabHeader";
import {APPLICATION_ROUTER_DIRECTIVE} from "../../../components/applicationRouter/applicationRouter";

let template = require('./categoriesPage.html');

@Component({
    selector: 'categoryes-page',
    template:template,
    //styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [TabsRoutingComponent, APPLICATION_ROUTER_DIRECTIVE]
})

export class CategoriesPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Meniu', link: '/admin/categorii/meniu', enableMarker:false, markerContent: ""},
            {name: 'Companii', link: '/admin/categorii/firme', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/categorii/domenii', enableMarker:false, markerContent: ""}];
    }
} 