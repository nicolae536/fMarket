import {Component, OnInit, Injectable} from 'angular2/core';

import {RequestType} from '../../../../models/requestType';
import {RequestTypeService} from '../../../../services/requestTypeService';


let applicationPath:string = '/app/pages/adminPage/categoriesPage/requestsPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/requestsPage.html',
    styleUrls: [applicationPath + '/requestsPage.css'],
    //encapsulation: ViewEncapsulation.None,

    providers: [RequestTypeService],
    //directives:[ActionDialog, CreateUserDialog, NgForm]
})

export class RequestsPage implements OnInit {
    requestTypes:Array<RequestType> = [new RequestType("", "test", 1), new RequestType("", "test", 3), new RequestType("", "test", 2)];
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
            .map((response) => {
                if(response._body.length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.requestTypes = response;
                },
                error => {
                    this.requestTypes = [];
                });

    }

    addRequestType() {
        this._requestTypeService.addRequestType(this.newRequestType)
            .map((response) => {
                if(response._body.length){
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
            .map((response) => {
                if(response._body.length){
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.requestTypes = response;
                },
                error => {
                    this.requestTypes = [];
                });

    }

    editRequestType(requestType:RequestType) {
        this._requestTypeService.editRequestType(requestType)
            .map((response) => {
                if(response._body.length){
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
