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

let template = require('./categoriesMenuPage.html');

@Component({
    selector: 'companies-Page',
    template:template,
    //styleUrls: [applicationPath + '/categoriesMenuPage.css'],
    directives: [MenuTreeComponent, MenuItemDialog, SelectComponent],
})
export class CategoriesMenuPage implements OnInit {

    //<editor-fold desc="Services">
    private _categoriesMenuService:CategoriesMenuService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    menuDictionary:Array<Object> = [];
    private _menuItemModalComponent:MenuItemDialog;
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

    referenceModal(menuItemModalComponent:MenuItemDialog) {
        this._menuItemModalComponent = menuItemModalComponent;
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
        console.log('Parent id'+parentId);
        this._modalInterface = {parentId: parentId, operationType: "new", positiveLabel: "Create", id: null};
        this._menuItemModalComponent.show(this._modalInterface);
    }

    addMenuItem(newDomainMenuItemRequest:INewDomainMenuItemRequest) {
        let me = this;
        me._categoriesMenuService.addMenuItem(newDomainMenuItemRequest)
            .subscribe(
                response=> {
                    me._menuItemModalComponent.hideModal();
                    me.getMenuDictionary();
                },
                error=> {
                   // me._menuItemModal.showErrors();
                }
        );
    }

    showEditMenuModal(menuToUpdate:IUpdateDomainMenuItemRequest) {
        this._menuItemModalComponent.update({
            operationType: "update",
            positiveLabel: "Update",
            domainId: menuToUpdate.domainId,
            id: menuToUpdate.id,
            orderNr: menuToUpdate.orderNr,
            name: menuToUpdate.newName
        })
    }

    editMenuItem(updateDomainMenuItemRequest:IUpdateDomainMenuItemRequest) {
        let me = this;

        me._categoriesMenuService.updateMenuItem(updateDomainMenuItemRequest)
            .subscribe(
                response=> {
                    me._menuItemModal.hideModal();
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
                    me._domains = [];
                }
        )
    }
}
