/**
 * Created by nick_ on 4/22/2016.
 */
var _ = require("underscore");
var DemandStatus_1 = require("../../../../models/DemandStatus");
var DemandSearchObject_1 = require("../../../../models/DemandSearchObject");
var DemandsListPageBase = (function () {
    //</editor-fold>
    function DemandsListPageBase(router, _categoriesMenuService, _demandService, _requestTypeService, _localizationService, _notificationService) {
        this.statusList = [{ status: DemandStatus_1.DemandStatus.ACTIVE, displayName: DemandStatus_1.DemandStatus.ACTIVE },
            { status: DemandStatus_1.DemandStatus.CLOSED, displayName: DemandStatus_1.DemandStatus.CLOSED },
            { status: DemandStatus_1.DemandStatus.IN_REVIEW, displayName: DemandStatus_1.DemandStatus.IN_REVIEW },
            { status: DemandStatus_1.DemandStatus.PENDING, displayName: DemandStatus_1.DemandStatus.PENDING },
            { status: DemandStatus_1.DemandStatus.REJECTED, displayName: DemandStatus_1.DemandStatus.REJECTED },
            { status: DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW, displayName: DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW }];
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._notificationService = _notificationService;
        this._demandsRoute = "";
        this._searchObject = new DemandSearchObject_1.DemandSearchObject('', 1, DemandStatus_1.DemandStatus.WAITING_FOR_REVIEW, -1);
        this._searchObject.domainName = "Alege domeniu...";
        this._router = router;
        this._localizationService = _localizationService;
    }
    DemandsListPageBase.prototype.showDomainsDialog = function () {
        this._menuTreeDialog.showMenuTreeDialog();
    };
    DemandsListPageBase.prototype.getAllDemandsList = function () {
        var me = this;
        this._demandService.getDemandsWithFilters(this._searchObject)
            .subscribe(function (response) {
            me._demandsList = response.data;
            me.totalPages = response.totalPages;
            me._searchObject.page = response.page;
        }, function (error) {
        });
    };
    DemandsListPageBase.prototype.getMenuDictionary = function () {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .subscribe(function (response) {
            me.menuDictionary = response;
        }, function (error) {
            me.menuDictionary = [];
        });
    };
    DemandsListPageBase.prototype.getNewDemandsList = function () {
        var me = this;
        this._demandService.getNewDemands()
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
        this._localizationService.getCityList()
            .subscribe(function (response) {
            me._citiesList = me._localizationService.mapNameToSelect2Item(response);
        }, function (error) {
        });
    };
    DemandsListPageBase.prototype.getDomains = function () {
        var me = this;
        this._requestTypeService.getRequestTypesWithFilters()
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
    DemandsListPageBase.prototype.navigateToDemand = function (demand) {
        this._router.navigate([("/admin/cerere-detalii/" + demand.id)]);
    };
    return DemandsListPageBase;
})();
exports.DemandsListPageBase = DemandsListPageBase;
//# sourceMappingURL=demandsListPageBase.js.map