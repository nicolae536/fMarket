/**
 * Created by nick_ on 4/22/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require('@angular/common');
var demandService_1 = require("../../../../services/demandService");
var requestTypeService_1 = require("../../../../services/requestTypeService");
var demandEdit_1 = require("../../../../components/demandComponent/demandEdit/demandEdit");
var notificationService_1 = require("../../../../services/notificationService");
var applicationPath = '/app/pages/adminPage/demandsPage/demandsEditPage';
var DemandsEditPage = (function () {
    function DemandsEditPage(router, _location, demandService, requestTypeService, notificationService) {
        this._location = _location;
        this._notificationService = notificationService;
        this._router = router;
        this._demandService = demandService;
        this._requestTypeService = requestTypeService;
    }
    DemandsEditPage.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        this._demandId = Number(curr.getParam('id'));
    };
    DemandsEditPage.prototype.ngOnInit = function () {
        this.getDemand();
        this.getDomains();
    };
    DemandsEditPage.prototype.getDemand = function () {
        var me = this;
        this._demandService.getDemand(this._demandId)
            .subscribe(function (response) {
            me._demand = response;
        }, function (error) {
        });
    };
    DemandsEditPage.prototype.getDomains = function () {
        var me = this;
        this._demandService.getDemandDomanins()
            .subscribe(function (response) {
            me._demandDomains = me._demandService.mapNameToSelect2Item(response);
        }, function (error) {
            me._demandDomains = new Array();
        });
    };
    DemandsEditPage.prototype.navigateToList = function ($event) {
        this._location.back();
    };
    DemandsEditPage.prototype.acceptDemand = function (demand) {
        var me = this;
        this._demandService.acceptDemand(demand)
            .subscribe(function (response) {
            me._location.back();
            me._notificationService.emitSuccessNotificationToRootComponent('Cerere activata cu success', 3);
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent('Cerere nu a putut fi activata !', 3);
        });
    };
    DemandsEditPage.prototype.rejectDemand = function (id) {
        var me = this;
        this._demandService.declineDemand(id)
            .subscribe(function (response) {
            me._location.back();
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent('Erroare de server cererea nu poate fi refuzata !', 3);
        });
    };
    DemandsEditPage.prototype.saveEditedDemand = function (demand) {
        var me = this;
        this._demandService.saveDemand(demand)
            .subscribe(function (response) {
            me._location.back();
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent('Cerere nu poate fi salvata !', 3);
        });
    };
    DemandsEditPage = __decorate([
        core_1.Component({
            selector: 'demands-edit-page',
            templateUrl: applicationPath + '/demandsEditPage.html',
            styleUrls: [applicationPath + '/demandsEditPage.css'],
            directives: [demandEdit_1.DemandEditComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, demandService_1.DemandService, requestTypeService_1.RequestTypeService, notificationService_1.NotificationService])
    ], DemandsEditPage);
    return DemandsEditPage;
})();
exports.DemandsEditPage = DemandsEditPage;
//# sourceMappingURL=demandsEditPage.js.map