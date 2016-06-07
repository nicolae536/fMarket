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
 * Created by nick_ on 4/24/2016.
 */
var core_1 = require("@angular/core");
var fMarketApi_1 = require("./fMarketApi");
var AccountService = (function () {
    function AccountService(api) {
        this._AccountController = '/accounts';
        this.api = api;
    }
    AccountService.prototype.getAccount = function () {
        return this.api.get(this._AccountController + '/user');
    };
    AccountService.prototype.saveEditedAccount = function (accountDto) {
        console.log('edit-request');
        return this.api.put(this._AccountController + '/self/update', JSON.stringify({
            name: accountDto.name,
            cityId: accountDto.cityId,
            phone: accountDto.phone
        }));
    };
    AccountService.prototype.changePassword = function (accountDto) {
        console.log('changepassword-request');
        return this.api.post(this._AccountController + '/changepassword-1', JSON.stringify({
            email: accountDto.email,
            oldPassword: accountDto.lastPassword,
            newPassword: accountDto.newPassword,
            newPasswordConfirm: accountDto.confirmNewPassword
        }));
    };
    AccountService.prototype.getAccountDetails = function () {
        return this.api.get(this._AccountController + '/self/details');
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], AccountService);
    return AccountService;
})();
exports.AccountService = AccountService;
//# sourceMappingURL=accountService.js.map