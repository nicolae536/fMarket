/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CORE_DIRECTIVES} from "@angular/common";
import * as _ from "underscore";
import {CompanieListComponent} from "../../components/companieComponent/companieListComponent/companieListComponent";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CompaniesService} from "../../services/companiesService";
import {NotificationService} from "../../services/notificationService";
import {Ng2Pagination} from "../../models/Ng2Pagination";

let template = require('./companiesPage.html');

@Component({
    selector: 'compnaies-Page',
    template:template,
    directives: [CompanieListComponent, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class CompaniesPage implements OnInit {
    //<editor-fold desc="Services">
    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;
    private _router:Router;

    //</editor-fold>

    //<editor-fold desc="Variables">
    private _companiesList:Array<Object>;
    private searchFilter:string = "";
    //</editor-fold">

    constructor(router:Router, companiesService:CompaniesService, notificationService:NotificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }

    ngOnInit() {
        this.getCompaniesWithFilters();
        this._notificationService.removeLoading();
    }

    private getCompaniesWithFilters() {
        let me = this;

        this._companiesService.getCompaniesForUsers(this.searchFilter)
            .subscribe(
                response=> {
                    me._companiesList = me.splitViewInPiecesUsingScreen(response);
                },
                error=> {
                    me._companiesList = [];
                    me._notificationService.emitErrorNotificationToRootComponent('Eroare companiile nu pot fi afisate!', 5);
                }
            )
    }

    selectCompanie($event) {
        // this._router.navigate([`/admin/detalii-companie/${$event.id}`]);
    }

    splitViewInPiecesUsingScreen(mockArray:Array<Object>) {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0]['clientWidth'];

        // if (screenWidth <= 767) {
        //     return [mockArray]
        // }

        let index = 0;
        let realIndex = 0;
        let collector = [];
        let columns = Math.round(mockArray.length / 4);

        _.each(mockArray, (value, name)=> {
            if (realIndex == columns) {
                index++;
                realIndex = 0;
            }

            if (!collector[index]) {
                collector[index] = [];
            }

            collector[index].push(value);
            realIndex++;
        });

        return collector;
    }
}
