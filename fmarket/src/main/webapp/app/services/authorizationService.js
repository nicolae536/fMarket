System.register(["angular2/router", "../models/applicationConstansts", "../pages/homePage/homePage", "../pages/registrationPage/registrationPage", "../pages/registrationPage/loginPage/loginPage", "../pages/registrationPage/forgetPasswordPage/forgetPasswordPage", "../pages/adminPage/adminPage", "../pages/accountSettingsPage/accountSettingsPage", "../pages/registrationPage/successPages/successRegisterPage", "../pages/registrationPage/successPages/successResetPasswordPage"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, applicationConstansts_1, homePage_1, registrationPage_1, loginPage_1, forgetPasswordPage_1, adminPage_1, accountSettingsPage_1, successRegisterPage_1, successResetPasswordPage_1;
    var AuthorizationService;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (applicationConstansts_1_1) {
                applicationConstansts_1 = applicationConstansts_1_1;
            },
            function (homePage_1_1) {
                homePage_1 = homePage_1_1;
            },
            function (registrationPage_1_1) {
                registrationPage_1 = registrationPage_1_1;
            },
            function (loginPage_1_1) {
                loginPage_1 = loginPage_1_1;
            },
            function (forgetPasswordPage_1_1) {
                forgetPasswordPage_1 = forgetPasswordPage_1_1;
            },
            function (adminPage_1_1) {
                adminPage_1 = adminPage_1_1;
            },
            function (accountSettingsPage_1_1) {
                accountSettingsPage_1 = accountSettingsPage_1_1;
            },
            function (successRegisterPage_1_1) {
                successRegisterPage_1 = successRegisterPage_1_1;
            },
            function (successResetPasswordPage_1_1) {
                successResetPasswordPage_1 = successResetPasswordPage_1_1;
            }],
        execute: function() {
            AuthorizationService = (function () {
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
                    return activeUserState.isLoggedIn;
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
                        new router_1.Route({
                            path: '/',
                            name: 'Home',
                            component: homePage_1.HomePage,
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/registration',
                            name: 'Registration',
                            component: registrationPage_1.RegistrationPage
                        }),
                        new router_1.Route({
                            path: '/login',
                            name: 'Login',
                            component: loginPage_1.LoginPage
                        }),
                        new router_1.Route({
                            path: '/forget-password',
                            name: 'ForgetPassword',
                            component: forgetPasswordPage_1.ForgetPasswordPage
                        }),
                        new router_1.Route({
                            path: '/success-register',
                            name: 'SuccessRegister',
                            component: successRegisterPage_1.SuccessRegisterPage
                        }),
                        new router_1.Route({
                            path: '/success-reset-password',
                            name: 'SuccessResetPassword',
                            component: successResetPasswordPage_1.SuccessResetPasswordPage
                        }),
                        new router_1.Route({
                            path: '/admin/...',
                            name: 'Admin',
                            component: adminPage_1.AdminPage
                        }),
                        new router_1.Route({
                            path: '/account/...',
                            name: 'Account',
                            component: accountSettingsPage_1.AccountSettingsPage
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
            exports_1("AuthorizationService", AuthorizationService);
        }
    }
});
//# sourceMappingURL=authorizationService.js.map