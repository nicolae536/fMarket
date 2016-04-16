System.register(['angular2/core', 'angular2/http', "./fMarketApi"], function(exports_1, context_1) {
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
    var core_1, http_1, fMarketApi_1;
    var CategoriesMenuService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (fMarketApi_1_1) {
                fMarketApi_1 = fMarketApi_1_1;
            }],
        execute: function() {
            CategoriesMenuService = (function () {
                function CategoriesMenuService(http) {
                    this._domainMenuController = '/menu/domain';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                CategoriesMenuService.prototype.getMenuDictionary = function () {
                    return this.api.get(this._domainMenuController);
                };
                CategoriesMenuService.prototype.getDomains = function () {
                    return this.api.get('/demand/domains');
                };
                CategoriesMenuService.prototype.addMenuItem = function (newDomainMenuItem) {
                    return this.api.post(this._domainMenuController, JSON.stringify(newDomainMenuItem));
                };
                CategoriesMenuService.prototype.deleteMenuItem = function (id) {
                    return this.api.delete(this._domainMenuController + ("/" + id));
                };
                CategoriesMenuService.prototype.updateMenuItem = function (menuItem) {
                    return this.api.put(this._domainMenuController, JSON.stringify(menuItem));
                };
                CategoriesMenuService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CategoriesMenuService);
                return CategoriesMenuService;
            }());
            exports_1("CategoriesMenuService", CategoriesMenuService);
        }
    }
});
//# sourceMappingURL=categoriesMenuService.js.map