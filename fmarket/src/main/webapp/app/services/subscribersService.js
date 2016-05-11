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
var http_1 = require('@angular/http');
var fMarketApi_1 = require("./fMarketApi");
var SubscribersService = (function () {
    function SubscribersService(http) {
        this.apiSubscribersControllerUrl = "/admin/subscribers";
        this.apiUserSubscribeController = "/subscribers";
        this.api = new fMarketApi_1.FMarketApi(http);
    }
    SubscribersService.prototype.getSubscribersWithFilters = function (id, email, currentPageIndex, sortKey, ascendingOrder) {
        var filterObject = {
            id: id,
            email: email == "" ? null : email,
            sortKey: sortKey.length > 0 ? sortKey : null,
            desc: !ascendingOrder
        };
        return this.api.post(this.apiSubscribersControllerUrl + ("/search?page=" + currentPageIndex), JSON.stringify(filterObject));
    };
    SubscribersService.prototype.subscribe = function (email) {
        return this.api.post(this.apiSubscribersControllerUrl, JSON.stringify({ email: email }));
    };
    SubscribersService.prototype.unsubscribe = function (id) {
        return this.api.put(this.apiSubscribersControllerUrl + ("/" + id + "/unsubscribe"), "");
    };
    SubscribersService.prototype.delete = function (id) {
        return this.api.delete(this.apiSubscribersControllerUrl + ("/" + id));
    };
    SubscribersService.prototype.subscribeTowebsite = function (email) {
        return this.api.post(this.apiUserSubscribeController, JSON.stringify(email));
    };
    SubscribersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SubscribersService);
    return SubscribersService;
}());
exports.SubscribersService = SubscribersService;
//# sourceMappingURL=subscribersService.js.map