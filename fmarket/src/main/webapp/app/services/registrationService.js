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
 * Created by nick_ on 4/17/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var fMarketApi_1 = require("./fMarketApi");
var RegistrationService = (function () {
    function RegistrationService(api) {
        this.REGISTRATION_CONTROLLER = '/registration';
        this.ACCOUNT_CONTROLLER = '/account';
        this.api = api;
    }
    RegistrationService.prototype.createAccount = function (account) {
        var newAccount = account ? { email: account.email, password: account.passwords.password, subscribe: account.subscribe } : { email: null, password: null, subscribe: null };
        return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify(newAccount));
    };
    RegistrationService.prototype.resetPassword = function (account) {
        var newAccount = account ? { email: account.email, newPassword: account.passwords.password } : { email: null, newPassword: null };
        return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({ email: account.email, newPassword: account.passwords.password }));
    };
    RegistrationService.prototype.login = function (account) {
        var newAccount = account ? account : { email: null, passwords: { password: null }, rememberMe: null };
        var credentials = "username=" + newAccount.email + "&password=" + newAccount.passwords.password + "&remember-me=" + newAccount.rememberMe;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Login-Ajax-call', "true");
        return this.api.post('/login', credentials, { headers: headers });
    };
    RegistrationService.prototype.logout = function () {
        return this.api.post('/logout', '');
    };
    RegistrationService.prototype.validateToken = function (token) {
        return this.api.get('/confirm' + this.REGISTRATION_CONTROLLER + ("?token=" + token));
    };
    RegistrationService.prototype.confirmPasswordChangeToken = function (token) {
        return this.api.get('/confirm/passwordchange' + ("?token=" + token));
    };
    RegistrationService.prototype.confirmDemandChangeToken = function (token) {
        return this.api.get('/confirm/demand' + ("?token=" + token));
    };
    RegistrationService.prototype.checkIfLoggedIn = function () {
        return this.api.get('/accounts/user');
    };
    RegistrationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], RegistrationService);
    return RegistrationService;
})();
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registrationService.js.map