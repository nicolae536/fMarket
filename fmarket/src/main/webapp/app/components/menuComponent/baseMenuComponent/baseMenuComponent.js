System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var BaseMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //used template to not download the same html multiple times
            BaseMenuComponent = (function () {
                function BaseMenuComponent() {
                    this.broadcastMenuItem = new core_1.EventEmitter();
                    this.broadcastNewItem = new core_1.EventEmitter();
                }
                BaseMenuComponent.prototype.ngOnInit = function () {
                    //this.selectItem(this.menuItemsList && this.menuItemsList.length > 0 ? this.menuItemsList[0] : null);
                    this.newMenuItem = "";
                };
                BaseMenuComponent.prototype.isItemSelected = function (menuItem) {
                    return this.selectedItem == menuItem;
                };
                BaseMenuComponent.prototype.selectItem = function (menuItem) {
                    this.selectedItem = menuItem;
                    this.broadcastMenuItem.emit({ menuItem: menuItem, menuLayer: this.menuLayer });
                };
                BaseMenuComponent.prototype.addMenuItem = function () {
                    this.broadcastNewItem.emit({ menuItem: this.newMenuItem, menuLayer: this.menuLayer });
                    this.clearMenuItem();
                };
                BaseMenuComponent.prototype.clearMenuItem = function () {
                    this.newMenuItem = "";
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
                    core_1.Output('select-menu-item'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastMenuItem", void 0);
                __decorate([
                    core_1.Output('add-new-item'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastNewItem", void 0);
                BaseMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'base-menu',
                        template: "\n\t<div class=\"base-menu-component\">\n\t\t<ul class=\"nav nav-pills nav-stacked\">\n\t\t\t<div class=\"input-group\">\n\t\t\t\t<input class=\"form-control\" [(ngModel)]=\"newMenuItem\">\n\t\t\t\t<div class=\"input-group-btn\">\n\t\t\t\t\t<button class=\"btn btn-success\" (click)=\"clearMenuItem()\">\n\t\t\t\t\t\t<span class=\"glyphicon glyphicon-remove\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class=\"btn btn-success\" (click)=\"addMenuItem()\">\n\t\t\t\t\t\t<span class=\"glyphicon glyphicon-plus\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<li *ngFor=\"#item of menuItemsList\" [class]=\"isItemSelected(item) ? 'active':''\" (click)=\"selectItem(item)\">\n\t\t\t\t<a>{{item.name}}</a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t",
                        styles: ["\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .input-group .input-group-btn .btn{\n\t\t\theight:34px;\n\t\t}\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .input-group{\n\t\t\tpadding-bottom:5px;\n\t\t}\n\t"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BaseMenuComponent);
                return BaseMenuComponent;
            }());
            exports_1("BaseMenuComponent", BaseMenuComponent);
        }
    }
});
//# sourceMappingURL=baseMenuComponent.js.map