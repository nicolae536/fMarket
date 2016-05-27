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
// import {CanActivate} from "@angular/router-deprecated";
var router_1 = require("@angular/router");
var demandService_1 = require("../../../services/demandService");
var requestTypeService_1 = require("../../../services/requestTypeService");
var demandsListPageBase_1 = require("../../adminPage/demandsPage/demandsListPage/demandsListPageBase");
var categoriesMenuService_1 = require("../../../services/categoriesMenuService");
var localizationService_1 = require("../../../services/localizationService");
var applicationPath = '/app/pages/accountSettingsPage/accountDemandsPage';
var AccountDemandsPage = (function (_super) {
    __extends(AccountDemandsPage, _super);
    function AccountDemandsPage(router, _categoriesMenuService, _demandService, _requestTypeService, localizationService) {
        _super.call(this, router, _categoriesMenuService, _demandService, _requestTypeService, localizationService);
    }
    AccountDemandsPage.prototype.ngOnInit = function () {
        this.getUserDemandsWithFilter();
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
        __metadata('design:paramtypes', [router_1.Router, categoriesMenuService_1.CategoriesMenuService, demandService_1.DemandService, requestTypeService_1.RequestTypeService, localizationService_1.LocalizationService])
    ], AccountDemandsPage);
    return AccountDemandsPage;
})(demandsListPageBase_1.DemandsListPageBase);
exports.AccountDemandsPage = AccountDemandsPage;
//# sourceMappingURL=accountDemandsPage.js.map