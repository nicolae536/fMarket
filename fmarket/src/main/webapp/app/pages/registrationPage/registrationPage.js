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
var registrationComponent_1 = require("../../components/registrationComponent/registrationComponent");
var registrationService_1 = require("../../services/registrationService");
var notificationService_1 = require("../../services/notificationService");
var applicationConstansts_1 = require("../../models/applicationConstansts");
var jqueryService_1 = require("../../services/jqueryService");
var folderPath = '/app/pages/registrationPage';
var RegistrationPage = (function () {
    function RegistrationPage(router, registrationService, notificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
    }
    RegistrationPage.prototype.ngOnInit = function () {
        this._showLoginLink = true;
        this._showRememberMeLink = false;
        this._formTitle = 'Creeaza cont';
        this._formButtonLabel = 'Inregistreaza';
        this._showNewsletterField = true;
        this._passwordLabel = 'Parola';
        this._forgetPasswordLabel = '';
        this._showForgetPasswordLink = false;
        this._showRegisterLink = false;
        this._loginPage = false;
        this._notificationService.updateBackground(applicationConstansts_1.ApplicationConstants.loginPage);
    };
    RegistrationPage.prototype.ngAfterViewChecked = function () {
        jqueryService_1.JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
    };
    RegistrationPage.prototype.referenceComponent = function ($event) {
        this._registrationComponent = $event;
    };
    RegistrationPage.prototype.requestHandler = function (account) {
        var me = this;
        if (!account) {
            me;
            me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Va rugam complecatati correct toate fieldurile pentru a va inregistra', timeout: 5 });
            return;
        }
        this._registrationService.createAccount(account)
            .map(function (response) {
            if (response.text()) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._router.navigate(['SuccessRegister']);
        }, function (error) {
            me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Inregistrare invalida!', timeout: 5 });
        });
    };
    __decorate([
        core_1.ViewChild('registrationPageRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationPage.prototype, "_registrationPageRef", void 0);
    RegistrationPage = __decorate([
        core_1.Component({
            selector: 'registration-page',
            templateUrl: folderPath + '/registrationPage.html',
            directives: [registrationComponent_1.RegistrationComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, registrationService_1.RegistrationService, notificationService_1.NotificationService])
    ], RegistrationPage);
    return RegistrationPage;
}());
exports.RegistrationPage = RegistrationPage;
//# sourceMappingURL=registrationPage.js.map