System.register(["angular2/core", "../../../services/registrationService", "angular2/router", "../../../services/notificationService", "../../../services/localStorageService", "../../../models/applicationConstansts"], function(exports_1, context_1) {
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
    var core_1, registrationService_1, router_1, notificationService_1, localStorageService_1, applicationConstansts_1;
    var TokenConfirmPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (registrationService_1_1) {
                registrationService_1 = registrationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (notificationService_1_1) {
                notificationService_1 = notificationService_1_1;
            },
            function (localStorageService_1_1) {
                localStorageService_1 = localStorageService_1_1;
            },
            function (applicationConstansts_1_1) {
                applicationConstansts_1 = applicationConstansts_1_1;
            }],
        execute: function() {
            TokenConfirmPage = (function () {
                function TokenConfirmPage(router, params, registrationService, notificationService, localeStorageService) {
                    this._router = router;
                    this._registrationService = registrationService;
                    this._notificationService = notificationService;
                    this._localeStorageService = localeStorageService;
                    this.validateToken(params.get('token'));
                }
                TokenConfirmPage.prototype.validateToken = function (token) {
                    var me = this;
                    this._registrationService.validateToken(token)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        if (!response) {
                            return;
                        }
                        me._localeStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, response);
                        me._notificationService.emitNotificationToRootComponent({
                            type: 'success',
                            dismisable: true,
                            message: 'Cont activat cu succes.'
                        });
                        me._router.navigate(['Home']);
                    }, function (error) {
                        me._notificationService.emitNotificationToRootComponent({
                            type: 'danger',
                            dismisable: true,
                            message: 'Tokenul este invalid'
                        });
                        me._router.navigate(['Registration']);
                    });
                };
                TokenConfirmPage = __decorate([
                    core_1.Component({
                        selector: 'token-confirm',
                        template: ''
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, registrationService_1.RegistrationService, notificationService_1.NotificationService, localStorageService_1.LocalStorageService])
                ], TokenConfirmPage);
                return TokenConfirmPage;
            }());
            exports_1("TokenConfirmPage", TokenConfirmPage);
        }
    }
});
//# sourceMappingURL=tokenConfirmPage.js.map