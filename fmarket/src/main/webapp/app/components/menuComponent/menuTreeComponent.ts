import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {BaseMenuComponent} from './baseMenuComponent/baseMenuComponent';

@Component({
	selector: 'menu-component',
	templateUrl: '/app/components/menuComponent/menuTreeComponent.html',
	directives:[BaseMenuComponent]
}) 

export class MenuTreeComponent implements OnInit {
	@Input('menu-tree-data') menuDictionary:Array<Object>;
	//menuDictionary;
	@Output('item-selected') selectItem:EventEmitter<Object> = new EventEmitter<Object>();
	@Output('add-new-item') broadcastNewItem:EventEmitter<Object>  = new EventEmitter<Object>();
	ROOT_ID:number = 0; 
	ROOT_LAYER:number = 0;

	menuTreeView:Array<Object> = new Array<Object>();
	//TODO implement menuService
	constructor() {
		
	}

	ngOnInit(){
		//this.selectItem = new EventEmitter<Object>();
		//this.broadcastNewItem = new EventEmitter<Object>();	
		this.menuDictionary = this.mapManuTree(this.menuDictionary);	
		this.menuTreeView.push(this.getRootLayer());
	}

	mapManuTree(menuTree){
		for (let i = 0; i < menuTree.length; i++) {
			menuTree[i].hasChildrens = this.checkIfMenuItemHasChildrens(menuTree[i], menuTree);
		}
		return menuTree;
	}

	checkIfMenuItemHasChildrens(menuItem, menuTree){
		for (let i = 0; i < menuTree.length; i++) {
			if(menuItem.id === menuTree[i].parentId){
				return true;
			}
		}
		return false;
	}

	selectMenuItem(menu){
		if(!menu.menuItem.hasChildrens){
			this.selectItem.emit(menu.menuItem);
			//return;
		}
		this.menuTreeView = this.getTreeViewForMenuItem(menu.menuItem);
	}

	getTreeViewForMenuItem(menuItem){
		var nextLayer = menuItem.layer + 1;
		let menuView = this.getActiveTreeView(menuItem.layer);


		menuView[nextLayer] = new Array<Object>();

		for (var i = 0; i < this.menuDictionary.length; i++) {
			if (this.menuDictionary[i].parentId === menuItem.id){
				menuView[nextLayer].push(this.menuDictionary[i]);
			}
		}

		if(menuView[nextLayer].length < 1){
			menuView.splice(nextLayer,1);
		}
		return menuView;
	}	

	getActiveTreeView(lastLayer){
		let layer = 0
		var menuColector = []
		while (layer<=lastLayer){
			menuColector[layer] = this.menuTreeView[layer];
			layer++;
		}
		return menuColector;
	}

	getRootLayer(){
		let firstLayer = new Array<Object>();

		for (var i = 0; i < this.menuDictionary.length; i++) {			
			if(this.menuDictionary[i].layer === this.ROOT_LAYER)
			{
				firstLayer.push(this.menuDictionary[i]);
			} 
		}

		return firstLayer
	}
}