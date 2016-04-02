import {Component, OnInit, Injectable} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {CompanieType} from '../../../../models/companieType';
import {CompanieTypeService} from '../../../../services/companieTypesService';


let applicationPath: string = '/app/pages/adminPage/categoriesPage/companiesPage';

@Component({
	selector: 'companies-Page',
	templateUrl: applicationPath + '/companiesPage.html',
	styleUrls:[	applicationPath + '/companiesPage.css'],
	//encapsulation: ViewEncapsulation.None, 

	providers:[CompanieTypeService, HTTP_PROVIDERS], 
	//directives:[ActionDialog, CreateUserDialog, NgForm]
})

export class CompaniesPage implements OnInit {
	companieTypes:Array<CompanieType> = new Array(new CompanieType("", "test",1),new CompanieType("", "test",3),new CompanieType("", "test",2));
	searchQuery: string = "";

	_companieTypeService:CompanieTypeService

	constructor(companieTypeService:CompanieTypeService) {
		this._companieTypeService = companieTypeService;
	}

	ngOnInit(){
		this.getCompanyTypesWithFilters();
	}

	getCompanyTypesWithFilters(){
		this._companieTypeService.getCompanyTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
		.map((response) => response.json())
		.subscribe(
			response => {
				this.companieTypes = response.data;
			},
			error => {
				this.companieTypes = [];
			});

	}

	deleteCompanyType(companyType:CompanieType){
		this._companieTypeService.deleteCompanyType(companyType.id)
		.map((response) => response.json())
		.subscribe(
			response => {
				this.companieTypes = response.data;
			},
			error => {
				this.companieTypes = [];
			});
			
	}

	editCompaniType(companyType:CompanieType){
		this._companieTypeService.editCompaniType(companyType)
		.map((response) => response.json())
		.subscribe(
			response => {
				companyType.isInEditMode = false;
				companyType
				//this.companieTypes = response.data;
			},
			error => {
				//this.companieTypes = [];
			});
	}

	toggleEditMode(companyType:CompanieType){
		companyType.isInEditMode = true;
	}
}
