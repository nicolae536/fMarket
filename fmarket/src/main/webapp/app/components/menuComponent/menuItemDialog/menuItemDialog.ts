/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, Validators, FORM_DIRECTIVES} from "@angular/common";

import {SelectComponent} from '../../selectComponent/selectComponent';
import {Select2Item} from "../../selectComponent/selectComponent";
import {IUpdateModal} from "../../../models/interfaces/iUpdateModal";
import {IModal} from "../../../models/interfaces/iModal";
import {INewDomainMenuItemRequest} from "../../../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../../../models/interfaces/iUpdateDomainMenuItemRequest";
import {CustomValidators} from "../../../models/Angular2ExtensionValidators";

let template = require('./menuItemDialog.html');

//used template to not download the same html multiple times
@Component({
    selector: 'menu-item-dialog',
    template:template,
    styles:[`
        .ng-dirty.ng-invalid.ng-touched {
            border-color: #ab2424;
        
        }
        
        .ng-dirty.ng-invalid.ng-touched:focus {
            border-color: #ab2424;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px #ab2424;
        }
    `],
    directives: [FORM_DIRECTIVES, SelectComponent]
})

export class MenuItemDialog implements OnInit, OnChanges {
    @Output('modal-loaded') modalLoaded:EventEmitter<MenuItemDialog> = new EventEmitter<MenuItemDialog>();
    @Output('add-menu-item') newMenuItemEmitter:EventEmitter<INewDomainMenuItemRequest> = new EventEmitter<INewDomainMenuItemRequest>();
    @Output('update-menu-item') updateMenuItemEmitter:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Input('domains-list') domainsList:Array<Select2Item>;

    private id:string;
    private parentId:number;
    private operationType:string;
    private name:string;
    private orderNr:string;

    private showModal:boolean;
    private positiveLabel:string;
    private _select:SelectComponent;
    private _validForm:boolean;
    _menuItem;

    items:Select2Item[];
    private _formBuilder:FormBuilder;

    constructor(formBuilder:FormBuilder){
        this._formBuilder = formBuilder;
        this._menuItem = this._formBuilder.group([]);
    }

    ngOnInit() {
        this.modalLoaded.emit(this);
        this._validForm=true;
        this.buildMenuItemForm();
    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('domainsList') && this.domainsList) {
            this.items = this.domainsList.map((domain)=> {
                return {
                    displayName: domain['name'],
                    boundItem: domain
                };
            })
        }
    }

    submitMenuItem(){
        if(!this._menuItem.valid){
            return;
        }

        this.positiveAction();
    }

    show(newModal:IModal) {
        this.fatchModel(newModal);
        this.showModal = true;
    }

    referenceSelectComponent(select:SelectComponent) {
        this._select = select;

        //build the form only when component is ready
    }

    update(newModal:IUpdateModal) {
        this.fatchUpdateModel(newModal);
        this.showModal = true;
    }


    hide() {
        this.clearModal();
        this.showModal = false;
    }

    positiveAction() {
        switch (this.operationType) {
            case 'new':
                this.newMenuItemEmitter.emit({
                    parentId: this.parentId,
                    name: this.name,
                    orderNr: this.orderNr,
                    domainId: this._select._selectedItem.boundItem ? this._select._selectedItem.boundItem['id'] : null
                });
                break;
            case 'update':
                this.updateMenuItemEmitter.emit({id: this.id, newName: this.name, orderNr: this.orderNr});
                break;
        }
    }

    private cancelAction() {
        this.clearModal();
        this.showModal = false;
    }

    private stopPropagation($event) {
        $event.stopPropagation();
    }

    private clearModal():void {
        this.parentId = -1;
        this.id = "";
        this.name = "";
        this.orderNr = "";
        this._select.selectItem(this._select._chooseItemValue);

        this.rebuildFormControls();
    }

    private fatchModel(newModal:IModal):void {
        this.parentId = newModal.parentId;
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
        this.id = newModal.id;
    }

    private fatchUpdateModel(newModal:IUpdateModal):void {
        this.id = newModal.menuModel['id'];
        this.name = newModal.menuModel['name'];
        this.orderNr = newModal.menuModel['orderNr'];
        this.selectItemById(newModal.menuModel['domainId']);

        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
    }

    selectItemById(domainId):void {
        var i=0;
        while(i<this.items.length){
            if(this.items[i].boundItem && this.items[i].boundItem['id'] === domainId ){
                this._select._selectedItem = this.items[i];
                return;
            }
            i++;
        }
    }

    private buildMenuItemForm() {
        this._menuItem.addControl('orderNr',this._formBuilder.control(this.orderNr,Validators.compose([Validators.required, CustomValidators.validateInteger])));
        this._menuItem.addControl('name',this._formBuilder.control(this.orderNr,Validators.compose([Validators.required, Validators.minLength(3)])));
    }

    private rebuildFormControls() {
        this._menuItem.removeControl('orderNr');
        this._menuItem.removeControl('name');
        this.buildMenuItemForm();
    }
}
