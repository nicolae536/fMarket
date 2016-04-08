 import {Component, OnInit, Injectable} from 'angular2/core';
 import {HTTP_PROVIDERS} from 'angular2/http';

import {BaseMenuComponent} from '../../../../components/baseMenuComponent/baseMenuComponent';
 //import {RequestType} from '../../../../models/requestType';
 //import {RequestTypeService} from '../../../../services/requestTypeService';


 let applicationPath: string = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';

 @Component({
 	selector: 'companies-Page',
 	templateUrl: applicationPath + '/categoriesMenuPage.html',
 	styleUrls:[	applicationPath + '/categoriesMenuPage.css'],
	//encapsulation: ViewEncapsulation.None, 

	//providers:[RequestTypeService, HTTP_PROVIDERS], 
	directives:[BaseMenuComponent]
})

 export class CategoriesMenuPage implements OnInit {
 	menuItems: Array<Object>;

 	constructor() {
 		// code...
 	}

 	ngOnInit(){
 		this.menuItems = new Array<Object>(
 			{id:0, displayName:"Item 0", hasChildren:true},
 			{id:1, displayName:"Item 1", hasChildren:false},
 			{id:2, displayName:"Item 2", hasChildren:false},
 			{id:3, displayName:"Item 3", hasChildren:false});
 	}
 } 