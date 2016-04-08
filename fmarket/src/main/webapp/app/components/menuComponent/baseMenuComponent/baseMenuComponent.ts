import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';

//used template to not download the same html multiple times
@Component({
	selector: 'base-menu',
	template:`
	<div class="base-menu-component">
		<ul class="nav nav-pills nav-stacked">
			<div class="input-group">
				<input class="form-control" [(ngModel)]="newMenuItem">
				<div class="input-group-btn">
					<button class="btn btn-success" (click)="clearMenuItem()">
						<span class="glyphicon glyphicon-remove"></span>
					</button>
					<button class="btn btn-success" (click)="addMenuItem()">
						<span class="glyphicon glyphicon-plus"></span>
					</button>
				</div>
			</div>
			<li *ngFor="#item of menuItemsList" [class]="isItemSelected(item) ? 'active':''" (click)="selectItem(item)">
				<a>{{item.name}}</a>
			</li>
		</ul>
	</div>
	`,
	styles:[`
		.base-menu-component .nav.nav-pills.nav-stacked .input-group .input-group-btn .btn{
			height:34px;
		}

		.base-menu-component .nav.nav-pills.nav-stacked .input-group{
			padding-bottom:5px;
		}
	`]
})

export class BaseMenuComponent implements OnInit {
	@Input('menu-items-list') menuItemsList:Array<MenuItem>;
	@Input('menu-layer') menuLayer:number;
	@Output('select-menu-item') broadcastMenuItem: EventEmitter<MenuData> = new EventEmitter<MenuData>();
	@Output('add-new-item') broadcastNewItem: EventEmitter<MenuData> = new EventEmitter<MenuData>();

	selectedItem:MenuItem;
	newMenuItem:string;

	constructor() { }

	ngOnInit(){
		//this.selectItem(this.menuItemsList && this.menuItemsList.length > 0 ? this.menuItemsList[0] : null);
		this.newMenuItem = "";
	}

	isItemSelected(menuItem){
		return this.selectedItem == menuItem;
	}

	selectItem(menuItem){
		this.selectedItem = menuItem;
		this.broadcastMenuItem.emit({menuItem:menuItem, menuLayer:this.menuLayer});
	}

	addMenuItem(){
		this.broadcastNewItem.emit({menuItem:this.newMenuItem, menuLayer:this.menuLayer});
		this.clearMenuItem();
	}

	clearMenuItem(){
		this.newMenuItem = "";
	}
}

interface MenuItem{
	id;
	layer;
	parentId;
	name;
}

interface MenuData{
	menuItem;
	menuLayer;
}