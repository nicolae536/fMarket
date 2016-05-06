/**
 * Created by nick_ on 4/17/2016.
 */
System.register(["angular2/core", "angular2/router", "../../components/registrationComponent/registrationComponent", "../../services/registrationService", "../../services/notificationService"], function(exports_1, context_1) {
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
    var core_1, router_1, registrationComponent_1, registrationService_1, notificationService_1;
    var folderPath, RegistrationPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (registrationComponent_1_1) {
                registrationComponent_1 = registrationComponent_1_1;
            },
            function (registrationService_1_1) {
                registrationService_1 = registrationService_1_1;
            },
            function (notificationService_1_1) {
                notificationService_1 = notificationService_1_1;
            }],
        execute: function() {
            folderPath = '/app/pages/registrationPage';
            RegistrationPage = (function () {
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
                };
                RegistrationPage.prototype.referenceComponent = function ($event) {
                    this._registrationComponent = $event;
                };
                RegistrationPage.prototype.requestHandler = function (account) {
                    var me = this;
                    this._registrationService.createAccount(account)
                        .map(function (response) {
                        if (response.text()) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._router.navigate(['SuccessRegister']);
                    }, function (error) {
                        me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Inregistrare invalida!' });
                        me._registrationComponent.markAllFieldsAsErrors();
                    });
                };
                RegistrationPage = __decorate([
                    core_1.Component({
                        selector: 'registration-page',
                        templateUrl: folderPath + '/registrationPage.html',
                        directives: [registrationComponent_1.RegistrationComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, registrationService_1.RegistrationService, notificationService_1.NotificationService])
                ], RegistrationPage);
                return RegistrationPage;
            }());
            exports_1("RegistrationPage", RegistrationPage);
        }
    }
});
//# sourceMappingURL=registrationPage.js.map