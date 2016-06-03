import {Component, OnInit} from "@angular/core";

import {CategoriesMenuService} from "../../../../services/categoriesMenuService";

import {MenuTreeComponent} from "../../../../components/menuComponent/menuTreeComponent";
import {MenuItemDialog} from "../../../../components/menuComponent/menuItemDialog/menuItemDialog";
import {Select2Item, SelectComponent} from "../../../../components/selectComponent/selectComponent";
import {IModal} from "../../../../models/interfaces/iModal";
import {INewDomainMenuItemRequest} from "../../../../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../../../../models/interfaces/iUpdateDomainMenuItemRequest";
import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";

let applicationPath:string = '/app/pages/adminPage/categoriesPage/categoriesMenuPage';

@Component({
    selector: 'companies-Page',
    templateUrl: applicationPath + '/categoriesMenuPage.html',
    styleUrls: [applicationPath + '/categoriesMenuPage.css'],
    directives: [MenuTreeComponent, MenuItemDialog, SelectComponent],
})
export class CategoriesMenuPage implements OnInit {

    //<editor-fold desc="Services">
    private _categoriesMenuService:CategoriesMenuService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    menuDictionary:Array<Object> = [];
    private _menuItemModal:MenuItemDialog;
    private _modalInterface:IModal;
    _domains:Array<Select2Item>;
    isAdminUser = AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);
    foobarItems:Array<Select2Item>;
    //</editor-fold>

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
            .subscribe(
                response => {
                    me.menuDictionary = response;
                },
                error => {
                    me.menuDictionary = [];
                });
    }

    selectMenuItem(menuItem:INewDomainMenuItemRequest) {
        //
    }

    showAddMenuModal(parentId:number) {
        this._modalInterface = {parentId: parentId, operationType: "new", positiveLabel: "Create", id: null};
        this._menuItemModal.show(this._modalInterface);
    }

    addMenuItem(newDomainMenuItemRequest:INewDomainMenuItemRequest) {
        let me = this;
        me._categoriesMenuService.addMenuItem(newDomainMenuItemRequest)
            .subscribe(
                response=> {
                    me._menuItemModal.hide();
                    me.getMenuDictionary();
                },
                error=> {
                   // me._menuItemModal.showErrors();
                }
        );
    }

    showEditMenuModal(menuToUpdate:IUpdateDomainMenuItemRequest) {
        this._menuItemModal.update({
            operationType: "update",
            positiveLabel: "Update",
            menuModel: menuToUpdate,
            id: null
        })
    }

    editMenuItem(updateDomainMenuItemRequest:IUpdateDomainMenuItemRequest) {
        let me = this;


        me._categoriesMenuService.updateMenuItem(updateDomainMenuItemRequest)
            .subscribe(
                response=> {
                    me._menuItemModal.hide();
                    me.getMenuDictionary();
                },
                error=> {
                   // me._menuItemModal.showErrors();
                }
        );
    }

    deleteMenuItem(id:number) {
        this._categoriesMenuService.deleteMenuItem(id)
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
        this._categoriesMenuService.getDomains()
            .subscribe(
                response => {
                    me._domains = response;
                },
                error => {
                    console.log(me._domains);
                    me._domains = [];
                }
        )
    }
}
