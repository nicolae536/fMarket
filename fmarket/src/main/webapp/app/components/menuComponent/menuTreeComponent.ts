import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {BaseMenuComponent} from './baseMenuComponent/baseMenuComponent';
import {MenuItem} from './baseMenuComponent/baseMenuComponent';
import {NewDomainMenuItemRequest} from './baseMenuComponent/baseMenuComponent';
import {UpdateDomainMenuItemRequest} from "./baseMenuComponent/baseMenuComponent";

@Component({
    selector: 'menu-component',
    templateUrl: '/app/components/menuComponent/menuTreeComponent.html',
    directives: [BaseMenuComponent]
})

export class MenuTreeComponent implements OnInit {
    @Input('menu-tree-data') menuDictionary:Array<MenuItem>;
    //menuDictionary;
    @Output('item-selected') selectItem:EventEmitter<NewDomainMenuItemRequest> = new EventEmitter<NewDomainMenuItemRequest>();
    @Output('add-menu-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-menu-item') broadcastEditItem:EventEmitter<UpdateDomainMenuItemRequest> = new EventEmitter<UpdateDomainMenuItemRequest>();
    @Output('delete-menu-item') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();
    ROOT_ID:number = 0;
    ROOT_LAYER:number = 0;
    selectedMenuItem;

    menuTreeView:Array<Object> = [];
    //TODO implement menuService
    constructor() {

    }

    ngOnInit() {
        this.menuDictionary = this.mapManuTree(this.menuDictionary);
        this.menuTreeView.push(this.getRootLayer());
    }

    mapManuTree(menuTree) {
        for (let i = 0; i < menuTree.length; i++) {
            menuTree[i].hasChildrens = this.checkIfMenuItemHasChildrens(menuTree[i], menuTree);
        }
        return menuTree;
    }

    checkIfMenuItemHasChildrens(menuItem, menuTree) {
        for (let i = 0; i < menuTree.length; i++) {
            if (menuItem.id === menuTree[i].parentId) {
                return true;
            }
        }
        return false;
    }



    getTreeViewForMenuItem(menuItem) {
        var nextLayer = menuItem.level + 1;
        let menuView = this.getActiveTreeView(menuItem.level);


        menuView[nextLayer] = [];

        for (var i = 0; i < this.menuDictionary.length; i++) {
            if (this.menuDictionary[i].parentId === menuItem.id) {
                menuView[nextLayer].push(this.menuDictionary[i]);
            }
        }

        if (menuView[nextLayer].length < 1) {
            menuView.splice(nextLayer, 1);
        }
        return menuView;
    }

    getActiveTreeView(lastLayer) {
        let layer = 0;
        var menuColector = [];
        while (layer <= lastLayer) {
            menuColector[layer] = this.menuTreeView[layer];
            layer++;
        }
        return menuColector;
    }

    getRootLayer() {
        let firstLayer = [];

        for (var i = 0; i < this.menuDictionary.length; i++) {
            if (this.menuDictionary[i].level === this.ROOT_LAYER) {
                firstLayer.push(this.menuDictionary[i]);
            }
        }
        //if(firstLayer.length < 1){
        //    firstLayer[0] = new Array<Object>();
        //}

        return firstLayer;
    }

    selectMenuItem(menuItem) {
        if (!menuItem.hasChildrens) {
            this.selectItem.emit(menuItem.name);
            //return;
        }
        this.selectedMenuItem = menuItem;
        this.menuTreeView = this.getTreeViewForMenuItem(menuItem.name);
    }

    requestNewMenuItem(parentId:number) {
        this.broadcastNewItem.emit(parentId);
    }

    editSubmenu(menuItem:UpdateDomainMenuItemRequest){
        this.broadcastEditItem.emit(menuItem);
    }

    deleteSubmenu(menuId:number){
        this.broadcastDeleteItem.emit(menuId);
    }
}
