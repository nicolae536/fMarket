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
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import {RouteParams, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
var registrationService_1 = require("../../../services/registrationService");
var notificationService_1 = require("../../../services/notificationService");
var localStorageService_1 = require("../../../services/localStorageService");
var applicationConstansts_1 = require("../../../models/applicationConstansts");
var Roles_1 = require("../../../models/Roles");
var jqueryService_1 = require("../../../services/jqueryService");
var TokenConfirmPage = (function () {
    function TokenConfirmPage(router, registrationService, notificationService, localeStorageService) {
        this.showTokenError = false;
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._localeStorageService = localeStorageService;
    }
    TokenConfirmPage.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        var token = this.getParameterByName('token', location.href);
        this.validateToken(token);
        jqueryService_1.JqueryService.removeElementWithAnimation('#' + applicationConstansts_1.ApplicationConstants.LOADING_SPINNER);
    };
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
                me._notificationService.emitNotificationToRootComponent({
                    type: 'danger',
                    dismisable: true,
                    message: 'Serverul nu a returnat userul autentificat!',
                    timeout: 5
                });
                me._localeStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, { email: null, accountType: Roles_1.Role.USER, loggedIn: false });
                return;
            }
            me._localeStorageService.setItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE, response);
            me._notificationService.emitNotificationToRootComponent({
                type: 'success',
                dismisable: true,
                message: 'Cont activat cu succes.',
                timeout: 5
            });
            me._router.navigate(['/']);
        }, function (error) {
            me.showTokenError = true;
        });
    };
    TokenConfirmPage.prototype.getParameterByName = function (name, url) {
        debugger;
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    TokenConfirmPage = __decorate([
        core_1.Component({
            selector: 'token-confirm',
            templateUrl: '/app/pages/registrationPage/errorPages/errorActivateTokenPage.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, registrationService_1.RegistrationService, notificationService_1.NotificationService, localStorageService_1.LocalStorageService])
    ], TokenConfirmPage);
    return TokenConfirmPage;
}());
exports.TokenConfirmPage = TokenConfirmPage;
//# sourceMappingURL=tokenConfirmPage.js.map