/**
 * Created by nick_ on 5/6/2016.
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
var companiesService_1 = require("../../../../services/companiesService");
var notificationService_1 = require("../../../../services/notificationService");
var companiesEditComponent_1 = require("../../../../components/companieComponent/companieEditComponent/companiesEditComponent");
var authorizationService_1 = require("../../../../services/authorizationService");
var Roles_1 = require("../../../../models/Roles");
var CompaniesEditPage = (function () {
    function CompaniesEditPage(router, companiesService, routeParametres, notificationService) {
        this._router = router;
        this._companiesService = companiesService;
        this._routeParametres = routeParametres;
        this._notificationService = notificationService;
    }
    CompaniesEditPage.prototype.referenceComponent = function (companieEditComponent) {
        this._companieEditComponent = companieEditComponent;
    };
    CompaniesEditPage.prototype.ngOnInit = function () {
        var me = this;
        this._companiesService.getCompanieDetails(parseInt(this._routeParametres.get('id')))
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me._companie = response;
        }, function (error) {
            me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Erroare la incarcarea companiei!', timeout: 5 });
            me._router.navigate(['Admin/Companies']);
        });
    };
    CompaniesEditPage.prototype.saveCompanie = function (companieDto) {
        //this._companiesService.
    };
    CompaniesEditPage = __decorate([
        core_1.Component({
            selector: 'companies-edit-page',
            templateUrl: '/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
            directives: [companiesEditComponent_1.CompaniesEditComponent]
        }),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, companiesService_1.CompaniesService, router_deprecated_1.RouteParams, notificationService_1.NotificationService])
    ], CompaniesEditPage);
    return CompaniesEditPage;
}());
exports.CompaniesEditPage = CompaniesEditPage;
//# sourceMappingURL=companiesEditPage.js.map