import {Component, OnInit, Injectable} from 'angular2/core';
import {Response} from "angular2/http";
import {CanActivate} from "angular2/router";
import {FORM_DIRECTIVES, FormBuilder, Validators} from "angular2/common";

import {RequestType} from '../../../../models/requestType';
import {RequestTypeService} from '../../../../services/requestTypeService';

import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";


let applicationPath:string = '/app/pages/adminPage/categoriesPage/domainsPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/domainsPage.html',
    styleUrls: [applicationPath + '/domainsPage.css'],
    directives:[FORM_DIRECTIVES],
    providers: [RequestTypeService],
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class DomainsPage implements OnInit {
    domainsTypes:Array<RequestType> = [new RequestType("", "test", 1), new RequestType("", "test", 3), new RequestType("", "test", 2)];
    searchQuery:string = "";
    showAddRequestRow:boolean;
    newRequestType:string;

    _requestTypeService:RequestTypeService;
    private _formBuilder:FormBuilder;
    private _newDomainForm;

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
        this._requestTypeService.getRequestTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.domainsTypes = response;
                },
                error => {
                    this.domainsTypes = [];
                });

    }

    addRequestType() {
        if(!this._newDomainForm.valid){
            return;
        }

        this._requestTypeService.addRequestType(this.newRequestType)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.getRequestTypesWithFilters();
                    this.newRequestType = "";
                    this.toggleAddRequestType(false);
                },
                error => {
                    //make the field red
                    //this.companieTypes = [];
                });
    }

    deleteRequestType(requestType:RequestType) {
        this._requestTypeService.deleteRequestType(requestType.id)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.domainsTypes = response;
                },
                error => {
                    this.domainsTypes = [];
                });

    }

    editRequestType(requestType:RequestType) {
        this._requestTypeService.editRequestType(requestType)
            .map((response:Response) => {
                if(response.text().length){
                    return response.json();
                }
            })
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
