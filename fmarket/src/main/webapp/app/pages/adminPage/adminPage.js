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
//import libraryes
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var authorizationService_1 = require("../../services/authorizationService");
var Roles_1 = require("../../models/Roles");
var usersPage_1 = require("./usersPage/usersPage");
var subscribersPage_1 = require("./subscribersPage/subscribersPage");
var categoriesPage_1 = require("./categoriesPage/categoriesPage");
var demandsPage_1 = require("./demandsPage/demandsPage");
var companiesPage_1 = require("./companiesPage/companiesPage");
var companiesEditPage_1 = require("./companiesPage/companiesEditPage/companiesEditPage");
var demandsEditPage_1 = require("./demandsPage/demandsEditPage/demandsEditPage");
var jqueryService_1 = require("../../services/jqueryService");
var applicationConstansts_1 = require("../../models/applicationConstansts");
var notificationService_1 = require("../../services/notificationService");
var applicationPath = '/app/pages/adminPage';
var AdminPage = (function () {
    function AdminPage(location, router, notificationService) {
        this.location = location;
        this.router = router;
        this._notificationService = notificationService;
        jqueryService_1.JqueryService.removeElementWithAnimation(document.getElementById(applicationConstansts_1.ApplicationConstants.LOADING_SPINNER));
    }
    AdminPage.prototype.ngAfterViewChecked = function () {
        jqueryService_1.JqueryService.setPageHeight(this.leftMenu.nativeElement);
        this._notificationService.removeLoading();
    };
    __decorate([
        core_1.ViewChild('leftMenu'), 
        __metadata('design:type', Object)
    ], AdminPage.prototype, "leftMenu", void 0);
    AdminPage = __decorate([
        core_1.Component({
            selector: 'admin-Page',
            templateUrl: applicationPath + '/adminPage.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }),
        router_deprecated_1.RouteConfig([
            new router_deprecated_1.Route({
                path: '/users',
                component: usersPage_1.UsersPage,
                name: 'Users',
                useAsDefault: true
            }),
            new router_deprecated_1.Route({
                path: '/subscribers',
                component: subscribersPage_1.SubscribersPage,
                name: 'Subscribers'
            }),
            new router_deprecated_1.Route({
                path: '/categorii/...',
                component: categoriesPage_1.CategoriesPage,
                name: 'Categories'
            }),
            new router_deprecated_1.Route({
                path: '/cereri/...',
                component: demandsPage_1.DemandsPage,
                name: 'Demands'
            }),
            new router_deprecated_1.Route({
                path: '/cerere-detalii/:id',
                component: demandsEditPage_1.DemandsEditPage,
                name: 'EditDemand',
            }),
            new router_deprecated_1.Route({
                path: '/lista',
                component: companiesPage_1.CompaniesPage,
                name: 'Companies'
            }),
            new router_deprecated_1.Route({
                path: '/detalii/:id',
                component: companiesEditPage_1.CompaniesEditPage,
                name: 'CompanieDetails'
            }),
        ]), 
        __metadata('design:paramtypes', [common_1.Location, router_deprecated_1.Router, notificationService_1.NotificationService])
    ], AdminPage);
    return AdminPage;
}());
exports.AdminPage = AdminPage;
//# sourceMappingURL=adminPage.js.map