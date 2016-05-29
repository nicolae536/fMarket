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
var common_1 = require("@angular/common");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/interval");
var authorizationService_1 = require("./services/authorizationService");
var headerComponent_1 = require("./components/headerComponent/headerComponent");
var notificationService_1 = require("./services/notificationService");
var applicationConstansts_1 = require("./models/applicationConstansts");
var localStorageService_1 = require("./services/localStorageService");
var footerComponent_1 = require("./components/footerComponent/footerComponent");
var registrationService_1 = require("./services/registrationService");
var Roles_1 = require("./models/Roles");
var jqueryService_1 = require("./services/jqueryService");
var _ = require('underscore');
var AppComponent = (function () {
    function AppComponent(router, location, notificationService, registrationService, localeStorageService) {
        this.addItem = true;
        this._registrationService = registrationService;
        this._localeStorageService = localeStorageService;
        var me = this;
        this.router = router;
        this.location = location;
        this._notifications = new Array();
        this._notificationService = notificationService;
        this._notificationService.notificationFlux.subscribe(function (event) {
            event.new = true;
            if (event.timeout) {
                me.showDissmisableNotification(event, event.timeout);
            }
            else {
                console.log(event);
                me._notifications.push(event);
            }
            setTimeout(function () { me._notifications[me._notifications.length - 1]['new'] = false; }, 500);
        });
        _.defer(this.checkApplicationStatus, this);
        //this.startDemadsWatcher();
    }
    AppComponent.prototype.ngOnInit = function () {
        var me = this;
        this._notificationService.firstLoad.subscribe(function (event) {
            if (applicationConstansts_1.ApplicationConstants.FIRST_LOAD) {
                var element = document.getElementById('loadingSpinnerComponent');
                if (!element) {
                    return;
                }
                jqueryService_1.JqueryService.removeElementWithAnimation(element);
            }
        });
    };
    AppComponent.prototype.startDemadsWatcher = function () {
        var me = this;
        //noinspection TypeScriptUnresolvedFunction
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
                        message: response + " cereri noi!",
                        timeout: 5
                    }, 5);
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
    AppComponent.prototype.checkApplicationStatus = function (context) {
        var me = context;
        Observable_1.Observable.interval(60 * applicationConstansts_1.ApplicationConstants.SECOND).subscribe(function (success) {
            context._registrationService.checkIfLoggedIn()
                .map(function (response) {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
                .subscribe(function (response) {
                context._localeStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, response);
            }, function (error) {
                context._localeStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, {
                    email: null,
                    accountType: Roles_1.Role.USER,
                    loggedIn: false
                });
            });
        }, function (error) {
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "                \n        <div class=\"application-wrapper\">\n            <header-component></header-component>\n            <div class=\"page-container\">\n                <div class=\"notification-wrapper\">\n                    <div *ngFor=\"let notification of _notifications\"  class=\"wrapper-inner\">\n                        <div [class.ng-for-item]=\"notification.new\"  class=\"notification-helper\">\n                                <alert [type]=\"notification.type\" dismissible=\"true\" (close)=\"closeAlert(notification)\">\n                                    {{notification.message}}\n                                </alert>\n                        </div>\n                    </div>\n                </div>\n                <router-outlet></router-outlet>\n            </div>\n            <footer-component></footer-component>\n        </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, headerComponent_1.HeaderComponent, ng2_bootstrap_1.AlertComponent, common_1.CORE_DIRECTIVES, footerComponent_1.FooterComponent]
        }),
        router_1.Routes(authorizationService_1.AuthorizationService.getApplicationRootRoutes()), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, notificationService_1.NotificationService, registrationService_1.RegistrationService, localStorageService_1.LocalStorageService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map