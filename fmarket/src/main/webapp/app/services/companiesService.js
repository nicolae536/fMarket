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
/**
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var fMarketApi_1 = require("./fMarketApi");
var CompaniesService = (function () {
    function CompaniesService(http) {
        this.COMPANIE_CONTROLLER = '/companies';
        this.api = new fMarketApi_1.FMarketApi(http);
    }
    CompaniesService.prototype.getCompanies = function (search) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/search', JSON.stringify(search));
    };
    CompaniesService.prototype.getCompanieDetails = function (id) {
        return this.api.get(this.COMPANIE_CONTROLLER + ("/details/" + id));
    };
    CompaniesService.prototype.addStarsReview = function (review) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/stars', JSON.stringify(review));
    };
    CompaniesService.prototype.addMessageReview = function (review) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/stars', JSON.stringify(review));
    };
    CompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompaniesService);
    return CompaniesService;
}());
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companiesService.js.map