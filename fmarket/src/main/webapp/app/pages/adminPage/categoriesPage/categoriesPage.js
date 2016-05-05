System.register(['angular2/core', 'angular2/router', "./companiesPage/companiesPage", "./domainsPage/domainsPage", "./categoriesMenuPage/categoriesMenuPage", "../../../components/tabsComponent/tabsRoutingComponent", "../../../models/Roles", "../../../services/authorizationService"], function(exports_1, context_1) {
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
    var core_1, router_1, companiesPage_1, domainsPage_1, categoriesMenuPage_1, tabsRoutingComponent_1, Roles_1, authorizationService_1;
    var applicationPath, CategoriesPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (companiesPage_1_1) {
                companiesPage_1 = companiesPage_1_1;
            },
            function (domainsPage_1_1) {
                domainsPage_1 = domainsPage_1_1;
            },
            function (categoriesMenuPage_1_1) {
                categoriesMenuPage_1 = categoriesMenuPage_1_1;
            },
            function (tabsRoutingComponent_1_1) {
                tabsRoutingComponent_1 = tabsRoutingComponent_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage';
            CategoriesPage = (function () {
                function CategoriesPage() {
                    this.tabPagesList = [{ name: 'Meniu', link: 'Categories/CategoriesMenu', enableMarker: false, markerContent: "" },
                        { name: 'Companii', link: 'Categories/Companies', enableMarker: false, markerContent: "" },
                        { name: 'Cereri', link: 'Categories/Domains', enableMarker: false, markerContent: "" }];
                }
                CategoriesPage = __decorate([
                    core_1.Component({
                        selector: 'categoryes-page',
                        templateUrl: applicationPath + '/categoriesPage.html',
                        styleUrls: [applicationPath + '/categoriesPage.css'],
                        directives: [tabsRoutingComponent_1.TabsRoutingComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN) && authorizationService_1.AuthorizationService.isLoggedIn(); }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/meniu',
                            component: categoriesMenuPage_1.CategoriesMenuPage,
                            name: 'CategoriesMenu',
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/firme',
                            component: companiesPage_1.CompaniesPage,
                            name: 'Companies'
                        }),
                        new router_1.Route({
                            path: '/domenii',
                            component: domainsPage_1.DomainsPage,
                            name: 'Domains'
                        }),
                    ]), 
                    __metadata('design:paramtypes', [])
                ], CategoriesPage);
                return CategoriesPage;
            }());
            exports_1("CategoriesPage", CategoriesPage);
        }
    }
});
//# sourceMappingURL=categoriesPage.js.map