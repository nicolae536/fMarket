import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {IUpdateDomainMenuItemRequest} from "../../../models/interfaces/iUpdateDomainMenuItemRequest";
import {IMenuItem} from "../../../models/interfaces/iMenuItem";

//used template to not download the same html multiple times
@Component({
    selector: 'base-menu',
    template: `
	<div class="base-menu-component">
	    <div class="menu-title arrow_box">
	        <span class="h1">{{menuTitle}}</span>
	    </div>
		<ul class="nav nav-pills nav-stacked clearfix">
			<li *ngFor="let item of menuItemsList" [class]="getItemClass(item)" (click)="selectItem(item)">
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
			<div class="operations-label">
			     <span class="glyphicon glyphicon-plus" (click)="addNewMenuItem()"></span>
			</div>
		</ul>
	</div>
	`,
    styles: [`
        .base-menu-component .menu-title{
            padding: 9px 0 16px 25px;
            color:white;
        }
    
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
            background-color:#54d3e3;
            border-radius: 5px
        }

        .base-menu-component .nav.nav-pills.nav-stacked li a{
            color:black;
        }

        .base-menu-component .nav.nav-pills.nav-stacked .active a{
            color:black;
            background-color:#ff6b45;
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
		
		.arrow_box {
        	position: relative;
        	background: #88b7d5;
        	border: 4px solid #c2e1f5;
        }
        .arrow_box:after, .arrow_box:before {
        	left: 100.8%;
        	top: 50%;
        	border: solid transparent;
        	content: " ";
        	height: 0;
        	width: 0;
        	position: absolute;
        	pointer-events: none;
        }
        
        .arrow_box:after {
        	border-color: rgba(136, 183, 213, 0);
        	border-left-color: #88b7d5;
        	border-width: 30px;
        	margin-top: -30px;
        }
        .arrow_box:before {
        	border-color: rgba(194, 225, 245, 0);
        	border-left-color: #c2e1f5;
        	border-width: 36px;
        	margin-top: -36px;
        }
	`]
})

export class BaseMenuComponent implements OnChanges{
    @Input('menu-items-list') menuItemsList:Array<IMenuItem>;
    @Input('menu-layer') menuLayer:number;
    @Input('active-in-tree') activeInTree:IMenuItem;
    @Input('menu-tree-title') menuTitle:string;

    @Output('select-menu-item') broadcastMenuItem:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Output('add-new-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-submenu') broadcastUpdateItem:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Output('delete-submenu') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();

    selectedItem:IMenuItem;

    constructor() {
        this.menuTitle = "test";
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

    editMenuItem($event, item:IUpdateDomainMenuItemRequest) {
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

