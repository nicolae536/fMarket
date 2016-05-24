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
var fMarketApi_1 = require("./fMarketApi");
var RequestTypeService = (function () {
    function RequestTypeService(api) {
        this._requestDomains = '/demand/domains';
        this.api = api;
    }
    RequestTypeService.prototype.getRequestTypesWithFilters = function (searchQuery) {
        // + `/?searchQuery=${searchQuery}`
        return this.api.get(this._requestDomains);
    };
    RequestTypeService.prototype.deleteRequestType = function (requestId) {
        return this.api.delete(this._requestDomains + ("/" + requestId));
    };
    RequestTypeService.prototype.editRequestType = function (request) {
        return this.api.put(this._requestDomains + ("/" + request.id), JSON.stringify({ id: request.id, newName: request.name }));
    };
    RequestTypeService.prototype.addRequestType = function (request) {
        return this.api.post(this._requestDomains, JSON.stringify({ name: request }));
    };
    RequestTypeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], RequestTypeService);
    return RequestTypeService;
}());
exports.RequestTypeService = RequestTypeService;
//# sourceMappingURL=requestTypeService.js.map