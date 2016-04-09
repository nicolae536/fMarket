import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {OnChanges} from "../../../../node_modules/angular2/ts/src/core/linker/interfaces";

//used template to not download the same html multiple times
@Component({
    selector: 'base-menu',
    template: `
	<div class="base-menu-component">
		<ul class="nav nav-pills nav-stacked">
			<li *ngFor="#item of menuItemsList" [class]="getItemClass(item)" (click)="selectItem(item)">
				<a>
				    <div class="pull-right">
				        <span class="glyphicon glyphicon-plus" (click)="createSubMenu(item.id)"></span>
				        <span class="glyphicon glyphicon-pencil" (click)="editMenuItem(item)"></span>
				        <span class="glyphicon glyphicon-remove" (click)="removeMenuItem(item.id)"></span>
				    </div>
				    {{item.name}}
				</a>
			</li>
			<div class="operations-label">
			    <button class="btn btn-success" (click)="addNewMenuItem()">
			        <span class="glyphicon glyphicon-plus"></span>
			    </button>
			</div>
		</ul>
	</div>
	`,
    styles: [`
        .base-menu-component .nav.nav-pills.nav-stacked .operations-label{
            width:100%;
        }

		.base-menu-component .nav.nav-pills.nav-stacked .btn.btn-success{
			height:34px;
			width:100%;
		}

		.base-menu-component .nav.nav-pills.nav-stacked .input-group{
			padding-bottom:5px;
		}
	`]
})

export class BaseMenuComponent{
    @Input('menu-items-list') menuItemsList:Array<MenuItem>;
    @Input('menu-layer') menuLayer:number;
    @Output('select-menu-item') broadcastMenuItem:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
    @Output('add-new-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-submenu') broadcastUpdateItem:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
    @Output('delete-submenu') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();

    selectedItem:MenuItem;

    constructor() {
    }

    getItemClass(menuItem) {
        let cssClass = '';
        if(this.selectedItem == menuItem){
            cssClass += 'active '
        }

        if (menuItem.domainId == ''){
            cssClass += 'domain-marker'
        }

        return cssClass;
    }

    addNewMenuItem(){
        var parentId = this.menuItemsList[0] && this.menuItemsList[0].parentId ? this.menuItemsList[0].parentId : 0;
        this.broadcastNewItem.emit(parentId);
    }

    createSubMenu(id:number){
        this.broadcastNewItem.emit(id);
    }

    editMenuItem(item:UpdateDomainMenuItemRequest){
        this.broadcastUpdateItem.emit(item);
    }

    removeMenuItem(id:number){
        this.broadcastDeleteItem.emit(id);
    }

    selectItem(menuItem) {
        this.selectedItem = menuItem;
        this.broadcastMenuItem.emit({id: this.selectedItem.id, newName: this.selectedItem, orderNr:this.selectedItem.orderNr});
    }
}

export interface MenuItem {
    id;
    level;
    parentId;
    name;
    orderNr;
}

export interface NewDomainMenuItemRequest {
    name;
    parentId;
    orderNr;
    //Frunze
    domainId;
}

export interface UpdateDomainMenuItemRequest{
    id;
    newName;
    orderNr;
}