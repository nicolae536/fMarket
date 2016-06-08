import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {BaseMenuComponent} from './baseMenuComponent/baseMenuComponent';
import {INewDomainMenuItemRequest} from "../../models/interfaces/iNewDomainMenuItemRequest";
import {IUpdateDomainMenuItemRequest} from "../../models/interfaces/iUpdateDomainMenuItemRequest";
import {IMenuItem} from "../../models/interfaces/iMenuItem";

let template = require('./menuTreeComponent.html');

@Component({
    selector: 'menu-component',
    template:template,
    directives: [BaseMenuComponent],
    styles:[`
        .menu-tree{
            margin-right:30px;
        }
        .menu-tree .col-md-4{
            padding:0px;
        }
    `]
})

export class MenuTreeComponent implements OnChanges, OnInit {
    @Input('menu-tree-data') menuDictionary:Array<IMenuItem>;
    @Input('enable-operations') enableOperations:boolean;
    @Input('use-domain-marker') useDomainMarker:boolean;
    @Input('remove-position') removePosition:boolean
    //menuDictionary;
    @Output('menu-tree-component-loaded') menuTreeCompoenentLoaded:EventEmitter<MenuTreeComponent>=new EventEmitter<MenuTreeComponent>();
    @Output('select-menu-item') selectNewItem:EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();
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

    ngOnInit():any {
        this.menuTreeCompoenentLoaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('menuDictionary') && this.menuDictionary) {
            this.menuDictionary = this.mapManuTree(this.menuDictionary);
            this.menuTreeView[0] = {title:'Categorii', treeView: this.getRootLayer(), enableOperations:this.enableOperations};
            this.fatchMenuTreeFromSelectionRoad();
        }
    }

    public reinitMenuSelection(){
        this.menuTreeView = [{title:'Categorii', treeView: this.getRootLayer(), enableOperations:this.enableOperations}];
        this.treeViewSelectedRoad = [];
        this.fatchMenuTreeFromSelectionRoad();
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


        menuView[nextLayer] = {title: this.selectedMenuItem.name, treeView:[], enableOperations:this.enableOperations};

        for (var i = 0; i < this.menuDictionary.length; i++) {
            if (this.menuDictionary[i].parentId === menuItem.id) {
                menuView[nextLayer].treeView.push(this.menuDictionary[i]);
            }
        }

        if (menuView[nextLayer].treeView.length < 1) {
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
            this.selectNewItem.emit(menuItem);
            //return;
        }

        this.selectedMenuItem = menuItem;
        this.menuTreeView = this.getTreeViewForMenuItem(menuItem);
        this.treeViewSelectedRoad[menuItem.level] = menuItem;

        if(this.treeViewSelectedRoad.length > this.menuTreeView.length){
            let deleteCount = this.treeViewSelectedRoad.length - this.menuTreeView.length;
            this.treeViewSelectedRoad.splice(this.menuTreeView.length, deleteCount);
        }
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

    private fatchMenuTreeFromSelectionRoad():void {
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
