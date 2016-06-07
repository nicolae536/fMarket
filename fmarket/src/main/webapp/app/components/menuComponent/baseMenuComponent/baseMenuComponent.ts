import {Component, Input, Output, OnChanges, OnInit, EventEmitter} from "@angular/core";
import {IUpdateDomainMenuItemRequest} from "../../../models/interfaces/iUpdateDomainMenuItemRequest";
import {IMenuItem} from "../../../models/interfaces/iMenuItem";

//used template to not download the same html multiple times
@Component({
    selector: 'base-menu',
    template: `
	<div class="base-menu-component">
	    <div class="base-menu-container" [ngClass]="{'active-menu':!!selectedItem}">
	        <div class="menu-title">
	            <span class="h4">{{menuTitle}}</span>
	            <span *ngIf="!selectedItem" class="glyphicon glyphicon-triangle-right"></span>
	        </div>
		    <ul class="nav nav-pills nav-stacked clearfix">
		    	<li *ngFor="let item of menuItemsList" [class]="getItemClass(item)" (click)="selectItem(item)">
		            <a>
		                <div *ngIf="enableOperations" class="pull-right">
		                    <span class="glyphicon glyphicon-plus operation" (click)="createSubMenu($event, item.id)" title="Adauga submeniu"></span>
		                    <span class="glyphicon glyphicon-pencil operation" (click)="editMenuItem($event,item)" title="Editeaza optiune"></span>
		                    <span class="glyphicon glyphicon-remove operation" (click)="removeMenuItem($event,item.id)" title="Sterge optiune"></span>
		                </div>
		                {{removePosition ? '' : item.orderNr +'.'}}{{item.name}}
		            </a>
		    	</li>
		    	
		    </ul>
		</div>
		<div *ngIf="enableOperations" class="operations-label">
		    <span class="glyphicon glyphicon-plus" (click)="addNewMenuItem()"></span>
		</div>
	</div>
	`,
    styles: [`
        .base-menu-component {
            background-color: white;
            animation: modal-show 0.3s;
        }
        
        .base-menu-component .base-menu-container.active-menu{
            background-color:#f1f1f1;
        }
    
        .base-menu-component .base-menu-container .menu-title{
            padding: 13px 0 12px 48px;
            color: black;
            position: relative;
            background-color:#f1f1f1;
            border-right:1px solid lightgrey;
        }
        
        .base-menu-component .base-menu-container .menu-title .glyphicon.glyphicon-triangle-right{
            position: absolute;
            font-size: 54px;
            top: -1px;
            right: -39px;
            z-index: 10;
            color: #f1f1f1;
        }      
    
        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked{
            border-top: 1px solid lightgrey;
            border-right: 1px solid lightgrey;  
        }
    
        .base-menu-component .operations-label{
            padding-top:10px;
            padding-left: 10px;
            padding-bottom: 10px;
        }

        .base-menu-component .operations-label span{
            cursor:pointer;
        }

		.base-menu-component .base-menu-container .nav.nav-pills.nav-stacked .btn.btn-primary{
			height:34px;
			width:100%;
		}

        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked li{
            margin-top:0px;
        }

        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked li a{
            color:black;
        }

        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked li:hover a{
            cursor:pointer;
            background-color:#74C2DA;
        }

        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked .active a{
            color:white;
            background-color:#00a6da;
        }

        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked li a .operation{
            cursor:pointer;
        }
        
        .base-menu-component .base-menu-container .nav.nav-pills.nav-stacked .domain-marker {
             background-color:#e8fff5;
        }
        
		.base-menu-component .base-menu-container .nav.nav-pills.nav-stacked .input-group{
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

export class BaseMenuComponent implements OnChanges, OnInit {
    @Input('menu-items-list') menuItemsList:Array<IMenuItem>;
    @Input('menu-layer') menuLayer:number;
    @Input('active-in-tree') activeInTree:IMenuItem;
    @Input('menu-tree-title') menuTitle:string;
    @Input('enable-operations') enableOperations:boolean;
    @Input('selected-item') selectedItem:IMenuItem;
    @Input('use-domain-marker') useDomainMarker:boolean;
    @Input('remove-position') removePosition:boolean

    @Output('select-menu-item') broadcastMenuItem:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Output('add-new-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-submenu') broadcastUpdateItem:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Output('delete-submenu') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.menuTitle = "test";
    }

    ngOnInit():any {
        // /if()
        // this.selectedItem = null;
    }

    ngOnChanges(changes:{}) {
        if (changes.hasOwnProperty('activeInTree') && this.activeInTree) {
            this.selectedItem = this.activeInTree;
        }
    }

    getItemClass(menuItem) {
        let cssClass = '';
        if (this.selectedItem == menuItem) {
            cssClass += 'active '
        }

        if (menuItem.domainId && this.useDomainMarker) {
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

