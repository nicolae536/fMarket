"use strict";
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
var router_1 = require("@angular/router");
var accountService_1 = require("../../../services/accountService");
var demandService_1 = require("../../../services/demandService");
var localizationService_1 = require("../../../services/localizationService");
var notificationService_1 = require("../../../services/notificationService");
var accountEditComponent_1 = require("../../../components/accountComponent/accountEditComponent/accountEditComponent");
var accountDto_1 = require("../../../models/accountDto");
var authorizationService_1 = require("../../../services/authorizationService");
var template = require('./accountEditPage.html');
var AccountEditPage = (function () {
    //</editor-fold>
    function AccountEditPage(accountService, demandService, localizationService, notificationService, router) {
        this._submitLabel = 'Salveaza contul';
        this._cityesList = new Array();
        this._accountService = accountService;
        this._demandService = demandService;
        this._router = router;
        this._account = accountDto_1.AccountDto.getEmptyInstance();
        this._localizationService = localizationService;
        this._notificationService = notificationService;
    }
    AccountEditPage.prototype.ngOnInit = function () {
        this.getCityList();
        this.getAccountData();
    };
    AccountEditPage.prototype.changePassword = function (editedAccount) {
        var _this = this;
        var me = this;
        if (!editedAccount) {
            this._notificationService.emitWarningNotificationToRootComponent('Complectati corect toate campurile pentru parole inainte de a salva!', 5);
            return;
        }
        this._accountService.changeSelfPassword(editedAccount)
            .subscribe(function (response) {
            me._router.navigate(['/success/success-rest-password']);
        }, function (errr) {
            _this._notificationService.emitErrorNotificationToRootComponent('Contul nu a putut fi salvat cu success.', 5);
        });
    };
    AccountEditPage.prototype.saveEditedAccount = function (editedAccount) {
        var _this = this;
        var me = this;
        if (!editedAccount) {
            this._notificationService.emitWarningNotificationToRootComponent('Complectati toate datele inainte sa salvati contul!', 5);
            return;
        }
        this._accountService.saveEditedAccount(editedAccount)
            .subscribe(function (response) {
            me.getAccountData();
        }, function (errr) {
            _this._notificationService.emitErrorNotificationToRootComponent('Contul nu a putut fi salvat cu success.', 5);
        });
    };
    AccountEditPage.prototype.getCityList = function () {
        var me = this;
        this._localizationService.getCityList()
            .subscribe(function (response) {
            me._cityesList = me._localizationService.extractNameToSelect2Item(response);
        }, function (error) {
        });
    };
    AccountEditPage.prototype.getAccountData = function () {
        var me = this;
        this._accountService.getAccountDetails()
            .subscribe(function (success) {
            success['cityItem'] = { displayName: success['cityName'],
                boundItem: {
                    id: success['cityId'],
                    name: success['cityName'],
                } };
            success['email'] = authorizationService_1.AuthorizationService.getUserEmail();
            me._account = success;
        }, function (error) {
            me._account = accountDto_1.AccountDto.getEmptyInstance();
        });
    };
    AccountEditPage = __decorate([
        core_1.Component({
            selector: 'account-edit-Page',
            template: template,
            directives: [accountEditComponent_1.AccountEditComponent]
        }), 
        __metadata('design:paramtypes', [accountService_1.AccountService, demandService_1.DemandService, localizationService_1.LocalizationService, notificationService_1.NotificationService, router_1.Router])
    ], AccountEditPage);
    return AccountEditPage;
}());
exports.AccountEditPage = AccountEditPage;
//# sourceMappingURL=accountEditPage.js.map