System.register(['angular2/core', 'angular2/http', "./mock-providers/mock-City", "./fMarketApi", "rxjs/Observable"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                    this._DemandController = '/admin/demands';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                DemandService.prototype.getCityList = function () {
                    return new Observable_1.Observable(function (observer) {
                        observer.next(mock_City_1.CITYES);
                    });
                };
                DemandService.prototype.createDemand = function (demand) {
                    var beckedDemand = this.convertDemand(demand);
                    return this.api.post(this._DemandController, JSON.stringify(beckedDemand));
                };
                DemandService.prototype.getDemandsWithFilters = function (search) {
                    return this.api.post(this._DemandController + '/search', JSON.stringify(search));
                };
                DemandService.prototype.getUserDemandsWithFilter = function (search) {
                    return this.api.post('/demands/search', JSON.stringify(search));
                };
                DemandService.prototype.getNewDemands = function () {
                    return this.api.get(this._DemandController + '/new');
                };
                DemandService.prototype.getDemandStatuses = function () {
                    return this.api.get(this._DemandController + '/statuses');
                };
                DemandService.prototype.getDemand = function (_demandId) {
                    return this.api.get(this._DemandController + ("/" + _demandId));
                };
                DemandService.prototype.acceptDemand = function (demand) {
                    return this.api.post(this._DemandController + ("/accept/" + demand.id), JSON.stringify(''));
                };
                DemandService.prototype.declineDemand = function (id) {
                    return this.api.post(this._DemandController + ("/decline/" + id), JSON.stringify(''));
                };
                DemandService.prototype.saveDemand = function (demand) {
                    return this.api.put(this._DemandController, JSON.stringify(demand));
                };
                DemandService.prototype.convertDemand = function (demand) {
                    var newDemand = demand;
                    if (!demand) {
                        return null;
                    }
                    newDemand.cities = _.map(demand.cities, function (city) {
                        return city.boundItem['id'];
                    });
                    newDemand.domain = demand.domain && demand.domain.boundItem ? demand.domain.boundItem['id'] : null;
                    return newDemand;
                };
                DemandService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DemandService);
                return DemandService;
            }());
            exports_1("DemandService", DemandService);
        }
    }
});
//# sourceMappingURL=demandService.js.map