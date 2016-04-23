import {Component, OnInit, Injectable} from 'angular2/core';

import {RequestType} from '../../../../models/requestType';
import {RequestTypeService} from '../../../../services/requestTypeService';
import {Response} from "angular2/http";


let applicationPath:string = '/app/pages/adminPage/categoriesPage/domainsPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/domainsPage.html',
    styleUrls: [applicationPath + '/domainsPage.css'],
    providers: [RequestTypeService],
})

export class DomainsPage implements OnInit {
    domainsTypes:Array<RequestType> = [new RequestType("", "test", 1), new RequestType("", "test", 3), new RequestType("", "test", 2)];
    searchQuery:string = "";
    showAddRequestRow:boolean;
    newRequestType:string;

    _requestTypeService:RequestTypeService;

    constructor(requestTypeService:RequestTypeService) {
        this._requestTypeService = requestTypeService;
    }

    ngOnInit() {
        this.getRequestTypesWithFilters();
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
    }

    toggleEditMode(requestType:RequestType) {
        requestType.isInEditMode = true;
    }
}
