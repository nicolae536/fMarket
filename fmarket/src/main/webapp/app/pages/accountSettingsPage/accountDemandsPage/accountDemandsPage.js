"use strict";
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
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var authorizationService_1 = require("../../../services/authorizationService");
var demandService_1 = require("../../../services/demandService");
var requestTypeService_1 = require("../../../services/requestTypeService");
var demandsListPageBase_1 = require("../../adminPage/demandsPage/demandsListPage/demandsListPageBase");
var applicationPath = '/app/pages/accountSettingsPage/accountDemandsPage';
var AccountDemandsPage = (function (_super) {
    __extends(AccountDemandsPage, _super);
    function AccountDemandsPage(demandService, requestTypeService) {
        _super.call(this, demandService, requestTypeService);
    }
    AccountDemandsPage.prototype.ngOnInit = function () {
        this.getUserDemandsWithFilter();
        this.getCities();
        this.getDomains();
    };
    AccountDemandsPage.prototype.ngOnChanges = function (changes) {
    };
    AccountDemandsPage.prototype.getUserDemandsWithFilter = function () {
        var me = this;
        this._demandService.getUserDemandsWithFilter(this._searchObject)
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
    AccountDemandsPage = __decorate([
        core_1.Component({
            selector: 'account-demands-Page',
            templateUrl: applicationPath + '/accountDemandsPage.html'
        }),
        router_deprecated_1.CanActivate(function () {
            return authorizationService_1.AuthorizationService.isLoggedIn();
        }), 
        __metadata('design:paramtypes', [demandService_1.DemandService, requestTypeService_1.RequestTypeService])
    ], AccountDemandsPage);
    return AccountDemandsPage;
}(demandsListPageBase_1.DemandsListPageBase));
exports.AccountDemandsPage = AccountDemandsPage;
//# sourceMappingURL=accountDemandsPage.js.map