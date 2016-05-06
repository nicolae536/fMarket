System.register(["angular2/core", "angular2/router", "angular2/common", "ng2-bootstrap/ng2-bootstrap", "rxjs/Observable", "rxjs/add/observable/interval", "./services/authorizationService", "./components/headerComponent/headerComponent", "./services/notificationService", "./models/applicationConstansts", "./services/localStorageService", "./components/footerComponent/footerComponent", "./services/registrationService", "./services/accountService", "./services/categoriesMenuService", "./services/companieTypesService", "./services/demandService", "./services/requestTypeService", "./services/subscribersService", "./services/usersService", "./services/companiesService"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, ng2_bootstrap_1, Observable_1, authorizationService_1, headerComponent_1, notificationService_1, applicationConstansts_1, localStorageService_1, footerComponent_1, registrationService_1, accountService_1, categoriesMenuService_1, companieTypesService_1, demandService_1, requestTypeService_1, subscribersService_1, usersService_1, companiesService_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (headerComponent_1_1) {
                headerComponent_1 = headerComponent_1_1;
            },
            function (notificationService_1_1) {
                notificationService_1 = notificationService_1_1;
            },
            function (applicationConstansts_1_1) {
                applicationConstansts_1 = applicationConstansts_1_1;
            },
            function (localStorageService_1_1) {
                localStorageService_1 = localStorageService_1_1;
            },
            function (footerComponent_1_1) {
                footerComponent_1 = footerComponent_1_1;
            },
            function (registrationService_1_1) {
                registrationService_1 = registrationService_1_1;
            },
            function (accountService_1_1) {
                accountService_1 = accountService_1_1;
            },
            function (categoriesMenuService_1_1) {
                categoriesMenuService_1 = categoriesMenuService_1_1;
            },
            function (companieTypesService_1_1) {
                companieTypesService_1 = companieTypesService_1_1;
            },
            function (demandService_1_1) {
                demandService_1 = demandService_1_1;
            },
            function (requestTypeService_1_1) {
                requestTypeService_1 = requestTypeService_1_1;
            },
            function (subscribersService_1_1) {
                subscribersService_1 = subscribersService_1_1;
            },
            function (usersService_1_1) {
                usersService_1 = usersService_1_1;
            },
            function (companiesService_1_1) {
                companiesService_1 = companiesService_1_1;
            }],
        execute: function() {
            //= {type: "success", dismisable: true, message:""};
            AppComponent = (function () {
                function AppComponent(router, location, notificationService) {
                    var me = this;
                    this.router = router;
                    this.location = location;
                    this._notifications = new Array();
                    this._notificationService = notificationService;
                    this._notificationService.notificationFlux.subscribe(function (event) {
                        me.showDissmisableNotification(event, 5);
                    });
                    //this.startDemadsWatcher();
                }
                AppComponent.prototype.startDemadsWatcher = function () {
                    var me = this;
                    Observable_1.Observable.interval(15 * applicationConstansts_1.ApplicationConstants.SECOND).subscribe(function (success) {
                        me._notificationService.getStatus()
                            .map(function (response) {
                            if (response.text().length > 0) {
                                return response.json();
                            }
                        })
                            .subscribe(function (response) {
                            if (response && response > 0) {
                                me.showDissmisableNotification({
                                    type: "success",
                                    dismisable: true,
                                    message: response + " cereri noi!"
                                }, 3);
                            }
                        }, function (error) {
                        });
                    }, function (error) {
                    });
                };
                AppComponent.prototype.showDissmisableNotification = function (notification, seconds) {
                    var me = this;
                    this._notifications.push(notification);
                    setTimeout(function () {
                        me.closeAlert(notification);
                    }, seconds * applicationConstansts_1.ApplicationConstants.SECOND);
                };
                AppComponent.prototype.closeAlert = function (notification) {
                    var index = this._notifications.indexOf(notification);
                    if (index !== -1) {
                        this._notifications.splice(index, 1);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"application-wrapper\">\n            <header-component></header-component>\n            <div class=\"page-container\">\n                <div *ngFor=\"#notification of _notifications\" class=\"notification-helper\">\n                    <alert [type]=\"notification.type\" dismissible=\"true\" (close)=\"closeAlert(notification)\">\n                        {{notification.message}}\n                    </alert>\n                </div>\n                <router-outlet></router-outlet>\n            </div>\n            <footer-component></footer-component>\n        </div>\n    ",
                        styles: ["\n        .application-wrapper{\n            padding-bottom: 186px;\n            position: relative;\n            min-height: 100vh;\n        }\n        \n        .page-container{\n            margin-top: 50px;\n            padding: 3% 5% 3% 5%;      \n        }\n        \n        .page-container .notification-helper{\n            position: fixed;\n            max-width: 100%;\n            z-index: 10001;\n            right: 6.3%;\n        }\n        \n        \n        @media (max-width: 768px){\n            .application-wrapper{\n                padding-bottom: 286px !important;\n            }\n    }\n    "],
                        directives: [router_1.ROUTER_DIRECTIVES, headerComponent_1.HeaderComponent, ng2_bootstrap_1.Alert, common_1.CORE_DIRECTIVES, footerComponent_1.FooterComponent],
                        providers: [
                            common_1.FormBuilder,
                            notificationService_1.NotificationService,
                            localStorageService_1.LocalStorageService,
                            registrationService_1.RegistrationService,
                            accountService_1.AccountService,
                            authorizationService_1.AuthorizationService,
                            categoriesMenuService_1.CategoriesMenuService,
                            companieTypesService_1.CompanieTypeService,
                            demandService_1.DemandService,
                            registrationService_1.RegistrationService,
                            requestTypeService_1.RequestTypeService,
                            subscribersService_1.SubscribersService,
                            usersService_1.UserService,
                            companiesService_1.CompaniesService
                        ]
                    }),
                    router_1.RouteConfig(authorizationService_1.AuthorizationService.getApplicationRootRoutes()), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location, notificationService_1.NotificationService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map