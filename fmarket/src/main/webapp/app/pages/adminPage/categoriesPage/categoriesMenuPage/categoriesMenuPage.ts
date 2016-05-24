import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {CanActivate} from "@angular/router-deprecated";

import {MenuTreeComponent} from "../../../../components/menuComponent/menuTreeComponent";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
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
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CategoriesMenuPage implements OnInit {
    menuDictionary:Array<Object> = [];
    private _categoriesMenuService:CategoriesMenuService;
    private _menuItemModal:MenuItemDialog;
    private _modalInterface:IModal;
    _domains:Array<Select2Item>;
    isAdminUser = AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);
    foobarItems:Array<Select2Item>;

    constructor(_categoriesMenuService:CategoriesMenuService) {
        this._categoriesMenuService = _categoriesMenuService;
        // code...
    }

    ngOnInit() {
        this.getMenuDictionary();
        this.getDomains();
    }

    referenceSelectComponent(select){

    }

    referenceModal(modal:MenuItemDialog) {
        this._menuItemModal = modal;
    }

    private getMenuDictionary():void {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
