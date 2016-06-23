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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var applicationStateService_1 = require("./applicationStateService");
var FMarketApi = (function () {
    function FMarketApi(http, applicationStateService) {
        this.http = http;
        this._applicationStateService = applicationStateService;
    }
    FMarketApi.prototype.request = function (url, options) {
        return this.http.request(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.get = function (url, options) {
        return this.http.get(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.post = function (url, body, options) {
        return this.http.post(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.put = function (url, body, options) {
        return this.http.put(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.delete = function (url, options) {
        return this.http.delete(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.patch = function (url, body, options) {
        return this.http.patch(url, body, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.head = function (url, options) {
        return this.http.head(url, this.getRequestOptions(options)).map(this.responseMessageHandler);
    };
    FMarketApi.prototype.responseMessageHandler = function (response) {
        if (response.status === 401) {
            this._applicationStateService.removeUserSession();
        }
        if (response && response.text instanceof Function && response.text().length > 0) {
            return response.json();
        }
    };
    FMarketApi.prototype.getRequestOptions = function (options) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var fmarketClientOptions = options ? options : { headers: null };
        if (fmarketClientOptions && fmarketClientOptions.headers && (fmarketClientOptions.headers.get('Content-Type') || fmarketClientOptions.headers.get('content-type'))) {
            return fmarketClientOptions;
        }
        fmarketClientOptions.headers = headers;
        return fmarketClientOptions;
    };
    FMarketApi = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, applicationStateService_1.ApplicationStateService])
    ], FMarketApi);
    return FMarketApi;
}());
exports.FMarketApi = FMarketApi;
//# sourceMappingURL=fMarketApi.js.map