/**
 * Created by nick_ on 4/21/2016.
 */
import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Location} from "@angular/common";
import {TabHeader} from "../../models/TabHeader";

let template = require('./tabsComponent.html');

@Component({
    selector: 'tabs-component',
    template:template,
    //styleUrls: [applicationPath + '/tabsComponent.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class TabsRoutingComponent {
    @Input('tabs-pages-list') tabPagesList:Array<TabHeader>;
    private router:Router;
    private location:Location;

    constructor(router:Router, location:Location) {
        this.router = router;
        this.location = location;
    }

    checkRoute(link){
        return this.location.path().indexOf(link) !== -1 ? 'active':''
    }
}