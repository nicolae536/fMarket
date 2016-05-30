/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CORE_DIRECTIVES} from "@angular/common";
import {CreateCompanieDialog} from "../../../components/companieComponent/createCompanieDialog/createCompanieDialog";
import {CompaniesService} from "../../../services/companiesService";
import {NotificationService} from "../../../services/notificationService";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {CompanieListComponent} from "../../../components/companieComponent/companieListComponent/companieListComponent";
import * as _ from "underscore";
import {Select2Item, SelectComponent} from "../../../components/selectComponent/selectComponent";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

let applicationPath = '/app/pages/adminPage/companiesPage'
@Component({
    selector: 'compnaies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    directives: [CompanieListComponent, SelectComponent, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class CompaniesPage implements OnInit {
    private _createCompanieDialog:CreateCompanieDialog;

    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;

    private selectCompanieDomain:SelectComponent;
    private selectDomain:SelectComponent;

    private _companiesList:Array<DomainCompanieDto>;

    private searchFilter:Object = {name: "", email: "", companyDomain: "", demandDomains: "" ,page:1};
    private pagination:Object = {totalItems:1, currentPage:1, maxSize:7};
    private _router:Router;
    private companieDomains:Array<Select2Item>;
    private domains:Array<Select2Item>;

    constructor(router:Router, companiesService:CompaniesService, notificationService:NotificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._notificationService = notificationService;
    }

    ngOnInit() {
        this.getCompaniesWithFilters();
        this.getCompanieDomains();
        this.getDomains();
    }

    referenceCompaniesDialog(_createCompanieDialog:CreateCompanieDialog) {
        this._createCompanieDialog = _createCompanieDialog;
    }

    private getCompaniesWithFilters() {
        let me = this;
        this.searchFilter['page'] = this.pagination['currentPage'];

        this._companiesService.getCompanyWithFilters(this.searchFilter)
            .map(response => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response=> {
                    me._companiesList = me.splitViewInPiecesUsingScreen(response.data);
                },
                error=> {
                    me._companiesList = me.splitViewInPiecesUsingScreen(me.getMockArray());
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'danger',
                        dismisable: true,
                        message: 'Eroare companiile nu pot fi afisate!',
                        timeout: 5
                    });
                }
            )
    }

    getCompanieDomains() {
        let me = this;
        this._companiesService.getCompanieDomains()
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                success=> {
                    me.companieDomains = me._companiesService.mapNameToSelect2Item(success);
                },
                error=> {
                    me.companieDomains = new Array<Select2Item>();
                }
            );
    }

    getDomains() {
        let me = this;
        this._companiesService.getDemandDomanins()
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                success=> {
                    me.domains = me._companiesService.mapNameToSelect2Item(success);
                },
                error=> {
                    me.domains = new Array<Select2Item>();
                }
            );
    }

    referenceSelectCompanyDomainComponent($event) {
        this.selectCompanieDomain = $event;
    }

    referenceSelectDemandDomainComponent($event) {
        this.selectDomain = $event;
    }

    goToNewCompanyPage() {
        this._router.navigate(['/admin/ceeaza-companie/ceeaza']);
    }

    selectCompanie(id) {
        this._router.navigate(['/admin/detalii-companie/:id', {id: id}]);
    }

    submitSearch() {
        this.getCompaniesWithFilters();
    }

    chengeSearch($event) {
        this.getCompaniesWithFilters();
    }

    getMockArray():Array<DomainCompanieDto> {
        return [
            {
                domain: '1',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '2',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '3',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '4',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '5',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '6',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '7',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '8',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '9',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '11',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '12',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '13',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '14',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '15',
                companiesList: [

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '16',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },
            {
                domain: '17',
                companiesList: [
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },

                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpgg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    },
                    {
                        id: 1,
                        logoSrc: '/staticResorces/demoIcon.jpg'
                    }
                ]
            },

        ]
    }

    splitViewInPiecesUsingScreen(mockArray:Array<DomainCompanieDto>) {
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
