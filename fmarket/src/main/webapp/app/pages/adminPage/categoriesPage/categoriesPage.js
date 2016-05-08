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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var companiesPage_1 = require("./companiesPage/companiesPage");
var domainsPage_1 = require("./domainsPage/domainsPage");
var categoriesMenuPage_1 = require("./categoriesMenuPage/categoriesMenuPage");
var tabsRoutingComponent_1 = require("../../../components/tabsComponent/tabsRoutingComponent");
var Roles_1 = require("../../../models/Roles");
var authorizationService_1 = require("../../../services/authorizationService");
var applicationPath = '/app/pages/adminPage/categoriesPage';
var CategoriesPage = (function () {
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
            directives: [tabsRoutingComponent_1.TabsRoutingComponent, router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN) && authorizationService_1.AuthorizationService.isLoggedIn(); }),
        router_deprecated_1.RouteConfig([
            new router_deprecated_1.Route({
                path: '/meniu',
                component: categoriesMenuPage_1.CategoriesMenuPage,
                name: 'CategoriesMenu',
                useAsDefault: true
            }),
            new router_deprecated_1.Route({
                path: '/firme',
                component: companiesPage_1.CompaniesPage,
                name: 'Companies'
            }),
            new router_deprecated_1.Route({
                path: '/domenii',
                component: domainsPage_1.DomainsPage,
                name: 'Domains'
            }),
        ]), 
        __metadata('design:paramtypes', [])
    ], CategoriesPage);
    return CategoriesPage;
}());
exports.CategoriesPage = CategoriesPage;
//# sourceMappingURL=categoriesPage.js.map