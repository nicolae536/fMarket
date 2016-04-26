/**
 * Created by nick_ on 4/26/2016.
 */
/**
 * Created by nick_ on 4/17/2016.
 */
System.register(["angular2/core", "../../../components/registrationComponent/registrationComponent", "../../../services/registrationService"], function(exports_1, context_1) {
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
    var core_1, registrationComponent_1, registrationService_1;
    var folderPath, LoginPage;
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
            }],
        execute: function() {
            folderPath = '/app/pages/registrationPage';
            LoginPage = (function () {
                function LoginPage(registrationService) {
                    this._registrationService = registrationService;
                }
                LoginPage.prototype.ngOnInit = function () {
                    this._showRememberMeLink = true;
                    this._formTitle = 'Intra in cont';
                    this._formButtonLabel = 'Intra in cont';
                    this._showNewsletterField = false;
                    this._passwordLabel = 'Parola';
                    this._showRegisterLink = true;
                    this._forgetPasswordLabel = 'Ai uitat parola ?';
                    this._showForgetPasswordLink = true;
                };
                LoginPage.prototype.requestHandler = function (account) {
                    this._registrationService.login(account)
                        .map(function (response) {
                        if (response.text()) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                    }, function (error) {
                    });
                };
                LoginPage = __decorate([
                    core_1.Component({
                        selector: 'login-page',
                        templateUrl: folderPath + '/registrationPage.html',
                        providers: [registrationService_1.RegistrationService],
                        directives: [registrationComponent_1.RegistrationComponent]
                    }), 
                    __metadata('design:paramtypes', [registrationService_1.RegistrationService])
                ], LoginPage);
                return LoginPage;
            }());
            exports_1("LoginPage", LoginPage);
        }
    }
});
//# sourceMappingURL=loginPage.js.map