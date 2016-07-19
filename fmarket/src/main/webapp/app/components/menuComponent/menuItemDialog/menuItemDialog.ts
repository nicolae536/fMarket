/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {FORM_DIRECTIVES} from "@angular/forms";

import {SelectComponent} from '../../selectComponent/selectComponent';
import {Select2Item} from "../../selectComponent/selectComponent";
import {IUpdateModal} from "../../../models/interfaces/iUpdateModal";
import {IModal} from "../../../models/interfaces/iModal";
import {INewDomainMenuItemRequest} from "../../../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../../../models/interfaces/iUpdateDomainMenuItemRequest";

import {MenuItemForm} from "../../../models/forms/menuItem";


import * as template from './menuItemDialog.html';

//used template to not download the same html multiple times
@Component({
    selector: 'menu-item-dialog',
    template: template,    
    directives: [FORM_DIRECTIVES, SelectComponent]
})

export class MenuItemDialog implements OnInit, OnChanges {
    @Output('modal-loaded') modalLoaded:EventEmitter<MenuItemDialog> = new EventEmitter<MenuItemDialog>();
    @Output('add-menu-item') newMenuItemEmitter:EventEmitter<INewDomainMenuItemRequest> = new EventEmitter<INewDomainMenuItemRequest>();
    @Output('update-menu-item') updateMenuItemEmitter:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    
    @Input('domains-list') domainsList:Array<Select2Item>;
    
    private operationType:string;


    private menuItemFormModel:MenuItemForm = new MenuItemForm(); 

    private showModal:boolean;
    private positiveLabel:string;
    private _selectDomainComponent:SelectComponent;
    private __selectedDomainItem__:Select2Item;

    items:Select2Item[];

    constructor(){}

    ngOnInit() {
        this.modalLoaded.emit(this);
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

    show(newModal:IModal) {
        this.fatchModel(newModal);
        this.showModal = true;
    }

    update(newModal:IUpdateModal) {
        this.fatchUpdateModel(newModal);
        this.showModal = true;
    }

    submitMenuItem() {
        switch (this.operationType) {
            case 'new':
                this.newMenuItemEmitter.emit(this.menuItemFormModel.getNewMenuItemValues());
                break;
            case 'update':
                this.updateMenuItemEmitter.emit(this.menuItemFormModel.getEditMenuItemValues());
                break;
        }
    }

    /**
     * Simulate two way binding between model and component input
     */
    private rebindToModel($event:Select2Item){
        this.menuItemFormModel.domainId.value = $event && $event.boundItem ? $event.boundItem['id'] : null; 
        this.menuItemFormModel.domainId.valid = $event.boundItem !== null;
    }

    public hideModal() {
        this.menuItemFormModel = new MenuItemForm();
        this.showModal = false;
    }

    private stopPropagation($event) {
        $event.stopPropagation();
    }

    private fatchModel(newModal:IModal):void {
        this.menuItemFormModel = new MenuItemForm(newModal.id, newModal.parentId, '')
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
    }

    private fatchUpdateModel(newModal:IUpdateModal):void {
        this.menuItemFormModel = new MenuItemForm(newModal.id, null, newModal.name, newModal.orderNr)
        
        this.__selectItemById(newModal.domainId);

        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
    }

    
    private __selectItemById(domainId):void {
        var i=0;
        while(i < this.items.length){
            if(this.items[i].boundItem && this.items[i].boundItem['id'] === domainId ){
                this.__selectedDomainItem__ = this.items[i];
                return;
            }
            i++;
        }
    }
}
