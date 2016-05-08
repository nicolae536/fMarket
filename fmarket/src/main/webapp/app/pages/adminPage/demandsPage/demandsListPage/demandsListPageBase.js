"use strict";
var DemandsListPageBase = (function () {
    function DemandsListPageBase(_demandService, _requestTypeService) {
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._demandsRoute = "";
    }
    DemandsListPageBase.prototype.getAllDemandsList = function () {
        var me = this;
        this._demandService.getDemandsWithFilters(this._searchObject)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._demandsList = response;
        }, function (error) {
        });
    };
    DemandsListPageBase.prototype.getNewDemandsList = function () {
        var me = this;
        this._demandService.getNewDemands()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._demandsList = response;
        }, function (error) {
        });
    };
    DemandsListPageBase.prototype.getCities = function () {
        var me = this;
        this._demandService.getCityList()
            .subscribe(function (response) {
            me._cityesList = _.map(response, function (city) {
                return {
                    displayName: city['name'],
                    boundItem: city
                };
            });
        }, function (error) {
        });
    };
    DemandsListPageBase.prototype.getDomains = function () {
        var me = this;
        this._requestTypeService.getRequestTypesWithFilters()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._domainsList = _.map(response, function (domain) {
                return {
                    displayName: domain['name'],
                    boundItem: domain
                };
            });
        }, function (error) {
        });
    };
    return DemandsListPageBase;
}());
exports.DemandsListPageBase = DemandsListPageBase;
//# sourceMappingURL=demandsListPageBase.js.map