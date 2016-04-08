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
    var SubscribersService;
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
            SubscribersService = (function () {
                function SubscribersService(http) {
                    this.apiSubscribersControllerUrl = "/admin/subscribers";
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                SubscribersService.prototype.getSubscribersWithFilters = function (id, email, currentPageIndex, sortKey, ascendingOrder) {
                    var filterObject = { id: id, email: email == "" ? null : email, sortKey: sortKey, desc: !ascendingOrder };
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
                SubscribersService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SubscribersService);
                return SubscribersService;
            })();
            exports_1("SubscribersService", SubscribersService);
        }
    }
});
//# sourceMappingURL=subscribersService.js.map