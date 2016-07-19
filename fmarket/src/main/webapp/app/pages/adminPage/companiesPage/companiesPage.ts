/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CORE_DIRECTIVES} from "@angular/common";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CompaniesService} from "../../../services/companiesService";
import {NotificationService} from "../../../services/notificationService";
import {CreateCompanieDialog} from "../../../components/companieComponent/createCompanieDialog/createCompanieDialog";
import {DomainCompanieDto} from "../../../models/domainCompanieDto";
import {Select2Item, SelectComponent} from "../../../components/selectComponent/selectComponent";
import {CompanieAdmminListComponent} from "../../../components/companieComponent/companieListComponent/companiesAdminListComponent";
import {CompanySearchObject} from "../../../models/companySearchObject";
import {Ng2Pagination} from "../../../models/Ng2Pagination";
import {CompanieDto} from "../../../models/companieDto";
import * as _ from "underscore";
import * as template from './companiesPage.html';

@Component({
    selector: 'compnaies-Page',
    template: template,
    //styleUrls: [applicationPath + '/companiesPage.css'],
    directives: [CompanieAdmminListComponent, SelectComponent, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class CompaniesPage implements OnInit {

    //<editor-fold desc="Services">
    private _notificationService:NotificationService;
    private _companiesService:CompaniesService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _createCompanieDialog:CreateCompanieDialog;

    private _companiesList:Array<DomainCompanieDto> = new Array<DomainCompanieDto>();

    private searchFilter:CompanySearchObject = new CompanySearchObject();
    private pagination:Ng2Pagination = new Ng2Pagination();
    private _router:Router;
    private companieDomains:Array<Select2Item>;
    private domains:Array<Select2Item>;
    //</editor-fold>

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
     
        this._companiesService.getCompanyWithFilters(this.getSearchObject())
            .subscribe(
                response=> {
                    let typedResponse:ServerResponse = response as ServerResponse;
                    me._companiesList = typedResponse.data;
                    // me.pagination.currentPage = response.page;
                    me.pagination.totalItems = typedResponse.totalPages;
                    me.searchFilter['page'] = this.pagination['currentPage'];
                },
                error=> {
                    me._companiesList = [];
                    me._notificationService.emitErrorNotificationToRootComponent('Eroare companiile nu pot fi afisate!', 5);
                }
            )
    }

    getSearchObject(){
        let obj = _.clone(this.searchFilter);
        obj.name = obj.name && obj.name.length > 0 ? obj.name : null;
        obj.companyDomain = obj.companyDomain && obj.companyDomain.boundItem ? obj.companyDomain.boundItem['id'] : null; 
        obj.demandDomains = this.getDomainsFromSelect();
        obj['page'] = this.pagination['currentPage'];

        return obj;
    }

    getDomainsFromSelect(_selectedItems:Array<Select2Item>){
        return _.map(_selectedItems,(v)=>{
            if(v && v.boundItem)
                return v.boundItem['id'];
        })
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

    goToNewCompanyPage() {
        this._router.navigate(['/admin/ceeaza-companie/ceeaza']);
    }

    selectCompanie($event:CompanieDto) {
        this._router.navigate([`/admin/detalii-companie/${$event.id}`]);
    }

    removeCompanie($event:CompanieDto) {
        let me = this;
        this._companiesService.deleteCompany($event.id)
            .subscribe(result=> {
                    debugger;
                    me.getCompaniesWithFilters();
                },
                error=> {
                    debugger;
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

export interface ServerResponse {
    data: Array<DomainCompanieDto>,
    page: number,
    totalPages:number
}
