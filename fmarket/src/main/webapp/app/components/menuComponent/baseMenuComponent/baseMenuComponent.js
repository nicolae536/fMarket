System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                    this.broadcastUpdateItem = new core_1.EventEmitter();
                    this.broadcastDeleteItem = new core_1.EventEmitter();
                }
                BaseMenuComponent.prototype.getItemClass = function (menuItem) {
                    var cssClass = '';
                    if (this.selectedItem == menuItem) {
                        cssClass += 'active ';
                    }
                    if (menuItem.domainId == '') {
                        cssClass += 'domain-marker';
                    }
                    return cssClass;
                };
                BaseMenuComponent.prototype.addNewMenuItem = function () {
                    var parentId = this.menuItemsList[0] && this.menuItemsList[0].parentId ? this.menuItemsList[0].parentId : 0;
                    this.broadcastNewItem.emit(parentId);
                };
                BaseMenuComponent.prototype.createSubMenu = function (id) {
                    this.broadcastNewItem.emit(id);
                };
                BaseMenuComponent.prototype.editMenuItem = function (item) {
                    this.broadcastUpdateItem.emit(item);
                };
                BaseMenuComponent.prototype.removeMenuItem = function (id) {
                    this.broadcastDeleteItem.emit(id);
                };
                BaseMenuComponent.prototype.selectItem = function (menuItem) {
                    this.selectedItem = menuItem;
                    this.broadcastMenuItem.emit({ id: this.selectedItem.id, newName: this.selectedItem, orderNr: this.selectedItem.orderNr });
                };
                __decorate([
                    core_1.Input('menu-items-list'), 
                    __metadata('design:type', Array)
                ], BaseMenuComponent.prototype, "menuItemsList");
                __decorate([
                    core_1.Input('menu-layer'), 
                    __metadata('design:type', Number)
                ], BaseMenuComponent.prototype, "menuLayer");
                __decorate([
                    core_1.Output('select-menu-item'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastMenuItem");
                __decorate([
                    core_1.Output('add-new-item'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastNewItem");
                __decorate([
                    core_1.Output('edit-submenu'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastUpdateItem");
                __decorate([
                    core_1.Output('delete-submenu'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BaseMenuComponent.prototype, "broadcastDeleteItem");
                BaseMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'base-menu',
                        template: "\n\t<div class=\"base-menu-component\">\n\t\t<ul class=\"nav nav-pills nav-stacked\">\n\t\t\t<li *ngFor=\"#item of menuItemsList\" [class]=\"getItemClass(item)\" (click)=\"selectItem(item)\">\n\t\t\t\t<a>\n\t\t\t\t    <div class=\"pull-right\">\n\t\t\t\t        <span class=\"glyphicon glyphicon-plus\" (click)=\"createSubMenu(item.id)\"></span>\n\t\t\t\t        <span class=\"glyphicon glyphicon-pencil\" (click)=\"editMenuItem(item)\"></span>\n\t\t\t\t        <span class=\"glyphicon glyphicon-remove\" (click)=\"removeMenuItem(item.id)\"></span>\n\t\t\t\t    </div>\n\t\t\t\t    {{item.name}}\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<div class=\"operations-label\">\n\t\t\t    <button class=\"btn btn-success\" (click)=\"addNewMenuItem()\">\n\t\t\t        <span class=\"glyphicon glyphicon-plus\"></span>\n\t\t\t    </button>\n\t\t\t</div>\n\t\t</ul>\n\t</div>\n\t",
                        styles: ["\n        .base-menu-component .nav.nav-pills.nav-stacked .operations-label{\n            width:100%;\n        }\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .btn.btn-success{\n\t\t\theight:34px;\n\t\t\twidth:100%;\n\t\t}\n\n\t\t.base-menu-component .nav.nav-pills.nav-stacked .input-group{\n\t\t\tpadding-bottom:5px;\n\t\t}\n\t"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BaseMenuComponent);
                return BaseMenuComponent;
            })();
            exports_1("BaseMenuComponent", BaseMenuComponent);
        }
    }
});
//# sourceMappingURL=baseMenuComponent.js.map