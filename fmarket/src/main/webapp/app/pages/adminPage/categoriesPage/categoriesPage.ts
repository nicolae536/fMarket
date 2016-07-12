import {Component} from "@angular/core";

import {TabsRoutingComponent} from "../../../components/tabsComponent/tabsRoutingComponent";
import {TabHeader} from "../../../models/TabHeader";
import {CategoriesMenuPage} from "./categoriesMenuPage/categoriesMenuPage";
import {CompaniesPage} from "./companiesPage/companiesPage";
import {DomainsPage} from "./domainsPage/domainsPage";
import {ROUTER_DIRECTIVES} from "@angular/router";

let template = require('./categoriesPage.html');

@Component({
    selector: 'categoryes-page',
    template:template,
    //styleUrls: [applicationPath + '/categoriesPage.css'],
    directives: [TabsRoutingComponent, ROUTER_DIRECTIVES],
    precompile:[
        CategoriesMenuPage,
        CompaniesPage,
        DomainsPage
    ]
})

export class CategoriesPage {

    tabPagesList:Array<TabHeader>;

    constructor() {
        this.tabPagesList = [{name: 'Meniu', link: '/admin/categorii/meniu', enableMarker:false, markerContent: ""},
            {name: 'Companii', link: '/admin/categorii/firme', enableMarker:false, markerContent: ""},
            {name: 'Cereri', link: '/admin/categorii/domenii', enableMarker:false, markerContent: ""}];
    }
} 