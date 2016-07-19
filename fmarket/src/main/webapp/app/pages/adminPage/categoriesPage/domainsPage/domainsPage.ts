import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/forms";

import * as _ from 'underscore';

import {RequestTypeService} from "../../../../services/requestTypeService";
import { Field } from '../../../../models/forms/registerAccount';
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
    //</editor-fold>

    //<editor-fold desc="Variables">
    searchQuery:string = "";
    domainsTypes:Array<RequestType> = [];

    showAddRequestRow:boolean;
    newRequestType:Field = new Field('newRequestType', true, '');;
    //</editor-fold>

    constructor(requestTypeService:RequestTypeService) {
        this._requestTypeService = requestTypeService;
    }

    ngOnInit() {
        this.getRequestTypesWithFilters();
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
        this._requestTypeService.addRequestType(this.newRequestType.value)
            .subscribe(
                response => {
                    this.getRequestTypesWithFilters();
                    this.newRequestType = new Field('newRequestType', true, '');
                    this.showAddRequestRow = false;
                },
                error => {
                    //show add error
                    this.newRequestType.valid = false;
                });
    }

    deleteRequestType(requestType:RequestType) {
        this._requestTypeService.deleteRequestType(requestType.id)
            .subscribe(
                response => {
                    this.getRequestTypesWithFilters();
                },
                error => {
                    //show delete error
                });

    }

    editRequestType(requestType:RequestType) {
        let me = this;
        this._requestTypeService.editRequestType(requestType)
            .subscribe(
                response => {
                    requestType.isInEditMode = false;
                    this.getRequestTypesWithFilters();
                },
                error => {
                    this.getRequestTypesWithFilters();
                    //show edit error
                });
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

    //TODO change this when angular has a form reset method
    reinitModel(){
        this.newRequestType = new Field('newRequestType', true, '');
        this.showAddRequestRow = false;
    }
}
