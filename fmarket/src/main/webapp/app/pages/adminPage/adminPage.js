System.register(['angular2/core', 'angular2/router', "../../services/authorizationService", './usersPage/usersPage', './subscribersPage/subscribersPage', './categoriesPage/categoriesPage', "./demandsPage/demandsPage", "../../models/Roles"], function(exports_1, context_1) {
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
    var core_1, router_1, authorizationService_1, usersPage_1, subscribersPage_1, categoriesPage_1, demandsPage_1, Roles_1;
    var applicationPath, AdminPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (usersPage_1_1) {
                usersPage_1 = usersPage_1_1;
            },
            function (subscribersPage_1_1) {
                subscribersPage_1 = subscribersPage_1_1;
            },
            function (categoriesPage_1_1) {
                categoriesPage_1 = categoriesPage_1_1;
            },
            function (demandsPage_1_1) {
                demandsPage_1 = demandsPage_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage';
            AdminPage = (function () {
                function AdminPage(location, router) {
                    this.location = location;
                    this.router = router;
                }
                AdminPage = __decorate([
                    core_1.Component({
                        selector: 'admin-Page',
                        templateUrl: applicationPath + '/adminPage.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/users',
                            component: usersPage_1.UsersPage,
                            name: 'Users',
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/subscribers',
                            component: subscribersPage_1.SubscribersPage,
                            name: 'Subscribers'
                        }),
                        new router_1.Route({
                            path: '/categorii/...',
                            component: categoriesPage_1.CategoriesPage,
                            name: 'Categories'
                        }),
                        new router_1.Route({
                            path: '/cereri/...',
                            component: demandsPage_1.DemandsPage,
                            name: 'Demands'
                        }),
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location, router_1.Router])
                ], AdminPage);
                return AdminPage;
            }());
            exports_1("AdminPage", AdminPage);
        }
    }
});
//# sourceMappingURL=adminPage.js.map