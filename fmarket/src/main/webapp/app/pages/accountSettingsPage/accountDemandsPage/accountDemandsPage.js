var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
 * Created by nick_ on 4/26/2016.
 */
var _ = require('underscore');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var demandService_1 = require("../../../services/demandService");
var requestTypeService_1 = require("../../../services/requestTypeService");
var categoriesMenuService_1 = require("../../../services/categoriesMenuService");
var localizationService_1 = require("../../../services/localizationService");
var notificationService_1 = require("../../../services/notificationService");
var demandsListPageBase_1 = require("../../adminPage/demandsPage/demandsListPage/demandsListPageBase");
var DemandStatus_1 = require("../../../models/DemandStatus");
var applicationPath = '/app/pages/accountSettingsPage/accountDemandsPage';
var AccountDemandsPage = (function (_super) {
    __extends(AccountDemandsPage, _super);
    //</editor-fold>
    function AccountDemandsPage(router, _categoriesMenuService, _demandService, _requestTypeService, localizationService, _notificationService) {
        _super.call(this, router, _categoriesMenuService, _demandService, _requestTypeService, localizationService, _notificationService);
    }
    AccountDemandsPage.prototype.ngOnInit = function () {
        this.getUserDemandsWithFilter();
    };
    AccountDemandsPage.prototype.ngOnChanges = function (changes) {
    };
    AccountDemandsPage.prototype.getDemandsWithFilter = function (filtru) {
        var me = this;
        this.selectedFilter = filtru;
        this._demandService.getUserDemandsWithFilter()
            .subscribe(function (response) {
            me.backendDemands = response;
            me.fatchDemandsUsingFilters();
        }, function (reject) {
        });
    };
    AccountDemandsPage.prototype.fatchDemandsUsingFilters = function () {
        switch (this.selectedFilter) {
            case DemandStatus_1.DemandStatus.ACTIVE:
                this.filterDemands([DemandStatus_1.DemandStatus.ACTIVE]);
                break;
            case DemandStatus_1.DemandStatus.PENDING + '&&' + DemandStatus_1.DemandStatus.IN_REVIEW:
                this.filterDemands([DemandStatus_1.DemandStatus.PENDING, DemandStatus_1.DemandStatus.IN_REVIEW]);
                break;
            case DemandStatus_1.DemandStatus.REJECTED + '&&' + DemandStatus_1.DemandStatus.CLOSED:
                this.filterDemands([DemandStatus_1.DemandStatus.REJECTED, DemandStatus_1.DemandStatus.CLOSED]);
                break;
        }
    };
    AccountDemandsPage.prototype.filterDemands = function (filters) {
        var me = this;
        var colector = [];
        _.each(filters, function (filter) {
            var filtredDemands = _.where(me._demandsList, { status: filter });
            colector = colector.concat(filtredDemands);
        });
        this._demandsList = colector;
    };
    AccountDemandsPage.prototype.getUserDemandsWithFilter = function () {
        var me = this;
        this._demandService.getUserDemandsWithFilter()
            .subscribe(function (response) {
            me._demandsList = response;
        }, function (error) {
        });
    };
    AccountDemandsPage = __decorate([
        core_1.Component({
            selector: 'account-demands-Page',
            templateUrl: applicationPath + '/accountDemandsPage.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, categoriesMenuService_1.CategoriesMenuService, demandService_1.DemandService, requestTypeService_1.RequestTypeService, localizationService_1.LocalizationService, notificationService_1.NotificationService])
    ], AccountDemandsPage);
    return AccountDemandsPage;
})(demandsListPageBase_1.DemandsListPageBase);
exports.AccountDemandsPage = AccountDemandsPage;
//# sourceMappingURL=accountDemandsPage.js.map