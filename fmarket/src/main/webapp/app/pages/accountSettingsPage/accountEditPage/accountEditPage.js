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
var accountDto_1 = require("../../../models/accountDto");
var accountService_1 = require("../../../services/accountService");
var demandService_1 = require("../../../services/demandService");
var localizationService_1 = require("../../../services/localizationService");
var applicationPath = '/app/pages/accountSettingsPage/accountEditPage';
var AccountEditPage = (function () {
    function AccountEditPage(accountService, demandService, localizationService) {
        this._submitLabel = 'Salveaza contul';
        this._cityesList = new Array();
        this._accountService = accountService;
        this._demandService = demandService;
        this._account = new accountDto_1.AccountDto();
        this._localizationService = localizationService;
    }
    AccountEditPage.prototype.ngOnInit = function () {
        this.getCityList();
    };
    AccountEditPage.prototype.accountEditLoaded = function (accountEditComponent) {
        this._accountEditComponent = accountEditComponent;
    };
    AccountEditPage.prototype.saveEditedAccount = function (editedAccount) {
        var me = this;
        this._accountService.saveEditedAccount(editedAccount)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._account = response;
        }, function (errr) {
        });
    };
    AccountEditPage.prototype.getCityList = function () {
        var me = this;
        this._localizationService.getCityList()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._cityesList = me._localizationService.mapNameToSelect2Item(response);
        }, function (error) {
        });
    };
    AccountEditPage = __decorate([
        core_1.Component({
            selector: 'account-edit-Page',
            templateUrl: applicationPath + '/accountEditPage.html'
        }), 
        __metadata('design:paramtypes', [accountService_1.AccountService, demandService_1.DemandService, localizationService_1.LocalizationService])
    ], AccountEditPage);
    return AccountEditPage;
})();
exports.AccountEditPage = AccountEditPage;
//# sourceMappingURL=accountEditPage.js.map