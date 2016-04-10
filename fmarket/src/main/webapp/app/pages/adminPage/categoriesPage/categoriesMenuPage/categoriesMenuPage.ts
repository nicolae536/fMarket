import {Component, OnInit, Injectable, Pipe} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {MenuTreeComponent} from '../../../../components/menuComponent/menuTreeComponent';
import {UpdateDomainMenuItemRequest,NewDomainMenuItemRequest,MenuItem} from '../../../../components/menuComponent/baseMenuComponent/baseMenuComponent';
import {CategoriesMenuService} from '../../../../services/categoriesMenuService';
import {IModal, MenuItemDialog} from "../../../../components/menuComponent/menuItemDialog/menuItemDialog";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";

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
    _domains:Array<Select2Item>;

    constructor(_categoriesMenuService:CategoriesMenuService) {
        this._categoriesMenuService = _categoriesMenuService;
        // code...
    }

    ngOnInit() {
        this.getMenuDictionary();
        this.getDomains();
    }

    referenceModal(modal:MenuItemDialog) {
        this._menuItemModal = modal;
    }

    private getMenuDictionary():void {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .map((response) => {
                if (response._body.length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me.menuDictionary = response;
                },
                error => {
                    me.menuDictionary = [];
                });
    }

    selectMenuItem(menuItem:NewDomainMenuItemRequest) {
        //
    }

    showAddMenuModal(parentId:number) {
        this._modalInterface = {parentId: parentId, operationType: "new", positiveLabel: "Create", id: null};
        this._menuItemModal.show(this._modalInterface);
    }

    addMenuItem(response:NewDomainMenuItemRequest) {
        let me = this;
        me._categoriesMenuService.addMenuItem(response).map((response)=> {
            if (response._body.length > 0) {
                return response.json();
            }
        }).subscribe(
            response=> {
                me._menuItemModal.hide();
                me.getMenuDictionary();
            },
            error=> {
                me._menuItemModal.showErrors();
            }
        );
    }

    showEditMenuModal(menuToUpdate:UpdateDomainMenuItemRequest) {
        let newInterface = {menuModel: menuToUpdate, operationType: "update", positiveLabel: "Update", id: null};
        this._menuItemModal.update(newInterface)
    }

    editMenuItem(response:UpdateDomainMenuItemRequest) {
        let me = this;


        me._categoriesMenuService.updateMenuItem(response).map((response)=> {
            if (response._body.length > 0) {
                return response.json();
            }
        }).subscribe(
            response=> {
                me._menuItemModal.hide();
                me.getMenuDictionary();
            },
            error=> {
                me._menuItemModal.showErrors();
            }
        );
    }

    deleteMenuItem(id:number) {
        this._categoriesMenuService.deleteMenuItem(id).map((response)=> {
                if (response._body.length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    this.getMenuDictionary();
                },
                errod=> {
                }
            )
    }

    getDomains():void {
        var me = this;
        this._categoriesMenuService.getDomains().subscribe(
            response => {
                console.log(response);
                me._domains = response.json();
            },
            error => {
                console.log(me._domains);
                me._domains = [];
            }
        )
    }
}

interface DomainName {
    id;
    name;
}
