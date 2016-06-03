import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/common";

import {CompanieTypeService} from "../../../../services/companieTypesService";

import {CompanieType} from "../../../../models/companieType";

let applicationPath:string = '/app/pages/adminPage/categoriesPage/companiesPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/companiesPage.html',
    styleUrls: [applicationPath + '/companiesPage.css'],
})

export class CompaniesPage implements OnInit {
    //<editor-fold desc="Services">
    _companieTypeService:CompanieTypeService;
    private _formBuilder:FormBuilder;
    //</editor-fold>

    //<editor-fold desc="Variables">
    companieTypes:Array<CompanieType> = [new CompanieType("", "test", 1), new CompanieType("", "test", 3), new CompanieType("", "test", 2)];
    searchQuery:string = "";
    newDomain:string;
    showAddCompanieDomainRow:boolean;
    _newDomainForm;
    //</editor-fold>

    constructor(companieTypeService:CompanieTypeService, formBuilder:FormBuilder) {
        this._companieTypeService = companieTypeService;
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this.getCompanyTypesWithFilters();
        this._newDomainForm = this._formBuilder.group([]);
        this.buildDomainForm();
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

        if (!this._newDomainForm.valid) {
            return;
        }

        this._companieTypeService.addCompanyType(this.newDomain)
            .subscribe(
                response => {
                    me.getCompanyTypesWithFilters();
                    me.newDomain = "";
                    me.toggleAddCompanieDomain(false);
                    me.rebuildForm();
                },
                error => {
                    //make the field red
                    //this.companieTypes = [];
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
                    //this.companieTypes = response.data;
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

    toggleAddCompanieDomain(value:boolean) {
        this.showAddCompanieDomainRow = value;
        if (!value) {
            this.newDomain = '';
            this.rebuildForm();
        }
    }

    private buildDomainForm() {
        this._newDomainForm.addControl('newDomain', this._formBuilder.control(this.newDomain, Validators.compose([Validators.required, Validators.minLength(3)])));
    }

    rebuildForm() {
        this._newDomainForm.removeControl('newDomain');
        this.buildDomainForm();
    }
}
