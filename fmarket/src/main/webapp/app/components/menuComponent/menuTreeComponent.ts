import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from 'angular2/core';
import {BaseMenuComponent} from './baseMenuComponent/baseMenuComponent';
import {INewDomainMenuItemRequest} from "../../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../../models/interfaces/iUpdateDomainMenuItemRequest";
import {IMenuItem} from "../../models/interfaces/iMenuItem";

@Component({
    selector: 'menu-component',
    templateUrl: '/app/components/menuComponent/menuTreeComponent.html',
    directives: [BaseMenuComponent]
})

export class MenuTreeComponent implements OnChanges {
    @Input('menu-tree-data') menuDictionary:Array<IMenuItem>;
    //menuDictionary;
    @Output('item-selected') selectItem:EventEmitter<INewDomainMenuItemRequest> = new EventEmitter<INewDomainMenuItemRequest>();
    @Output('add-menu-item') broadcastNewItem:EventEmitter<number> = new EventEmitter<number>();
    @Output('edit-menu-item') broadcastEditItem:EventEmitter<IUpdateDomainMenuItemRequest> = new EventEmitter<IUpdateDomainMenuItemRequest>();
    @Output('delete-menu-item') broadcastDeleteItem:EventEmitter<number> = new EventEmitter<number>();
    ROOT_PARENT_ID = null;
    ROOT_LAYER:number = 0;
    selectedMenuItem;

    treeViewSelectedRoad:Array<IMenuItem> = [];
    menuTreeView:Array<Object> = [];
    //TODO implement menuService
    constructor() {

    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('menuDictionary') && this.menuDictionary) {
            this.menuDictionary = this.mapManuTree(this.menuDictionary);
            this.menuTreeView[0] = this.getRootLayer();
            this.activateTree();
        }
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
        var nextLayer = !menuItem.level ? 1 : menuItem.level + 1;
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
            if (this.menuDictionary[i].parentId === this.ROOT_PARENT_ID) {
                firstLayer.push(this.menuDictionary[i]);
            }
        }

        return firstLayer;
    }

    selectMenuItem(menuItem:IMenuItem) {
        if (!menuItem.hasChildrens) {
            this.selectItem.emit(menuItem.name);
            //return;
        }

        this.treeViewSelectedRoad[menuItem.level] = menuItem;
        this.selectedMenuItem = menuItem;
        this.menuTreeView = this.getTreeViewForMenuItem(menuItem);
    }

    requestNewMenuItem(parentId:number) {
        this.broadcastNewItem.emit(parentId);
    }

    editSubmenu(menuItem:IUpdateDomainMenuItemRequest) {
        this.broadcastEditItem.emit(menuItem);
    }

    deleteSubmenu(menuId:number) {
        this.broadcastDeleteItem.emit(menuId);
    }

    private activateTree():void {
        var me = this;
        for (var j = 0; j < me.treeViewSelectedRoad.length; j++) {
            let menuItem = me.treeViewSelectedRoad[j];
            let newItem = null;
            for (var i = 0; i < me.menuDictionary.length; i++) {
                if (me.menuDictionary[i].id == menuItem.id) {
                    newItem = me.menuDictionary[i];
                    break;
                }
            }

            if (!newItem) {
                return;
            }
            me.selectMenuItem(newItem);
        }
    }

    getActiveItemInTree(index:number){
        if(this.treeViewSelectedRoad && this.treeViewSelectedRoad[index]){
            return this.treeViewSelectedRoad[index];
        }
        return null;
    }
}
