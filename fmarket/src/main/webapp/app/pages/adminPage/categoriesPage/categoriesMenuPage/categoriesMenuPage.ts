 import {Component, OnInit, Injectable} from 'angular2/core';
 import {HTTP_PROVIDERS} from 'angular2/http';

 import {MenuTreeComponent} from '../../../../components/menuComponent/menuTreeComponent';

 let applicationPath: string = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';

 @Component({
 	selector: 'companies-Page',
 	templateUrl: applicationPath + '/categoriesMenuPage.html',
 	styleUrls:[	applicationPath + '/categoriesMenuPage.css'],
	//encapsulation: ViewEncapsulation.None, 

	//providers:[RequestTypeService, HTTP_PROVIDERS], 
	directives:[MenuTreeComponent]
})

 export class CategoriesMenuPage implements OnInit {
 	menuDictionary:Array<Object> = [];


 	constructor() {
 		// code...
 	}

 	ngOnInit(){
 		this.menuDictionary = [
 		{id:12, layer:0, name:'asd'},
 		{id:13, layer:0, name:'asda'},
 		{id:14, layer:0, name:'asdd'},
 		{id:15, layer:1, parentId:13, name:'asds'},
 		{id:16, layer:1, parentId:13, name:'asdg'},
 		{id:17, layer:1, parentId:13, name:'asdxz'},
 		{id:18, layer:1, parentId:14, name:'asd1e'},
 		{id:19, layer:2, parentId:17, name:'asd1e1'},
 		{id:20, layer:2, parentId:17, name:'asd1e2'},
 		{id:21, layer:2, parentId:17, name:'asd1e3'}]
 	}
 } 