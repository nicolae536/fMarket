import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/common";

import {RequestTypeService} from "../../../../services/requestTypeService";

import {RequestType} from "../../../../models/requestType";
import * as template from './domainsPage.html';

@Component({
    selector: 'companies-Page',
    template:template,
    //styleUrls: [applicationPath + '/domainsPage.css'],
    directives:[FORM_DIRECTIVES]
})

export class DomainsPage implements OnInit {

    //<editor-fold desc="Services">
    _requestTypeService:RequestTypeService;
    private _formBuilder:FormBuilder;
    //</editor-fold>

    //<editor-fold desc="Variables">
    searchQuery:string = "";
    domainsTypes:Array<RequestType> = [];

    showAddRequestRow:boolean;
    newRequestType:string;
    private _newDomainForm;
    //</editor-fold>

    constructor(requestTypeService:RequestTypeService, formBuilder:FormBuilder) {
        this._requestTypeService = requestTypeService;
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this._newDomainForm = this._formBuilder.group([]);
        this.getRequestTypesWithFilters();
        this.buildForm();
    }

    getRequestTypesWithFilters() {
        let me = this;

        this._requestTypeService.getRequestTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
            .subscribe(
                response => {
                    me.domainsTypes = response as Array<RequestType>;
                },
                error => {
                    me.domainsTypes = [];
                });

    }

    addRequestType() {
        if(!this._newDomainForm.valid){
            return;
        }
        let me = this;

        this._requestTypeService.addRequestType(this.newRequestType)
            .subscribe(
                response => {
                    me.getRequestTypesWithFilters();
                    me.newRequestType = "";
                    me.toggleAddRequestType(false);
                },
                error => {
                    //make the field red
                    //this.companieTypes = [];
                });
    }

    deleteRequestType(requestType:RequestType) {
        let me = this;

        this._requestTypeService.deleteRequestType(requestType.id)
            .subscribe(
                response => {
                    me.domainsTypes = response as Array<RequestType>;
                    me.getRequestTypesWithFilters();
                },
                error => {
                    me.getRequestTypesWithFilters();
                });

    }

    editRequestType(requestType:RequestType) {
        let me = this;
        this._requestTypeService.editRequestType(requestType)
            .subscribe(
                response => {
                    requestType.isInEditMode = false;
                    //this.companieTypes = response.data;
                },
                error => {
                    //this.companieTypes = [];
                });
    }

    toggleAddRequestType(value) {
        this.showAddRequestRow = value;

        if(!value){
            this.rebuildForm();
        }
    }

    toggleEditMode(requestType:RequestType) {
        requestType.isInEditMode = true;
        requestType.backupRequestType = JSON.parse(JSON.stringify(requestType));
    }

    revertEdit(requestType:RequestType){
        requestType.isInEditMode = false;
        requestType.id = requestType.backupRequestType.id;
        requestType.companies = requestType.backupRequestType.companies;
        requestType.name = requestType.backupRequestType.name;

    }

    private rebuildForm() {
        this._newDomainForm.removeControl('newRequestType');
        this.buildForm();
    }

    private buildForm() {
        this._newDomainForm.addControl('newRequestType', this._formBuilder.control(this.newRequestType, Validators.compose([Validators.required, Validators.minLength(3)])));
    }
}
