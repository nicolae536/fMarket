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
                CompanieTypeService.prototype.editCompaniType = function (companyDomain) {
                    return this.api.put(this.adminUsersControllerRoute, JSON.stringify({ domain: companyDomain }));
                };
                CompanieTypeService.prototype.addCompanyType = function (companyDomain) {
                    return this.api.put(this.adminUsersControllerRoute, JSON.stringify({ domain: companyDomain }));
                };
                CompanieTypeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CompanieTypeService);
                return CompanieTypeService;
            })();
            exports_1("CompanieTypeService", CompanieTypeService);
        }
    }
});
//# sourceMappingURL=companieTypesService.js.map