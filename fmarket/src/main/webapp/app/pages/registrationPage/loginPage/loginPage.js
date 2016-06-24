/**
 * Created by nick_ on 4/26/2016.
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
var router_1 = require("@angular/router");
var applicationStateService_1 = require("../../../services/applicationStateService");
var registrationService_1 = require("../../../services/registrationService");
var notificationService_1 = require("../../../services/notificationService");
var jqueryService_1 = require("../../../services/jqueryService");
var registrationComponent_1 = require("../../../components/registrationComponent/registrationComponent");
var template = require('../registrationPage.html');
var LoginPage = (function () {
    //</editor-fold>
    function LoginPage(router, registrationService, ntificationService, applicationStateService) {
        this._faceBookText = "Logheaza-te cu Facebook";
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = ntificationService;
        this._applicationStateService = applicationStateService;
    }
    LoginPage.prototype.ngAfterViewChecked = function () {
        jqueryService_1.JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
    };
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
        this._notificationService.removeLoading();
    };
    LoginPage.prototype.requestHandler = function (account) {
        var me = this;
        this._registrationService.login(account)
            .subscribe(function (response) {
            me._applicationStateService.setApplicationSessionState(response);
            me._router.navigate(['/']);
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent("Date de autentificare incorecte!", 5);
            me._registrationComponent.markAllFieldsAsErrors({ email: true, password: true });
        });
    };
    LoginPage.prototype.initFLogin = function ($event) {
        var me = this;
        location.assign('/connect/facebook');
        // this._faceBookService.login()
        //     .subscribe(
        //         response=>{
        //
        //         },
        //         error=>{
        //
        //         }
        //     )
    };
    __decorate([
        core_1.ViewChild('registrationPageRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "_registrationPageRef", void 0);
    LoginPage = __decorate([
        core_1.Component({
            selector: 'login-page',
            template: template,
            directives: [registrationComponent_1.RegistrationComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, registrationService_1.RegistrationService, notificationService_1.NotificationService, applicationStateService_1.ApplicationStateService])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=loginPage.js.map