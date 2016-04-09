import {Component, OnInit, Injectable, Pipe} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {MenuTreeComponent} from '../../../../components/menuComponent/menuTreeComponent';
import {UpdateDomainMenuItemRequest,NewDomainMenuItemRequest,MenuItem} from '../../../../components/menuComponent/baseMenuComponent/baseMenuComponent';
import {CategoriesMenuService} from '../../../../services/categoriesMenuService';
import {IModal, MenuItemDialog} from "../../../../components/menuComponent/menuItemDialog/menuItemDialog";

let applicationPath:string = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/categoriesMenuPage.html',
    styleUrls: [applicationPath + '/categoriesMenuPage.css'],
    //encapsulation: ViewEncapsulation.None,

    providers: [CategoriesMenuService, HTTP_PROVIDERS],
    directives: [MenuTreeComponent, MenuItemDialog],
})

export class CategoriesMenuPage implements OnInit {
    menuDictionary:Array<Object> = [];
    private _categoriesMenuService:CategoriesMenuService;
    private _menuItemModal:MenuItemDialog;
    private _modalInterface:IModal;

    constructor(_categoriesMenuService:CategoriesMenuService) {
        this._categoriesMenuService = _categoriesMenuService;
        // code...
    }

    ngOnInit() {
        this.getMenuDictionary();
    }

    referenceModal(modal:MenuItemDialog) {
        this._menuItemModal = modal;
    }

    private getMenuDictionary():void {
        this._categoriesMenuService.getMenuDictionary()
            .map((response) => response.json())
            .subscribe(
                response => {
                    this.menuDictionary = response.data;
                },
                error => {
                    this.menuDictionary = [];
                });
        ;
    }

    selectMenuItem(menuItem:NewDomainMenuItemRequest) {
        //
    }

    addMenuItem(parentId:number) {
        this._modalInterface = {parentId: parentId, operationType: "new", positiveLabel: "Create", id: null};
        this._menuItemModal.show(this._modalInterface).then((response:NewDomainMenuItemRequest) => {
            this._categoriesMenuService.addMenuItem(response).map((response)=> {
                response.json()
            }).subscribe(
                response => {
                    this._menuItemModal.hide();
                    this.getMenuDictionary();
                },
                error=> {
                    this._menuItemModal.showErrors();
                }
            )
        });
    }

    editMenuItem(menuToUpdate:UpdateDomainMenuItemRequest) {
        let newInterface = {menuModel: menuToUpdate, operationType: "update", positiveLabel: "Update", id: null};
        this._menuItemModal.update(newInterface).then((response:UpdateDomainMenuItemRequest) => {
            this._categoriesMenuService.updateMenuItem(response).map((response)=> {
                response.json()
            }).subscribe(
                response => {
                    this._menuItemModal.hide();
                    this.getMenuDictionary();
                },
                error=> {
                    this._menuItemModal.showErrors();
                }
            )
        });
    }

    deleteMenuItem(id:number) {
        this._categoriesMenuService.deleteMenuItem(id).map((response)=> {
                response.json();
            })
            .subscribe(
                response => {
                    this.getMenuDictionary();
                }
            )
    }

}
