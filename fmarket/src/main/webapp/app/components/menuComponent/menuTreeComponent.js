System.register(['angular2/core', './baseMenuComponent/baseMenuComponent'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                    this.ROOT_ID = 0;
                    this.ROOT_LAYER = 0;
                    this.menuTreeView = new Array();
                }
                MenuTreeComponent.prototype.ngOnInit = function () {
                    //this.selectItem = new EventEmitter<Object>();
                    //this.broadcastNewItem = new EventEmitter<Object>();	
                    this.menuDictionary = this.mapManuTree(this.menuDictionary);
                    this.menuTreeView.push(this.getRootLayer());
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
                MenuTreeComponent.prototype.selectMenuItem = function (menu) {
                    if (!menu.menuItem.hasChildrens) {
                        this.selectItem.emit(menu.menuItem);
                    }
                    this.menuTreeView = this.getTreeViewForMenuItem(menu.menuItem);
                };
                MenuTreeComponent.prototype.getTreeViewForMenuItem = function (menuItem) {
                    var nextLayer = menuItem.layer + 1;
                    var menuView = this.getActiveTreeView(menuItem.layer);
                    menuView[nextLayer] = new Array();
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
                    var firstLayer = new Array();
                    for (var i = 0; i < this.menuDictionary.length; i++) {
                        if (this.menuDictionary[i].layer === this.ROOT_LAYER) {
                            firstLayer.push(this.menuDictionary[i]);
                        }
                    }
                    return firstLayer;
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
                    core_1.Output('add-new-item'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MenuTreeComponent.prototype, "broadcastNewItem", void 0);
                MenuTreeComponent = __decorate([
                    core_1.Component({
                        selector: 'menu-component',
                        templateUrl: '/app/components/menuComponent/menuTreeComponent.html',
                        directives: [baseMenuComponent_1.BaseMenuComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MenuTreeComponent);
                return MenuTreeComponent;
            }());
            exports_1("MenuTreeComponent", MenuTreeComponent);
        }
    }
});
//# sourceMappingURL=menuTreeComponent.js.map