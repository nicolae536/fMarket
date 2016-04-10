System.register(['angular2/core', 'angular2/http', "./fMarketApi"], function(exports_1) {
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