/**
 * Created by nick_ on 4/17/2016.
 */
System.register(["angular2/core", "../../../components/registrationComponent/registrationComponent", "../../../services/registrationService", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, registrationComponent_1, registrationService_1, router_1;
    var folderPath, ForgetPasswordPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (registrationComponent_1_1) {
                registrationComponent_1 = registrationComponent_1_1;
            },
            function (registrationService_1_1) {
                registrationService_1 = registrationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            folderPath = '/app/pages/registrationPage';
            ForgetPasswordPage = (function () {
                function ForgetPasswordPage(router, registrationService) {
                    this._router = router;
                    this._registrationService = registrationService;
                }
                ForgetPasswordPage.prototype.ngOnInit = function () {
                    this._showLoginLink = false;
                    this._showRememberMeLink = false;
                    this._showRegisterLink = false;
                    this._formTitle = 'Resetare parola';
                    this._formButtonLabel = 'Reseteaza parola';
                    this._showNewsletterField = false;
                    this._passwordLabel = 'Parola noua';
                    this._showForgetPasswordLink = false;
                    this._forgetPasswordLabel = '';
                };
                ForgetPasswordPage.prototype.requestHandler = function (account) {
                    var me = this;
                    this._registrationService.resetPassword(account)
                        .map(function (response) {
                        if (response.text()) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._router.navigate(['SuccessPasswordReset']);
                    }, function (error) {
                    });
                };
                ForgetPasswordPage = __decorate([
                    core_1.Component({
                        selector: 'forget=password-page',
                        templateUrl: folderPath + '/registrationPage.html',
                        styles: ["\n    .forget-password-page{\n        padding-top: 14vh;\n    }\n    "],
                        directives: [registrationComponent_1.RegistrationComponent],
                        providers: [registrationService_1.RegistrationService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, registrationService_1.RegistrationService])
                ], ForgetPasswordPage);
                return ForgetPasswordPage;
            }());
            exports_1("ForgetPasswordPage", ForgetPasswordPage);
        }
    }
});
//# sourceMappingURL=forgetPasswordPage.js.map