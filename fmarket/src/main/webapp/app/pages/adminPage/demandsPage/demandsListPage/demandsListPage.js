System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DemandsListPage;
    return {
        setters:[],
        execute: function() {
            DemandsListPage = (function () {
                function DemandsListPage(_demandService, _requestTypeService) {
                    this._demandsList = new Array();
                    this._demandService = _demandService;
                    this._requestTypeService = _requestTypeService;
                    this._demandsRoute = "";
                }
                DemandsListPage.prototype.getAllDemandsList = function () {
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
                DemandsListPage.prototype.getNewDemandsList = function () {
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
                DemandsListPage.prototype.getCities = function () {
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
                DemandsListPage.prototype.getDomains = function () {
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
                return DemandsListPage;
            }());
            exports_1("DemandsListPage", DemandsListPage);
        }
    }
});
//# sourceMappingURL=demandsListPage.js.map