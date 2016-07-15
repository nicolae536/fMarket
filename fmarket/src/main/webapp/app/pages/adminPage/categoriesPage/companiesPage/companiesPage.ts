import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/forms";

import { Field } from "../../../../models/forms/registerAccount";
import {CompanieTypeService} from "../../../../services/companieTypesService";

import {CompanieType} from "../../../../models/companieType";

import * as template from './companiesPage.html';

@Component({
    selector: 'companies-Page',
    template:template,
    directives: [FORM_DIRECTIVES]
    //styleUrls: [applicationPath + '/companiesPage.css'],
})

export class CompaniesPage implements OnInit {
    //<editor-fold desc="Services">
    _companieTypeService:CompanieTypeService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    companieTypes:Array<CompanieType> = [new CompanieType("", "test", 1), new CompanieType("", "test", 3), new CompanieType("", "test", 2)];
    searchQuery:string = "";
    newDomain:Field = new Field('newDomain', true, '');
    showAddCompanieDomainRow:boolean;
    _newDomainForm;
    //</editor-fold>

    constructor(companieTypeService:CompanieTypeService) {
        this._companieTypeService = companieTypeService;
    }

    ngOnInit() {
        this.getCompanyTypesWithFilters();
    }

    getCompanyTypesWithFilters() {
        var me = this;

        this._companieTypeService.getCompanyTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
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

        this._companieTypeService.addCompanyType(this.newDomain.value)
            .subscribe(
                response => {
                    me.reinitModel();
                    me.getCompanyTypesWithFilters();                    
                },
                error => {
                    //make the field red show add error
                    this.newDomain.valid = false;
                });
    }

    deleteCompanyType(companyType:CompanieType) {
        var me = this;

        this._companieTypeService.deleteCompanyType(companyType.id)
            .subscribe(
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
            .subscribe(
                response => {
                    companyType.isInEditMode = false;
                    me.getCompanyTypesWithFilters()
                },
                error => {
                    //this.companieTypes = [];
                });
    }

    toggleEditMode(companyType:CompanieType) {
        companyType.isInEditMode = true;
        companyType.companieTypeBackup = JSON.parse(JSON.stringify(companyType));
    }

    revertEdit(companieType:CompanieType){
        companieType.isInEditMode = false;
        companieType.id = companieType.companieTypeBackup.id;
        companieType.companies_no = companieType.companieTypeBackup.companies_no;
        companieType.name = companieType.companieTypeBackup.name;

    }

    //TODO change this when angular has a form reset method
    reinitModel(){
        this.newDomain = new Field('newDomain', true, '');
        this.showAddCompanieDomainRow = false;
    }
}
