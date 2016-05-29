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
var directoryPath = '/app/components/headerComponent';
var HeaderComponent = (function () {
    function HeaderComponent(router, localStorageService, registrationService, notificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        var me = this;
        this._localStorageService = localStorageService;
        this._localStorageService.storageStateChange.subscribe(function (event) {
            me.resolveChanges(event);
        });
        this._myAccountLabel = 'Contul meu';
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this._usersApplicationPages = [
            { link: '/', name: 'Home' },
        ];
        this.setUserRoutes();
        this.setAdminRoutes();
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
            { link: '/admin/users', name: 'Useri' },
            { link: '/admin/subscribers', name: 'Subscriberi' },
            { link: '/admin/categorii/meniu', name: 'Meniu categorii' },
            { link: '/admin/categorii/firme', name: 'Categorii compani' },
            { link: '/admin/categorii/domenii', name: 'Domenii' },
            { link: '/admin/cereri/newDemands', name: 'Cereri noi' },
            { link: '/admin/cereri/lista', name: 'Cereri' },
            { link: '/admin/companii', name: 'Companii' },
            { link: '/admin/ceeaza-companie/ceeaza', name: 'Adauga compani' }
        ];
    };
    HeaderComponent.prototype.setUserRoutes = function () {
        var userState = authorizationService_1.AuthorizationService.getActiveUserState();
        if (!this.isLoggedIn() || !userState) {
            return;
        }
        this._myAccountLabel = userState.email;
        this._myAccountDropdownPages = [
            { link: '/account/demands', name: 'Anunturile mele' },
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
    HeaderComponent.prototype.logout = function () {
        var me = this;
        this.closeNav();
        this._registrationService.logout()
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._localStorageService.removeItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE);
            me._router.navigate(['/']);
        }, function (error) {
            me._notificationService.emitNotificationToRootComponent({
                type: 'danger',
                dismisable: true,
                message: 'Erroare la logout!',
                timeout: 5
            });
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-component',
            templateUrl: directoryPath + '/headerComponent.html',
            directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, localStorageService_1.LocalStorageService, registrationService_1.RegistrationService, notificationService_1.NotificationService])
    ], HeaderComponent);
    return HeaderComponent;
})();
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=headerComponent.js.map