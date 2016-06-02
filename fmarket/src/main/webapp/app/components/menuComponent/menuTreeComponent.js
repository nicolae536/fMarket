var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var baseMenuComponent_1 = require('./baseMenuComponent/baseMenuComponent');
var MenuTreeComponent = (function () {
    //TODO implement menuService
    function MenuTreeComponent() {
        //menuDictionary;
        this.menuTreeCompoenentLoaded = new core_1.EventEmitter();
        this.selectNewItem = new core_1.EventEmitter();
        this.selectItem = new core_1.EventEmitter();
        this.broadcastNewItem = new core_1.EventEmitter();
        this.broadcastEditItem = new core_1.EventEmitter();
        this.broadcastDeleteItem = new core_1.EventEmitter();
        this.ROOT_PARENT_ID = null;
        this.ROOT_LAYER = 0;
        this.treeViewSelectedRoad = [];
        this.menuTreeView = [];
    }
    MenuTreeComponent.prototype.ngOnInit = function () {
        this.menuTreeCompoenentLoaded.emit(this);
    };
    MenuTreeComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('menuDictionary') && this.menuDictionary) {
            this.menuDictionary = this.mapManuTree(this.menuDictionary);
            this.menuTreeView[0] = { title: 'Categorii', treeView: this.getRootLayer(), enableOperations: this.enableOperations };
            this.fatchMenuTreeFromSelectionRoad();
        }
    };
    MenuTreeComponent.prototype.reinitMenuSelection = function () {
        this.menuTreeView = [{ title: 'Categorii', treeView: this.getRootLayer(), enableOperations: this.enableOperations }];
        this.treeViewSelectedRoad = [];
        this.fatchMenuTreeFromSelectionRoad();
    };
    MenuTreeComponent.prototype.mapManuTree = function (menuTree) {
        for (var i = 0; i < menuTree.length; i++) {
            menuTree[i].hasChildrens = this.checkIfMenuItemHasChildrens(menuTree[i], menuTree);
        }
        return menuTree;
    };
    MenuTreeComponent.prototype.checkIfMenuItemHasChildrens = function (menuItem, menuTree) {
        for (var i = 0; i < menuTree.length; i++) {
            if (menuItem.id === menuTree[i].parentId) {
                return true;
            }
        }
        return false;
    };
    MenuTreeComponent.prototype.getTreeViewForMenuItem = function (menuItem) {
        var nextLayer = !menuItem.level ? 1 : menuItem.level + 1;
        var menuView = this.getActiveTreeView(menuItem.level);
        menuView[nextLayer] = { title: this.selectedMenuItem.name, treeView: [], enableOperations: this.enableOperations };
        for (var i = 0; i < this.menuDictionary.length; i++) {
            if (this.menuDictionary[i].parentId === menuItem.id) {
                menuView[nextLayer].treeView.push(this.menuDictionary[i]);
            }
        }
        if (menuView[nextLayer].treeView.length < 1) {
            menuView.splice(nextLayer, 1);
        }
        return menuView;
    };
    MenuTreeComponent.prototype.getActiveTreeView = function (lastLayer) {
        var layer = 0;
        var menuColector = [];
        while (layer <= lastLayer) {
            menuColector[layer] = this.menuTreeView[layer];
            layer++;
        }
        return menuColector;
    };
    MenuTreeComponent.prototype.getRootLayer = function () {
        var firstLayer = [];
        for (var i = 0; i < this.menuDictionary.length; i++) {
            if (this.menuDictionary[i].parentId === this.ROOT_PARENT_ID) {
                firstLayer.push(this.menuDictionary[i]);
            }
        }
        return firstLayer;
    };
    MenuTreeComponent.prototype.selectMenuItem = function (menuItem) {
        if (!menuItem.hasChildrens) {
            this.selectItem.emit(menuItem.name);
            this.selectNewItem.emit(menuItem);
        }
        this.selectedMenuItem = menuItem;
        this.menuTreeView = this.getTreeViewForMenuItem(menuItem);
        this.treeViewSelectedRoad[menuItem.level] = menuItem;
        if (this.treeViewSelectedRoad.length > this.menuTreeView.length) {
            var deleteCount = this.treeViewSelectedRoad.length - this.menuTreeView.length;
            this.treeViewSelectedRoad.splice(this.menuTreeView.length, deleteCount);
        }
    };
    MenuTreeComponent.prototype.requestNewMenuItem = function (parentId) {
        this.broadcastNewItem.emit(parentId);
    };
    MenuTreeComponent.prototype.editSubmenu = function (menuItem) {
        this.broadcastEditItem.emit(menuItem);
    };
    MenuTreeComponent.prototype.deleteSubmenu = function (menuId) {
        this.broadcastDeleteItem.emit(menuId);
    };
    MenuTreeComponent.prototype.fatchMenuTreeFromSelectionRoad = function () {
        var me = this;
        for (var j = 0; j < me.treeViewSelectedRoad.length; j++) {
            var menuItem = me.treeViewSelectedRoad[j];
            var newItem = null;
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
    };
    MenuTreeComponent.prototype.getActiveItemInTree = function (index) {
        if (this.treeViewSelectedRoad && this.treeViewSelectedRoad[index]) {
            return this.treeViewSelectedRoad[index];
        }
        return null;
    };
    __decorate([
        core_1.Input('menu-tree-data'), 
        __metadata('design:type', Array)
    ], MenuTreeComponent.prototype, "menuDictionary", void 0);
    __decorate([
        core_1.Input('enable-operations'), 
        __metadata('design:type', Boolean)
    ], MenuTreeComponent.prototype, "enableOperations", void 0);
    __decorate([
        core_1.Input('use-domain-marker'), 
        __metadata('design:type', Boolean)
    ], MenuTreeComponent.prototype, "useDomainMarker", void 0);
    __decorate([
        core_1.Input('remove-position'), 
        __metadata('design:type', Boolean)
    ], MenuTreeComponent.prototype, "removePosition", void 0);
    __decorate([
        core_1.Output('menu-tree-component-loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "menuTreeCompoenentLoaded", void 0);
    __decorate([
        core_1.Output('select-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "selectNewItem", void 0);
    __decorate([
        core_1.Output('item-selected'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "selectItem", void 0);
    __decorate([
        core_1.Output('add-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "broadcastNewItem", void 0);
    __decorate([
        core_1.Output('edit-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "broadcastEditItem", void 0);
    __decorate([
        core_1.Output('delete-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeComponent.prototype, "broadcastDeleteItem", void 0);
    MenuTreeComponent = __decorate([
        core_1.Component({
            selector: 'menu-component',
            templateUrl: '/app/components/menuComponent/menuTreeComponent.html',
            directives: [baseMenuComponent_1.BaseMenuComponent],
            styles: ["\n        .menu-tree{\n            margin-right:30px;\n        }\n        .menu-tree .col-md-4{\n            padding:0px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuTreeComponent);
    return MenuTreeComponent;
})();
exports.MenuTreeComponent = MenuTreeComponent;
//# sourceMappingURL=menuTreeComponent.js.map