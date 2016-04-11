import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {OnChanges} from "../../../../node_modules/angular2/ts/src/core/linker/interfaces";

//used template to not download the same html multiple times
@Component({
    selector: 'base-menu',
    template: `
	<div class="base-menu-component">
		<ul class="nav nav-pills nav-stacked clearfix">
			<li *ngFor="#item of menuItemsList" [class]="getItemClass(item)" (click)="selectItem(item)">
				<a>
				    <div class="pull-right">
				        <span class="glyphicon glyphicon-plus operation" (click)="createSubMenu($event, item.id)" title="Adauga submeniu"></span>
				        <span class="glyphicon glyphicon-pencil operation" (click)="editMenuItem($event,item)" title="Editeaza optiune"></span>
				        <span class="glyphicon glyphicon-remove operation" (click)="removeMenuItem($event,item.id)" title="Sterge optiune"></span>
				    </div>
				    <span *ngIf="item.hasChildrens" class="glyphicon glyphicon-arrow-right"></span>
				    {{item.orderNr}}.{{item.name}}
				</a>
			</li>
			<div class="operations-label" (click)="addNewMenuItem()">
			     <span class="glyphicon glyphicon-plus" ></span>
			</div>
		</ul>
	</div>
	`,
    styles: [`
        .base-menu-component .nav.nav-pills.nav-stacked .operations-label{
            padding-top:10px;
        }

        .base-menu-component .nav.nav-pills.nav-stacked .operations-label span{
            cursor:pointer;
        }

		.base-menu-component .nav.nav-pills.nav-stacked .btn.btn-primary{
			height:34px;
			width:100%;
		}

		.base-menu-component .nav.nav-pills.nav-stacked li{
            background-color:#ffffcc;
            border-radius: 5px
        }

        .base-menu-component .nav.nav-pills.nav-stacked li a{
            color:black;
        }

        .base-menu-component .nav.nav-pills.nav-stacked .active a{
            color:black;
            background-color:#f0dfd5;
        }

        .base-menu-component .nav.nav-pills.nav-stacked .operation{
            cursor:pointer;
        }

        .base-menu-component .nav.nav-pills.nav-stacked .domain-marker{
            background-color:#e8fff5;
        }

		.base-menu-component .nav.nav-pills.nav-stacked .input-group{
			padding-bottom:5px;
		}
	`]
})

export class BaseMenuComponent implements OnChanges{
    @Input('menu-items-list') menuItemsList:Array<MenuItem>;
    @Input('menu-layer') menuLayer:number;
    @Input('active-in-tree') activeInTree:MenuItem;
    @Output('select-menu-item') broadcastMenuItem:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
    @Output('add-new-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-submenu') broadcastUpdateItem:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
    @Output('delete-submenu') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();

    selectedItem:MenuItem;

    constructor() {
    }

    ngOnChanges(changes:{}) {
        if(changes.hasOwnProperty('activeInTree') && this.activeInTree){
            this.selectedItem = this.activeInTree;
        }
    }

    getItemClass(menuItem) {
        let cssClass = '';
        if (this.selectedItem == menuItem) {
            cssClass += 'active '
        }

        if (menuItem.domainId) {
            cssClass += 'domain-marker'
        }

        return cssClass;
    }

    addNewMenuItem() {
        var parentId = this.menuItemsList[0] && this.menuItemsList[0].parentId ? this.menuItemsList[0].parentId : null;
        this.broadcastNewItem.emit(parentId);
    }

    createSubMenu($event, id:number) {
        this.broadcastNewItem.emit(id);
    }

    editMenuItem($event, item:UpdateDomainMenuItemRequest) {
        $event.stopPropagation();
        this.broadcastUpdateItem.emit(item);
    }

    removeMenuItem($event, id:number) {
        $event.stopPropagation();
        this.broadcastDeleteItem.emit(id);
    }

    selectItem(menuItem) {
        this.selectedItem = menuItem;
        this.broadcastMenuItem.emit(menuItem);
    }
}

export interface MenuItem {
    id;
    level;
    parentId;
    name;
    orderNr;
    domainId
    hasChildrens;
}

export interface NewDomainMenuItemRequest {
    name;
    parentId;
    orderNr;
    //Frunze
    domainId;
}

export interface UpdateDomainMenuItemRequest {
    id;
    newName;
    orderNr;
}