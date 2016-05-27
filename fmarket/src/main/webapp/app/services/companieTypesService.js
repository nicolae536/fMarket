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
var fMarketApi_1 = require("./fMarketApi");
var CompanieTypeService = (function () {
    function CompanieTypeService(api) {
        this._CompanyDomainController = '/company/domains';
        this.api = api;
    }
    CompanieTypeService.prototype.getCompanyTypesWithFilters = function (searchQuery) {
        return this.api.get(this._CompanyDomainController);
    };
    CompanieTypeService.prototype.deleteCompanyType = function (companyId) {
        return this.api.delete(this._CompanyDomainController + ("/" + companyId));
    };
    CompanieTypeService.prototype.editCompaniType = function (companyDomain) {
        return this.api.put(this._CompanyDomainController, JSON.stringify({ id: companyDomain.id, newName: companyDomain.name }));
    };
    CompanieTypeService.prototype.addCompanyType = function (companyDomain) {
        return this.api.post(this._CompanyDomainController, JSON.stringify({ name: companyDomain }));
    };
    CompanieTypeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], CompanieTypeService);
    return CompanieTypeService;
})();
exports.CompanieTypeService = CompanieTypeService;
//# sourceMappingURL=companieTypesService.js.map