/**
 * Created by nick_ on 4/26/2016.
 */
System.register(["angular2/core", "angular2/router", "./accountEditPage/accountEditPage", "./accountDemandsPage/accountDemandsPage"], function(exports_1, context_1) {
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
    var core_1, router_1, accountEditPage_1, accountDemandsPage_1;
    var applicationPath, AccountSettingsPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (accountEditPage_1_1) {
                accountEditPage_1 = accountEditPage_1_1;
            },
            function (accountDemandsPage_1_1) {
                accountDemandsPage_1 = accountDemandsPage_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/accountSettingsPage';
            AccountSettingsPage = (function () {
                function AccountSettingsPage(location, router) {
                    this.location = location;
                    this.router = router;
                }
                AccountSettingsPage = __decorate([
                    core_1.Component({
                        selector: 'account-settings-Page',
                        templateUrl: applicationPath + '/accountSettingsPage.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/details',
                            component: accountEditPage_1.AccountEditPage,
                            name: 'Details',
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/demands',
                            component: accountDemandsPage_1.AccountDemandsPage,
                            name: 'Demands'
                        })
                    ]), 
                    __metadata('design:paramtypes', [Location, router_1.Router])
                ], AccountSettingsPage);
                return AccountSettingsPage;
            }());
            exports_1("AccountSettingsPage", AccountSettingsPage);
        }
    }
});
//# sourceMappingURL=accountSettingsPage.js.map