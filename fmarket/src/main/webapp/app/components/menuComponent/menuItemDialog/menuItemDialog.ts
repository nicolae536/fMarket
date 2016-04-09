/**
 * Created by nick_ on 4/9/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from 'angular2/core';
import {SelectComponent} from '../../selectComponent/selectComponent';

import {NewDomainMenuItemRequest} from '../baseMenuComponent/baseMenuComponent'
import {UpdateDomainMenuItemRequest} from "../baseMenuComponent/baseMenuComponent";
//used template to not download the same html multiple times
@Component({
    selector: 'menu-item-dialog',
    templateUrl:'/app/components/menuComponent/menuItemDialog/menuItemDialog.html',
    directives:[SelectComponent]
})

export class MenuItemDialog implements OnInit{
    @Output('modal-loaded') modalLoaded:EventEmitter<MenuItemDialog> = new EventEmitter<MenuItemDialog>();

    id:string;
    parentId:number;
    operationType:string;
    name:string;
    orderNr:string;
    domainId:number;

    showModal:boolean;
    positiveLabel:string;
    cancelLabel = 'Cancel';
    deferendModal:PromiseInterface;
    selectItems;
    selectedItem;
    ngOnInit(){
        this.modalLoaded.emit(this);
        this.selectItems = [
            {displayName:'Amsterdam', boundItem:{}},
            {displayName:'Antwerp', boundItem:{}},
            {displayName:'Athens', boundItem:{}},
            {displayName:'Barcelona', boundItem:{}},
            {displayName:'Berlin', boundItem:{}},
            {displayName:'Antwerp', boundItem:{}},
            {displayName:'Athens', boundItem:{}},
            {displayName:'Barcelona', boundItem:{}},
            {displayName:'Berlin', boundItem:{}},
            {displayName:'Antwerp', boundItem:{}},
            {displayName:'Athens', boundItem:{}},
            {displayName:'Barcelona', boundItem:{}},
            {displayName:'Berlin', boundItem:{}},
            {displayName:'Antwerp', boundItem:{}},
            {displayName:'Athens', boundItem:{}},
            {displayName:'Barcelona', boundItem:{}},
            {displayName:'Berlin', boundItem:{}},
            {displayName:'Antwerp', boundItem:{}},
            {displayName:'Athens', boundItem:{}},
            {displayName:'Barcelona', boundItem:{}},
            {displayName:'Berlin', boundItem:{}}];
        this.selectedItem = this.selectItems[0];
    }

    show(newModal:IModal){
        this.fatchModel(newModal);
        this.showModal = true;
        return new Promise((resolve, reject)=> {
            this.deferendModal={resolve: resolve, reject:reject};
        });
    }

    update(newModal:IUpdateModal){
        this.fatchUpdateModel(newModal);
        this.showModal = true;
        return new Promise((resolve, reject)=> {
            this.deferendModal.resolve = resolve;
            this.deferendModal.reject = reject;
        });
    }


    hide(){
        this.clearModal();
        this.showModal = false;
        this.deferendModal.reject();
    }

    positiveAction(){
        switch (this.operationType){
            case 'new':
                this.deferendModal.resolve({parentId:this.parentId, name:this.name, orderNr:this.orderNr, domainId:this.domainId})
                break;
            case 'update':
                this.deferendModal.resolve({id:this.id, newName:this.name, orderNr:this.orderNr});
                break;
        }
    }

    private cancelAction() {
        console.log('sending close event');
        this.showModal = false;
        this.deferendModal.reject();
    }

    private stopPropagation($event) {
        $event.stopPropagation();
    }

    private clearModal():void {
        this.parentId = -1;
        this.id = "";
        this.name = "";
        this.orderNr = "";
        this.domainId = -1;
    }

    private fatchModel(newModal:IModal):void {
        this.parentId = newModal.parentId;
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
        this.id = newModal.id;
    }

    showErrors():void {
        
    }

    private fatchUpdateModel(newModal:IUpdateModal):void {
        this.id = newModal.menuModel.id;
        this.name = newModal.menuModel.newName;
        this.orderNr = newModal.menuModel.orderNr;

        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
    }

    private value:any = {};
    private _disabledV:string = '0';
    private disabled:boolean = false;


    private get disabledV():string {
        return this._disabledV;
    }

    private set disabledV(value:string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    private selected(value:any) {
        console.log('Selected value is: ', value);
    }

    private removed(value:any) {
        console.log('Removed value is: ', value);
    }

    private typed(value:any) {
        console.log('New search input: ', value);
    }

    private refreshValue(value:any) {
        this.value = value;
    }
}

export interface IModal{
    parentId;
    positiveLabel;
    operationType;
    id;
}

export interface IUpdateModal{
    positiveLabel;
    operationType;
    menuModel:UpdateDomainMenuItemRequest
}

interface PromiseInterface{
    resolve;
    reject;
}