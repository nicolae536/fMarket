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
var router_1 = require("@angular/router");
var companiesPage_1 = require("./companiesPage/companiesPage");
var domainsPage_1 = require("./domainsPage/domainsPage");
var categoriesMenuPage_1 = require("./categoriesMenuPage/categoriesMenuPage");
var tabsRoutingComponent_1 = require("../../../components/tabsComponent/tabsRoutingComponent");
var applicationPath = '/app/pages/adminPage/categoriesPage';
var CategoriesPage = (function () {
    function CategoriesPage() {
        this.tabPagesList = [{ name: 'Meniu', link: '/admin/categorii/meniu', enableMarker: false, markerContent: "" },
            { name: 'Companii', link: '/admin/categorii/firme', enableMarker: false, markerContent: "" },
            { name: 'Cereri', link: '/admin/categorii/domenii', enableMarker: false, markerContent: "" }];
    }
    CategoriesPage = __decorate([
        core_1.Component({
            selector: 'categoryes-page',
            templateUrl: applicationPath + '/categoriesPage.html',
            styleUrls: [applicationPath + '/categoriesPage.css'],
            directives: [tabsRoutingComponent_1.TabsRoutingComponent, router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            new router_1.Route({
                path: '/meniu',
                component: categoriesMenuPage_1.CategoriesMenuPage,
            }),
            new router_1.Route({
                path: '/firme',
                component: companiesPage_1.CompaniesPage,
            }),
            new router_1.Route({
                path: '/domenii',
                component: domainsPage_1.DomainsPage,
            }),
        ]), 
        __metadata('design:paramtypes', [])
    ], CategoriesPage);
    return CategoriesPage;
}());
exports.CategoriesPage = CategoriesPage;
//# sourceMappingURL=categoriesPage.js.map