/**
 * Created by nick_ on 4/21/2016.
 */
import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TabHeader} from "../../models/TabHeader";

let applicationPath:string = '/app/components/tabsComponent';

@Component({
    selector: 'tabs-component',
    templateUrl: applicationPath + '/tabsComponent.html',
    styleUrls: [applicationPath + '/tabsComponent.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class TabsRoutingComponent {
    @Input('tabs-pages-list') tabPagesList:Array<TabHeader>;
    private router:Router;

    constructor(router:Router) {
        this.router = router;
    }
}