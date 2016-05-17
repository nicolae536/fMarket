"use strict";
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
//used template to not download the same html multiple times
var BaseMenuComponent = (function () {
    function BaseMenuComponent() {
        this.broadcastMenuItem = new core_1.EventEmitter();
        this.broadcastNewItem = new core_1.EventEmitter();
        this.broadcastUpdateItem = new core_1.EventEmitter();
        this.broadcastDeleteItem = new core_1.EventEmitter();
        this.menuTitle = "test";
    }
    BaseMenuComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('activeInTree') && this.activeInTree) {
            this.selectedItem = this.activeInTree;
        }
    };
    BaseMenuComponent.prototype.getItemClass = function (menuItem) {
        var cssClass = '';
        if (this.selectedItem == menuItem) {
            cssClass += 'active ';
        }
        if (menuItem.domainId) {
            cssClass += 'domain-marker';
        }
        return cssClass;
    };
    BaseMenuComponent.prototype.addNewMenuItem = function () {
        var parentId = this.menuItemsList[0] && this.menuItemsList[0].parentId ? this.menuItemsList[0].parentId : null;
        this.broadcastNewItem.emit(parentId);
    };
    BaseMenuComponent.prototype.createSubMenu = function ($event, id) {
        this.broadcastNewItem.emit(id);
    };
    BaseMenuComponent.prototype.editMenuItem = function ($event, item) {
        $event.stopPropagation();
        this.broadcastUpdateItem.emit(item);
    };
    BaseMenuComponent.prototype.removeMenuItem = function ($event, id) {
        $event.stopPropagation();
        this.broadcastDeleteItem.emit(id);
    };
    BaseMenuComponent.prototype.selectItem = function (menuItem) {
        this.selectedItem = menuItem;
        this.broadcastMenuItem.emit(menuItem);
    };
    __decorate([
        core_1.Input('menu-items-list'), 
        __metadata('design:type', Array)
    ], BaseMenuComponent.prototype, "menuItemsList", void 0);
    __decorate([
        core_1.Input('menu-layer'), 
        __metadata('design:type', Number)
    ], BaseMenuComponent.prototype, "menuLayer", void 0);
    __decorate([
        core_1.Input('active-in-tree'), 
        __metadata('design:type', Object)
    ], BaseMenuComponent.prototype, "activeInTree", void 0);
    __decorate([
        core_1.Input('menu-tree-title'), 
        __metadata('design:type', String)
    ], BaseMenuComponent.prototype, "menuTitle", void 0);
    __decorate([
        core_1.Output('select-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseMenuComponent.prototype, "broadcastMenuItem", void 0);
    __decorate([
        core_1.Output('add-new-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseMenuComponent.prototype, "broadcastNewItem", void 0);
    __decorate([
        core_1.Output('edit-submenu'), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseMenuComponent.prototype, "broadcastUpdateItem", void 0);
    __decorate([
        core_1.Output('delete-submenu'), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseMenuComponent.prototype, "broadcastDeleteItem", void 0);
    BaseMenuComponent = __decorate([
        core_1.Component({
            selector: 'base-menu',
            template: "\n\t<div class=\"base-menu-component\">\n\t    <div class=\"menu-title arrow_box\">\n\t        <span class=\"h1\">{{menuTitle}}</span>\n\t    </div>\n\t\t<ul class=\"nav nav-pills nav-stacked clearfix\">\n\t\t\t<li *ngFor=\"let item of menuItemsList\" [class]=\"getItemClass(item)\" (click)=\"selectItem(item)\">\n\t\t\t\t<a>\n\t\t\t\t    <div class=\"pull-right\">\n\t\t\t\t        <span class=\"glyphicon glyphicon-plus operation\" (click)=\"createSubMenu($event, item.id)\" title=\"Adauga submeniu\"></span>\n\t\t\t\t        <span class=\"glyphicon glyphicon-pencil operation\" (click)=\"editMenuItem($event,item)\" title=\"Editeaza optiune\"></span>\n\t\t\t\t        <span class=\"glyphicon glyphicon-remove operation\" (click)=\"removeMenuItem($event,item.id)\" title=\"Sterge optiune\"></span>\n\t\t\t\t    </div>\n\t\t\t\t    <span *ngIf=\"item.hasChildrens\" class=\"glyphicon glyphicon-arrow-right\"></span>\n\t\t\t\t    {{item.orderNr}}.{{item.name}}\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<div class=\"operations-label\">\n\t\t\t     <span class=\"glyphicon glyphicon-plus\" (click)=\"addNewMenuItem()\"></span>\n\t\t\t</div>\n\t\t</ul>\n\t</div>\n\t",
            styles: ["\n        .base-menu-component .menu-title{\n            padding: 9px 0 16px 25px;\n            color:white;\n        }\n    \n        .base-menu-component .nav.nav-pills.nav-stacked .operations-label{\n            padding-top:10px;\n        }\n\n        .base-menu-component .nav.nav-pills.nav-stacked .operations-label span{\n            cursor:pointer;\n        }\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .btn.btn-primary{\n\t\t\theight:34px;\n\t\t\twidth:100%;\n\t\t}\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked li{\n            background-color:#54d3e3;\n            border-radius: 5px\n        }\n\n        .base-menu-component .nav.nav-pills.nav-stacked li a{\n            color:black;\n        }\n\n        .base-menu-component .nav.nav-pills.nav-stacked .active a{\n            color:black;\n            background-color:#ff6b45;\n        }\n\n        .base-menu-component .nav.nav-pills.nav-stacked .operation{\n            cursor:pointer;\n        }\n\n        .base-menu-component .nav.nav-pills.nav-stacked .domain-marker{\n            background-color:#e8fff5;\n        }\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .input-group{\n\t\t\tpadding-bottom:5px;\n\t\t}\n\t\t\n\t\t.arrow_box {\n        \tposition: relative;\n        \tbackground: #88b7d5;\n        \tborder: 4px solid #c2e1f5;\n        }\n        .arrow_box:after, .arrow_box:before {\n        \tleft: 100.8%;\n        \ttop: 50%;\n        \tborder: solid transparent;\n        \tcontent: \" \";\n        \theight: 0;\n        \twidth: 0;\n        \tposition: absolute;\n        \tpointer-events: none;\n        }\n        \n        .arrow_box:after {\n        \tborder-color: rgba(136, 183, 213, 0);\n        \tborder-left-color: #88b7d5;\n        \tborder-width: 30px;\n        \tmargin-top: -30px;\n        }\n        .arrow_box:before {\n        \tborder-color: rgba(194, 225, 245, 0);\n        \tborder-left-color: #c2e1f5;\n        \tborder-width: 36px;\n        \tmargin-top: -36px;\n        }\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], BaseMenuComponent);
    return BaseMenuComponent;
}());
exports.BaseMenuComponent = BaseMenuComponent;
//# sourceMappingURL=baseMenuComponent.js.map