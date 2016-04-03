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
    var CompanieTypeService;
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
            CompanieTypeService = (function () {
                function CompanieTypeService(http) {
                    this.adminUsersControllerRoute = '/company/types';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                CompanieTypeService.prototype.getCompanyTypesWithFilters = function (searchQuery) {
                    return this.api.get(this.adminUsersControllerRoute + ("/?searchQuery=" + searchQuery));
                };
                CompanieTypeService.prototype.deleteCompanyType = function (companyId) {
                    return this.api.delete(this.adminUsersControllerRoute + ("/" + companyId));
                };
                CompanieTypeService.prototype.editCompaniType = function (company) {
                    return this.api.put(this.adminUsersControllerRoute, JSON.stringify(company));
                };
                CompanieTypeService.prototype.addCompanyType = function (companyName) {
                    return this.api.put(this.adminUsersControllerRoute, JSON.stringify(company));
                };
                CompanieTypeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CompanieTypeService);
                return CompanieTypeService;
            }());
            exports_1("CompanieTypeService", CompanieTypeService);
        }
    }
});
//# sourceMappingURL=companieTypesService.js.map