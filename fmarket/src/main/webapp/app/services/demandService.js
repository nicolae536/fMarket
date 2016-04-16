System.register(['angular2/core', 'angular2/http', "./mock-providers/mock-City", "./fMarketApi", "rxjs/Observable"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, mock_City_1, fMarketApi_1, Observable_1;
    var DemandService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (mock_City_1_1) {
                mock_City_1 = mock_City_1_1;
            },
            function (fMarketApi_1_1) {
                fMarketApi_1 = fMarketApi_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            DemandService = (function () {
                function DemandService(http) {
                    this._DemandController = '/demand';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                DemandService.prototype.getCityList = function () {
                    return new Observable_1.Observable(function (observer) {
                        observer.next(mock_City_1.CITYES);
                    });
                };
                DemandService.prototype.createDemand = function (demand) {
                    return this.api.post(this._DemandController, JSON.stringify(demand));
                };
                DemandService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DemandService);
                return DemandService;
            })();
            exports_1("DemandService", DemandService);
        }
    }
});
//# sourceMappingURL=demandService.js.map