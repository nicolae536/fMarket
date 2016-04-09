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
    var RequestTypeService;
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
            RequestTypeService = (function () {
                function RequestTypeService(http) {
                    this.controllerRoute = '/request/types';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                RequestTypeService.prototype.getRequestTypesWithFilters = function (searchQuery) {
                    return this.api.get(this.controllerRoute + ("/?searchQuery=" + searchQuery));
                };
                RequestTypeService.prototype.deleteRequestType = function (requestId) {
                    return this.api.delete(this.controllerRoute + ("/" + requestId));
                };
                RequestTypeService.prototype.editRequestType = function (request) {
                    return this.api.put(this.controllerRoute, JSON.stringify(request));
                };
                RequestTypeService.prototype.addRequestType = function (request) {
                    return this.api.put(this.controllerRoute, JSON.stringify(request));
                };
                RequestTypeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RequestTypeService);
                return RequestTypeService;
            })();
            exports_1("RequestTypeService", RequestTypeService);
        }
    }
});
//# sourceMappingURL=requestTypeService.js.map