 import {Component, OnInit, Injectable} from 'angular2/core';
 import {HTTP_PROVIDERS} from 'angular2/http';

 import {RequestType} from '../../../../models/requestType';
 import {RequestTypeService} from '../../../../services/requestTypeService';


 let applicationPath: string = '/app/pages/adminPage/categoriesPage/companiesPage';

 @Component({
 	selector: 'companies-Page',
 	templateUrl: applicationPath + '/companiesPage.html',
 	styleUrls:[	applicationPath + '/companiesPage.css'],
	//encapsulation: ViewEncapsulation.None, 

	providers:[RequestTypeService, HTTP_PROVIDERS], 
	//directives:[ActionDialog, CreateUserDialog, NgForm]
})

 export class RequestsPage implements OnInit {
 	requestTypes:Array<RequestType> = new Array(new RequestType("", "test",1),new RequestType("", "test",3),new RequestType("", "test",2));
 	searchQuery: string = "";

 	_requestTypeService:RequestTypeService

 	constructor(requestTypeService:RequestTypeService) {
 		this._requestTypeService = requestTypeService;
 	}

 	ngOnInit(){
 		this.getRequestTypesWithFilters();
 	}

 	getRequestTypesWithFilters(){
 		this._requestTypeService.getRequestTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
 		.map((response) => response.json())
 		.subscribe(
 			response => {
 				this.requestTypes = response.data;
 			},
 			error => {
 				this.requestTypes = [];
 			});

 	}

 	//addRequestType()

 	deleteRequestType(requestType:RequestType){
 		this._requestTypeService.deleteRequestType(requestType.id)
 		.map((response) => response.json())
 		.subscribe(
 			response => {
 				this.requestTypes = response.data;
 			},
 			error => {
 				this.requestTypes = [];
 			});
 		
 	}

 	editRequestType(requestType:RequestType){
 		this._requestTypeService.editRequestType(requestType)
 		.map((response) => response.json())
 		.subscribe(
 			response => {
 				requestType.isInEditMode = false;
 				requestType
				//this.companieTypes = response.data;
			},
			error => {
				//this.companieTypes = [];
			});
 	}

 	toggleEditMode(requestType:RequestType){
 		requestType.isInEditMode = true;
 	}
 }
