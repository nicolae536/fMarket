var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var fMarketApi_1 = require("./fMarketApi");
var _ = require("underscore");
var CompaniesService = (function () {
    function CompaniesService(api) {
        this.COMPANIE_CONTROLLER = '/companies';
        this.ADMIN_COMPANIE_CONTROLLER = '/admin' + this.COMPANIE_CONTROLLER;
        this.api = api;
    }
    CompaniesService.prototype.getCompaniesForUsers = function (searchQuery) {
        return this.api.get(this.COMPANIE_CONTROLLER + ("/all?p=" + searchQuery));
    };
    CompaniesService.prototype.getCompanieDetailsForUsers = function (id) {
        return this.api.get(this.COMPANIE_CONTROLLER + ("/details/" + id));
    };
    CompaniesService.prototype.addStarsReviewForUsers = function (review) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/stars', JSON.stringify(review));
    };
    CompaniesService.prototype.addMessageReviewForUsers = function (review) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/stars', JSON.stringify(review));
    };
    CompaniesService.prototype.createCompany = function (newCompanyRequest) {
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(newCompanyRequest));
    };
    CompaniesService.prototype.getCompanyWithFilters = function (searchObject) {
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER + '/search', JSON.stringify(searchObject));
    };
    CompaniesService.prototype.getCompanyDetails = function (companyId) {
        return this.api.get(this.ADMIN_COMPANIE_CONTROLLER + ("" + companyId));
    };
    CompaniesService.prototype.editCompany = function (updatedCompany) {
        return this.api.put(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(updatedCompany));
    };
    CompaniesService.prototype.deleteCompany = function (id) {
        return this.api.delete(this.ADMIN_COMPANIE_CONTROLLER + ("/" + id));
    };
    CompaniesService.prototype.getCompanieDomains = function () {
        return this.api.get('/company/domains');
    };
    CompaniesService.prototype.getDemandDomanins = function () {
        return this.api.get('/demand/domains');
    };
    CompaniesService.prototype.mapNameToSelect2Item = function (array) {
        return _.map(array, function (item) {
            return {
                displayName: item['name'],
                boundItem: item
            };
        });
    };
    CompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], CompaniesService);
    return CompaniesService;
})();
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companiesService.js.map