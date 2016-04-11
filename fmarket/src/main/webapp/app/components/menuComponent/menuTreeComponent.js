System.register(['angular2/core', './baseMenuComponent/baseMenuComponent'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, baseMenuComponent_1;
    var MenuTreeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (baseMenuComponent_1_1) {
                baseMenuComponent_1 = baseMenuComponent_1_1;
            }],
        execute: function() {
            MenuTreeComponent = (function () {
                //TODO implement menuService
                function MenuTreeComponent() {
                    //menuDictionary;
                    this.selectItem = new core_1.EventEmitter();
                    this.broadcastNewItem = new core_1.EventEmitter();
                    this.broadcastEditItem = new core_1.EventEmitter();
                    this.broadcastDeleteItem = new core_1.EventEmitter();
                    this.ROOT_PARENT_ID = null;
                    this.ROOT_LAYER = 0;
                    this.treeViewSelectedRoad = [];
                    this.menuTreeView = [];
                }
                MenuTreeComponent.prototype.ngOnChanges = function (changes) {
                    if (changes.hasOwnProperty('menuDictionary') && this.menuDictionary) {
                        this.menuDictionary = this.mapManuTree(this.menuDictionary);
                        this.menuTreeView[0] = this.getRootLayer();
                        this.activateTree();
                    }
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
                    }
                    this.treeViewSelectedRoad[menuItem.level] = menuItem;
                    this.selectedMenuItem = menuItem;
                    this.menuTreeView = this.getTreeViewForMenuItem(menuItem);
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
                MenuTreeComponent.prototype.activateTree = function () {
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
                        directives: [baseMenuComponent_1.BaseMenuComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MenuTreeComponent);
                return MenuTreeComponent;
            })();
            exports_1("MenuTreeComponent", MenuTreeComponent);
        }
    }
});
//# sourceMappingURL=menuTreeComponent.js.map