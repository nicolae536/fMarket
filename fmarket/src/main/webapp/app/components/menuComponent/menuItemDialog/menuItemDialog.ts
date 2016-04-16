/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from 'angular2/core';

import {SelectComponent} from '../../selectComponent/selectComponent';
import {NewDomainMenuItemRequest} from '../baseMenuComponent/baseMenuComponent'
import {UpdateDomainMenuItemRequest} from "../baseMenuComponent/baseMenuComponent";
import {Select2Item} from "../../selectComponent/selectComponent";
import {MenuItem} from "../baseMenuComponent/baseMenuComponent";

//used template to not download the same html multiple times
@Component({
    selector: 'menu-item-dialog',
    templateUrl: '/app/components/menuComponent/menuItemDialog/menuItemDialog.html',
    directives: [SelectComponent]
})

export class MenuItemDialog implements OnInit, OnChanges {
    @Output('modal-loaded') modalLoaded:EventEmitter<MenuItemDialog> = new EventEmitter<MenuItemDialog>();
    @Output('add-menu-item') newMenuItemEmitter:EventEmitter<NewDomainMenuItemRequest> = new EventEmitter<NewDomainMenuItemRequest>();
    @Output('update-menu-item') updateMenuItemEmitter:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
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

    items:Select2Item[];

    ngOnInit() {
        this.modalLoaded.emit(this);
        this._validForm=true;
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

    checkIfIsNumber(event){

    }

    show(newModal:IModal) {
        this.fatchModel(newModal);
        this.showModal = true;
    }

    referenceSelectComponent(select:SelectComponent) {
        this._select = select;
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
                    domainId: this._select.selectedItem.boundItem ? this._select.selectedItem.boundItem['id'] : null
                });
                break;
            case 'update':
                this.updateMenuItemEmitter.emit({id: this.id, newName: this.name, orderNr: this.orderNr});
                break;
        }
    }

    private cancelAction() {
        console.log('sending close event');
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
    }

    private fatchModel(newModal:IModal):void {
        this.parentId = newModal.parentId;
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
        this.id = newModal.id;
    }

    showErrors() {

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
}

export interface IModal {
    parentId;
    positiveLabel;
    operationType;
    id;
}

export interface IUpdateModal {
    positiveLabel;
    operationType;
    menuModel:Object;
    id;
}
