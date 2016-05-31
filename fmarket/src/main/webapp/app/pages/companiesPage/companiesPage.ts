/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CORE_DIRECTIVES} from "@angular/common";
import * as _ from "underscore";
import {CompanieListComponent} from "../../components/companieComponent/companieListComponent/companieListComponent";
import {SelectComponent} from "../../components/selectComponent/selectComponent";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CompaniesService} from "../../services/companiesService";
import {NotificationService} from "../../services/notificationService";
import {Ng2Pagination} from "../../models/Ng2Pagination";
import {JqueryService} from "../../services/jqueryService";
import {ApplicationConstants} from "../../models/applicationConstansts";

let applicationPath = '/app/pages/companiesPage'
@Component({
    selector: 'compnaies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    directives: [CompanieListComponent, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class CompaniesPage implements OnInit {
    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;

    private _companiesList:Array<Object>;

    private searchFilter:string = "";
    private pagination:Ng2Pagination = new Ng2Pagination();
    private _router:Router;

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

    submitSearch() {
        this.getCompaniesWithFilters();
    }

    chengeSearch($event) {
        this.getCompaniesWithFilters();
    }

    // getMockArray():Array<DomainCompanieDto> {
    //     return [
    //         {
    //             domain: '1',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '2',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '3',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '4',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '5',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '6',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '7',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '8',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '9',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '11',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '12',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '13',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '14',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '15',
    //             companiesList: [
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '16',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '17',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpgg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '17',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpgg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //         {
    //             domain: '17',
    //             companiesList: [
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpgg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 },
    //                 {
    //                     id: 1,
    //                     logoSrc: '/staticResorces/demoIcon.jpg'
    //                 }
    //             ]
    //         },
    //
    //     ]
    // }

    splitViewInPiecesUsingScreen(mockArray:Array<Object>) {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0]['clientWidth'];

        if (screenWidth <= 767) {
            return [mockArray]
        }

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
