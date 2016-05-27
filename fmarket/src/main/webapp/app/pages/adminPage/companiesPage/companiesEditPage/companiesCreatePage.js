/**
 * Created by nick_ on 5/6/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var companiesService_1 = require("../../../../services/companiesService");
var notificationService_1 = require("../../../../services/notificationService");
var companiesEditComponent_1 = require("../../../../components/companieComponent/companieEditComponent/companiesEditComponent");
var authorizationService_1 = require("../../../../services/authorizationService");
var Roles_1 = require("../../../../models/Roles");
var companiesEditBase_1 = require("./companiesEditBase");
var newCompanyRequest_1 = require("../../../../models/newCompanyRequest");
var CreateCompaniesPage = (function (_super) {
    __extends(CreateCompaniesPage, _super);
    function CreateCompaniesPage(location, router, companiesService, notificationService) {
        _super.call(this, location, router, companiesService, notificationService);
    }
    CreateCompaniesPage.prototype.ngOnInit = function () {
        this._companie = newCompanyRequest_1.NewCompanyRequest.getEmptyCompany();
    };
    CreateCompaniesPage = __decorate([
        core_1.Component({
            selector: 'companies-edit-page',
            templateUrl: '/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
            directives: [companiesEditComponent_1.CompaniesEditComponent]
        }),
        router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.Router, companiesService_1.CompaniesService, notificationService_1.NotificationService])
    ], CreateCompaniesPage);
    return CreateCompaniesPage;
}(companiesEditBase_1.CompaniesEditBase));
exports.CreateCompaniesPage = CreateCompaniesPage;
//# sourceMappingURL=companiesCreatePage.js.map