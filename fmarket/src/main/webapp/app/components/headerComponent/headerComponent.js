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
/**
 * Created by nick_ on 4/12/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var authorizationService_1 = require("../../services/authorizationService");
var Roles_1 = require("../../models/Roles");
var localStorageService_1 = require("../../services/localStorageService");
var applicationConstansts_1 = require("../../models/applicationConstansts");
var registrationService_1 = require("../../services/registrationService");
var notificationService_1 = require("../../services/notificationService");
var applicationStateService_1 = require("../../services/applicationStateService");
var template = require('./headerComponent.html');
var HeaderComponent = (function () {
    function HeaderComponent(router, localStorageService, registrationService, notificationService, applicationStateService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._applicationStateService = applicationStateService;
        this._localStorageService = localStorageService;
        this._myAccountLabel = 'Contul meu';
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this._usersApplicationPages = [
            { link: '/firme', name: 'Firme' },
        ];
        this.setUserRoutes();
        this.setAdminRoutes();
        var me = this;
        this._localStorageService.storageStateChange.subscribe(function (event) {
            me.resolveChanges(event);
        });
    };
    HeaderComponent.prototype.resolveChanges = function (event) {
        this.setUserRoutes();
        this.setAdminRoutes();
    };
    HeaderComponent.prototype.setAdminRoutes = function () {
        if (!this.isAdminUser()) {
            return;
        }
        this._adminApplicationPages = [
            { link: '/admin/users', name: 'Utilizatori' },
            { link: '/admin/subscribers', name: 'Abonati' },
            { link: '/admin/categorii/meniu', name: 'Categorii' },
            { link: '/admin/cereri/lista', name: 'Cereri' },
            { link: '/admin/companii', name: 'Companii' },
        ];
    };
    HeaderComponent.prototype.setUserRoutes = function () {
        var userState = authorizationService_1.AuthorizationService.getActiveUserState();
        if (!this.isLoggedIn() || !userState) {
            return;
        }
        this._myAccountLabel = userState.email;
        this._myAccountDropdownPages = [
            { link: '/account/demands', name: 'Cererile mele' },
            { link: '/account/details', name: 'Setari' },
        ];
    };
    HeaderComponent.prototype.chechIdNormalUser = function () {
        return authorizationService_1.AuthorizationService.isLoggedIn() && !authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN);
    };
    HeaderComponent.prototype.goToPageUsingSideMenu = function (link) {
        this._router.navigate([link]);
        this.closeNav();
    };
    HeaderComponent.prototype.isLoggedIn = function () {
        return authorizationService_1.AuthorizationService.isLoggedIn();
    };
    HeaderComponent.prototype.openNav = function () {
        var _this = this;
        this.hideImage = true;
        setTimeout(function () {
            _this.sideMenuOpened = true;
        }, 200);
    };
    HeaderComponent.prototype.closeNav = function () {
        var _this = this;
        this.sideMenuOpened = false;
        setTimeout(function () {
            _this.hideImage = false;
        }, 500);
    };
    HeaderComponent.prototype.isAdminUser = function () {
        return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN);
    };
    HeaderComponent.prototype.logoutFromSideMenu = function () {
        this.logout();
        this.closeNav();
    };
    HeaderComponent.prototype.logout = function () {
        var me = this;
        this.closeNav();
        this._registrationService.logout()
            .subscribe(function (response) {
            me._applicationStateService.removeUserSession();
            me._router.navigate(['/']);
        }, function (error) {
            me._notificationService.emitErrorNotificationToRootComponent('Erroare la logout!', 5);
        });
    };
    HeaderComponent.prototype.addDemand = function () {
        this._router.navigate(['/']);
        this._localStorageService.setItem(applicationConstansts_1.ApplicationConstants.NAVIGATE_CREATE_DEMAND, { navigate: true });
    };
    HeaderComponent.prototype.addDemandFromMobile = function () {
        this._router.navigate(['/']);
        this._localStorageService.setItem(applicationConstansts_1.ApplicationConstants.NAVIGATE_CREATE_DEMAND, { navigate: true });
        this.closeNav();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-component',
            template: template,
            directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, localStorageService_1.LocalStorageService, registrationService_1.RegistrationService, notificationService_1.NotificationService, applicationStateService_1.ApplicationStateService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=headerComponent.js.map