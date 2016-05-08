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
 * Created by nick_ on 4/24/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var fMarketApi_1 = require("./fMarketApi");
var AccountService = (function () {
    function AccountService(http) {
        this._AccountController = '/account';
        this.api = new fMarketApi_1.FMarketApi(http);
    }
    AccountService.prototype.getAccount = function () {
    };
    AccountService.prototype.saveEditedAccount = function (accountDto) {
        return this.api.post(this._AccountController, JSON.stringify(accountDto));
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=accountService.js.map