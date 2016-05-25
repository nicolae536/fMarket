"use strict";
///<reference path="../pages/registrationPage/successPages/successResetPasswordPage.ts"/>
/**
 * Created by nick_ on 5/5/2016.
 */
var router_deprecated_1 = require("@angular/router-deprecated");
var applicationConstansts_1 = require("../models/applicationConstansts");
var homePage_1 = require("../pages/homePage/homePage");
var registrationPage_1 = require("../pages/registrationPage/registrationPage");
var loginPage_1 = require("../pages/registrationPage/loginPage/loginPage");
var forgetPasswordPage_1 = require("../pages/registrationPage/forgetPasswordPage/forgetPasswordPage");
var adminPage_1 = require("../pages/adminPage/adminPage");
var accountSettingsPage_1 = require("../pages/accountSettingsPage/accountSettingsPage");
var successPage_1 = require("../pages/registrationPage/successPages/successPage");
var tokenConfirmPage_1 = require("../pages/registrationPage/tokenConfirmPage/tokenConfirmPage");
var AuthorizationService = (function () {
    function AuthorizationService() {
    }
    AuthorizationService.getUserRole = function () {
        var activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return 'USER';
        }
        return activeUserState.accountType;
    };
    AuthorizationService.hasRole = function (userRole) {
        return this.getUserRole() === userRole;
    };
    AuthorizationService.getUserEmail = function () {
        var activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return null;
        }
        return activeUserState.email;
    };
    AuthorizationService.isLoggedIn = function () {
        var activeUserState = this.getActiveUserState();
        if (!activeUserState) {
            return false;
        }
        return activeUserState.loggedIn;
    };
    AuthorizationService.getActiveUserState = function () {
        try {
            var activeUserState = localStorage.getItem(applicationConstansts_1.ApplicationConstants.ACTIVE_USER_STATE);
            return JSON.parse(activeUserState);
        }
        catch (error) {
            return null;
        }
    };
    AuthorizationService.getApplicationRootRoutes = function () {
        var applicationRoutes = [
            new router_deprecated_1.Route({
                path: '/',
                name: 'Home',
                component: homePage_1.HomePage,
                useAsDefault: true
            }),
            new router_deprecated_1.Route({
                path: '/registration',
                name: 'Registration',
                component: registrationPage_1.RegistrationPage
            }),
            new router_deprecated_1.Route({
                path: '/login',
                name: 'Login',
                component: loginPage_1.LoginPage
            }),
            new router_deprecated_1.Route({
                path: '/forget-password',
                name: 'ForgetPassword',
                component: forgetPasswordPage_1.ForgetPasswordPage
            }),
            new router_deprecated_1.Route({
                path: '/success/:succesOption',
                name: 'Success',
                component: successPage_1.SuccessPage
            }),
            new router_deprecated_1.Route({
                path: '/admin/...',
                name: 'Admin',
                component: adminPage_1.AdminPage
            }),
            new router_deprecated_1.Route({
                path: '/account/...',
                name: 'Account',
                component: accountSettingsPage_1.AccountSettingsPage
            }),
            new router_deprecated_1.Route({
                path: '/confirm/registration',
                name: 'TokenConfirmation',
                component: tokenConfirmPage_1.TokenConfirmPage
            })];
        //
        // if (AuthorizationService.isLoggedIn() && AuthorizationService.getActiveUserState() === "ADMIN") {
        //     applicationRoutes.push(new Route({
        //         path: '/admin/...',
        //         name: 'Admin',
        //         component: AdminPage
        //     }));
        // }
        //
        // if (AuthorizationService.isLoggedIn()) {
        //     applicationRoutes.push(
        //         new Route({
        //             path: '/account/...',
        //             name: 'Account',
        //             component: AccountSettingsPage
        //         }));
        // }
        return applicationRoutes;
    };
    return AuthorizationService;
}());
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorizationService.js.map