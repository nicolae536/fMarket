System.register(['angular2/core', 'angular2/http', "./fMarketApi"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, fMarketApi_1;
    var RegistrationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (fMarketApi_1_1) {
                fMarketApi_1 = fMarketApi_1_1;
            }],
        execute: function() {
            RegistrationService = (function () {
                function RegistrationService(http) {
                    this.REGISTRATION_CONTROLLER = '/registration';
                    this.ACCOUNT_CONTROLLER = '/account';
                    this.api = new fMarketApi_1.FMarketApi(http);
                }
                RegistrationService.prototype.createAccount = function (account) {
                    return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify({ email: account.email, password: account.password, subscribe: account.subscribe }));
                };
                RegistrationService.prototype.resetPassword = function (account) {
                    return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({ email: account.email, newPassword: account.password }));
                };
                RegistrationService.prototype.login = function (account) {
                    var credentials = "username=" + account.email + "&password=" + account.password;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    return this.api.post(this.ACCOUNT_CONTROLLER + '/login', credentials, { headers: headers });
                };
                RegistrationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RegistrationService);
                return RegistrationService;
            }());
            exports_1("RegistrationService", RegistrationService);
        }
    }
});
//# sourceMappingURL=registrationService.js.map