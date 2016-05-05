import {Component, OnInit, Injectable} from 'angular2/core';

import {CompanieType} from '../../../../models/companieType';
import {CompanieTypeService} from '../../../../services/companieTypesService';
import {Response} from "angular2/http";
import {CanActivate} from "angular2/router";

import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";

let applicationPath:string = '/app/pages/adminPage/categoriesPage/companiesPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
    //encapsulation: ViewEncapsulation.None,

    providers: [CompanieTypeService],
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesPage implements OnInit {
    companieTypes:Array<CompanieType> = [new CompanieType("", "test", 1), new CompanieType("", "test", 3), new CompanieType("", "test", 2)];
    searchQuery:string = "";
    newDomain:string;
    showAddCompanieDomainRow:boolean;
    _companieTypeService:CompanieTypeService;

    constructor(companieTypeService:CompanieTypeService) {
        this._companieTypeService = companieTypeService;
    }

    ngOnInit() {
        this.getCompanyTypesWithFilters();
    }


    selectMenuItem(data) {

    }

    addMenuItem(data) {

    }


    getCompanyTypesWithFilters() {
        var me = this;

        this._companieTypeService.getCompanyTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me.companieTypes = response;
                },
                error => {
                    me.companieTypes = [];
                });

    }

    addCompanieDomain() {
        var me = this;

        this._companieTypeService.addCompanyType(this.newDomain)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })            .subscribe(
                response => {
                    me.getCompanyTypesWithFilters();
                    me.newDomain = "";
                    me.toggleAddCompanieDomain(false);
                },
                error => {
                    //make the field red
                    //this.companieTypes = [];
                });
    }

    deleteCompanyType(companyType:CompanieType) {
        var me = this;

        this._companieTypeService.deleteCompanyType(companyType.id)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })            .subscribe(
                response => {
                    me.getCompanyTypesWithFilters()
                },
                error => {
                    //me.companieTypes = [];
                });

    }

    editCompaniType(companyType:CompanieType) {
        var me = this;

        this._companieTypeService.editCompaniType(companyType)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })            .subscribe(
                response => {
                    companyType.isInEditMode = false;
                    //this.companieTypes = response.data;
                },
                error => {
                    //this.companieTypes = [];
                });
    }

    toggleEditMode(companyType:CompanieType) {
        companyType.isInEditMode = true;
    }

    toggleAddCompanieDomain(value:boolean) {
        this.showAddCompanieDomainRow = value;
    }
}
