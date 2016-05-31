/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CORE_DIRECTIVES} from "@angular/common";
import * as _ from "underscore";

import {CreateCompanieDialog} from "../../../components/companieComponent/createCompanieDialog/createCompanieDialog";
import {CompaniesService} from "../../../services/companiesService";
import {NotificationService} from "../../../services/notificationService";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {Select2Item, SelectComponent} from "../../../components/selectComponent/selectComponent";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CompanieAdmminListComponent} from "../../../components/companieComponent/companieListComponent/companiesAdminListComponent";
import {CompanySearchObject} from "../../../models/companySearchObject";
import {Ng2Pagination} from "../../../models/Ng2Pagination";
import {CompanieDto} from "../../../models/companieDto";

let applicationPath = '/app/pages/adminPage/companiesPage'
@Component({
    selector: 'compnaies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    directives: [CompanieAdmminListComponent, SelectComponent, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class CompaniesPage implements OnInit {
    private _createCompanieDialog:CreateCompanieDialog;

    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;

    private selectCompanieDomain:SelectComponent;
    private selectDomain:SelectComponent;

    private _companiesList:Array<DomainCompanieDto>;

    private searchFilter:CompanySearchObject = new CompanySearchObject();
    private pagination:Ng2Pagination = new Ng2Pagination();
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
            .subscribe(
                response=> {
                    me._companiesList = response.data;
                    me.pagination.currentPage = response.page;
                    me.pagination.totalItems = response.totalPages;
                },
                error=> {
                    me._companiesList = [];
                    me._notificationService.emitErrorNotificationToRootComponent('Eroare companiile nu pot fi afisate!', 5);
                }
            )
    }

    getCompanieDomains() {
        let me = this;
        this._companiesService.getCompanieDomains()
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

    selectCompanie($event:CompanieDto) {
        this._router.navigate([`/admin/detalii-companie/${$event.id}`]);
    }

    removeCompanie($event:CompanieDto){
        let me=this;
        this._companiesService.deleteCompany($event.id)
            .subscribe(result=>{
                me.getCompaniesWithFilters();
            },
            error=>{
                me._notificationService.emitErrorNotificationToRootComponent('Compania nu a putut fi stearsa !', 5);
                me.getCompaniesWithFilters();
            })
    }

    submitSearch() {
        this.getCompaniesWithFilters();
    }

    chengeSearch($event) {
        this.getCompaniesWithFilters();
    }
}
