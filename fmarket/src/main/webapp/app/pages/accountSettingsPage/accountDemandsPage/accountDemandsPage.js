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
var demandService_1 = require("../../../services/demandService");
var DemandStatus_1 = require("../../../models/DemandStatus");
var demandListBase_1 = require("../../../components/demandComponent/demandListBase/demandListBase");
var applicationPath = '/app/pages/accountSettingsPage/accountDemandsPage';
var AccountDemandsPage = (function () {
    //</editor-fold>
    function AccountDemandsPage(_demandService) {
        this._demandService = _demandService;
    }
    AccountDemandsPage.prototype.ngOnInit = function () {
        this.getDemandsWithFilter(DemandStatus_1.DemandStatus.ACTIVE);
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
            var filtredDemands = _.where(me.backendDemands, { status: filter });
            colector = colector.concat(filtredDemands);
        });
        this._demandsList = colector;
    };
    AccountDemandsPage = __decorate([
        core_1.Component({
            selector: 'account-demands-Page',
            templateUrl: applicationPath + '/accountDemandsPage.html',
            directives: [demandListBase_1.DemandListBaseComponent]
        }), 
        __metadata('design:paramtypes', [demandService_1.DemandService])
    ], AccountDemandsPage);
    return AccountDemandsPage;
})();
exports.AccountDemandsPage = AccountDemandsPage;
//# sourceMappingURL=accountDemandsPage.js.map