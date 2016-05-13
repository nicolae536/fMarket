/**
 * Created by nick_ on 4/26/2016.
 */
/**
 * Created by nick_ on 4/17/2016.
 */
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
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var registrationComponent_1 = require("../../../components/registrationComponent/registrationComponent");
var registrationService_1 = require("../../../services/registrationService");
var applicationConstansts_1 = require("../../../models/applicationConstansts");
var localStorageService_1 = require("../../../services/localStorageService");
var notificationService_1 = require("../../../services/notificationService");
var folderPath = '/app/pages/registrationPage';
var LoginPage = (function () {
    function LoginPage(router, registrationService, localStorageService, ntificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._localStorageService = localStorageService;
        this._notificationService = ntificationService;
    }
    LoginPage.prototype.referenceComponent = function ($event) {
        this._registrationComponent = $event;
    };
    LoginPage.prototype.ngOnInit = function () {
        this._showLoginLink = false;
        this._showRememberMeLink = true;
        this._formTitle = 'Intra in cont';
        this._formButtonLabel = 'Intra in cont';
        this._showNewsletterField = false;
        this._passwordLabel = 'Parola';
        this._showRegisterLink = true;
        this._forgetPasswordLabel = 'Click aici pentru a o reseta';
        this._showForgetPasswordLink = true;
        this._loginPage = true;
        this._notificationService.updateBackground(applicationConstansts_1.ApplicationConstants.loginPage);
    };
    LoginPage.prototype.requestHandler = function (account) {
        var me = this;
        this._registrationService.login(account)
            .map(function (response) {
            if (response.text()) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._localStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, response);
            me._router.navigate(['Home']);
        }, function (error) {
            me._notificationService.emitNotificationToRootComponent({ type: "danger", dismisable: true, message: "Date de autentificare incorecte!", timeout: 5 });
            me._registrationComponent.markAllFieldsAsErrors();
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: folderPath + '/registrationPage.html',
            directives: [registrationComponent_1.RegistrationComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, registrationService_1.RegistrationService, localStorageService_1.LocalStorageService, notificationService_1.NotificationService])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=loginPage.js.map