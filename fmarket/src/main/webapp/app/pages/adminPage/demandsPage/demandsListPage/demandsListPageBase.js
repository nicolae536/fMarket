"use strict";
var _ = require('underscore');
var DemandStatus_1 = require("../../../../models/DemandStatus");
var DemandsListPageBase = (function () {
    function DemandsListPageBase(_categoriesMenuService, _demandService, _requestTypeService) {
        this.statusList = [{ status: DemandStatus_1.DemandStatus.ACTIVE, displayName: DemandStatus_1.DemandStatus.ACTIVE },
            { status: DemandStatus_1.DemandStatus.CLOSED, displayName: DemandStatus_1.DemandStatus.CLOSED },
            { status: DemandStatus_1.DemandStatus.IN_REVIEW, displayName: DemandStatus_1.DemandStatus.IN_REVIEW },
            { status: DemandStatus_1.DemandStatus.PENDING, displayName: DemandStatus_1.DemandStatus.PENDING },
            { status: DemandStatus_1.DemandStatus.REJECTED, displayName: DemandStatus_1.DemandStatus.REJECTED },
            { status: DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW, displayName: DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW }];
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._demandsRoute = "";
        this._searchObject = { page: 1, accountId: '', status: DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW };
    }
    DemandsListPageBase.prototype.showDomainsDialog = function () {
        this._menuTreeDialog.showMenuTreeDialog();
    };
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
    DemandsListPageBase.prototype.getMenuDictionary = function () {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(function (response) {
            me.menuDictionary = response;
        }, function (error) {
            me.menuDictionary = [];
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
    DemandsListPageBase.prototype.referenceDialogInDemandComponent = function (menuItemsModal) {
        this._menuTreeDialog = menuItemsModal;
    };
    DemandsListPageBase.prototype.selectItemUsingMenu = function (item) {
        this._searchObject.domainName = item.name;
        this._searchObject.domainId = item.domainId;
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