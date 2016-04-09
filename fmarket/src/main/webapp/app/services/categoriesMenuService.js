System.register(['angular2/core', 'angular2/http', "./fMarketApi"], function(exports_1) {
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
            })();
            exports_1("CategoriesMenuService", CategoriesMenuService);
        }
    }
});
//# sourceMappingURL=categoriesMenuService.js.map