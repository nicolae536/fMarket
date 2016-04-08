import {Component, OnInit, Injectable} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {MenuTreeComponent} from '../../../../components/menuComponent/menuTreeComponent';
import {MenuData,MenuItem} from '../../../../components/menuComponent/baseMenuComponent/baseMenuComponent';
import {CategoriesMenuService} from '../../../../services/categoriesMenuService';


let applicationPath:string = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/categoriesMenuPage.html',
    styleUrls: [applicationPath + '/categoriesMenuPage.css'],
    //encapsulation: ViewEncapsulation.None,

    providers: [CategoriesMenuService, HTTP_PROVIDERS],
    directives: [MenuTreeComponent]
})

export class CategoriesMenuPage implements OnInit {
    menuDictionary:Array<Object> = [];
    private _categoriesMenuService:CategoriesMenuService;


    constructor(_categoriesMenuService:CategoriesMenuService) {
        this._categoriesMenuService = _categoriesMenuService;
        // code...
    }

    ngOnInit() {
        this.menuDictionary = [
            {id: 12, layer: 0, name: 'asd'},
            {id: 13, layer: 0, name: 'asda'},
            {id: 14, layer: 0, name: 'asdd'},
            {id: 15, layer: 1, parentId: 13, name: 'asds'},
            {id: 16, layer: 1, parentId: 13, name: 'asdg'},
            {id: 17, layer: 1, parentId: 13, name: 'asdxz'},
            {id: 18, layer: 1, parentId: 14, name: 'asd1e'},
            {id: 19, layer: 2, parentId: 17, name: 'asd1e1'},
            {id: 20, layer: 2, parentId: 17, name: 'asd1e2'},
            {id: 21, layer: 2, parentId: 17, name: 'asd1e3'}];
        this.getMenuDictionary();
    }

    selectMenuItem(menuItem:MenuData) {
        //
    }

    addMenuItem(menuItem:MenuData) {
        this._categoriesMenuService.addMenuItem(menuItem);
    }

    private getMenuDictionary():void {
        this._categoriesMenuService.getMenuDictionary()
            .map((response) => response.json())
            .subscribe(
                response => {
                    this.menuDictionary = response.data;
                },
                error => {
                    //this.menuDictionary = [];
                });;
    }
}