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
var router_deprecated_1 = require("@angular/router-deprecated");
var accountEditPage_1 = require("./accountEditPage/accountEditPage");
var accountDemandsPage_1 = require("./accountDemandsPage/accountDemandsPage");
var authorizationService_1 = require("../../services/authorizationService");
var applicationPath = '/app/pages/accountSettingsPage';
var AccountSettingsPage = (function () {
    function AccountSettingsPage(router) {
        this.router = router;
    }
    AccountSettingsPage = __decorate([
        core_1.Component({
            selector: 'account-settings-Page',
            templateUrl: applicationPath + '/accountSettingsPage.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            new router_deprecated_1.Route({
                path: '/details',
                component: accountEditPage_1.AccountEditPage,
                name: 'Details',
                useAsDefault: true
            }),
            new router_deprecated_1.Route({
                path: '/demands',
                component: accountDemandsPage_1.AccountDemandsPage,
                name: 'Demands'
            })
        ]),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn(); }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], AccountSettingsPage);
    return AccountSettingsPage;
}());
exports.AccountSettingsPage = AccountSettingsPage;
//# sourceMappingURL=accountSettingsPage.js.map