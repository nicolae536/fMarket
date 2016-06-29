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
 * Created by nick_ on 4/16/2016.
 */
var core_1 = require("@angular/core");
var fMarketApi_1 = require("./fMarketApi");
var _ = require("underscore");
var DemandService = (function () {
    function DemandService(api) {
        this._DemandController = '/admin/demands';
        this.api = api;
    }
    DemandService.prototype.createDemand = function (demand) {
        var beckedDemand = this.convertDemand(demand);
        return this.api.post(this._DemandController, JSON.stringify(beckedDemand));
    };
    DemandService.prototype.createUserDemand = function (demand) {
        var beckedDemand = this.convertToUserDemand(demand);
        return this.api.post('/demands', JSON.stringify(beckedDemand));
    };
    DemandService.prototype.getDemandsWithFilters = function (search) {
        var searchObj = this.getSearchObj(search);
        return this.api.post(this._DemandController + '/search', JSON.stringify(searchObj));
    };
    DemandService.prototype.getUserDemandsWithFilter = function () {
        return this.api.get('/demands');
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
    DemandService.prototype.getDemandDomanins = function () {
        return this.api.get('/demand/domains');
    };
    DemandService.prototype.acceptDemand = function (demand) {
        return this.api.post(this._DemandController + ("/accept/" + demand.id), JSON.stringify(''));
    };
    DemandService.prototype.declineDemand = function (requestReject) {
        return this.api.post(this._DemandController + ("/decline/" + requestReject['id']), JSON.stringify(requestReject));
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
    DemandService.prototype.convertToUserDemand = function (demand) {
        var newDemand = demand;
        if (!demand) {
            return null;
        }
        newDemand.cities = _.map(demand.cities, function (city) {
            return city.boundItem['id'];
        });
        newDemand.domainId = demand.domain && demand['domain']['domainId'] ? demand['domain']['domainId'] : null;
        return newDemand;
    };
    DemandService.prototype.getSearchObj = function (search) {
        var response = {};
        if (search.accountId && !isNaN(parseInt(Number(search.accountId)))) {
            response['accountId'] = search.accountId;
        }
        if (search.page && search.page > 0) {
            response['page'] = search.page;
        }
        if (search.status && search.status.length > 0) {
            response['status'] = search.status;
        }
        if (search.domainId > 0) {
            response['domainId'] = search.domainId;
        }
        return response;
    };
    DemandService.prototype.mapNameToSelect2Item = function (array) {
        return _.map(array, function (item) {
            return {
                displayName: item['name'],
                boundItem: item
            };
        });
    };
    DemandService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], DemandService);
    return DemandService;
}());
exports.DemandService = DemandService;
//# sourceMappingURL=demandService.js.map