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
var companiesEditBase_1 = require("./companiesEditBase");
var localizationService_1 = require("../../../../services/localizationService");
var template = require('./companiesEditPage.html');
var CompanieCreatePage = (function (_super) {
    __extends(CompanieCreatePage, _super);
    function CompanieCreatePage(location, router, companiesService, notificationService, localizationService) {
        _super.call(this, location, router, companiesService, notificationService, localizationService);
    }
    CompanieCreatePage.prototype.ngOnInit = function () {
        this.getCities();
        this.getCompanieDomains();
        this.getDomains();
    };
    CompanieCreatePage.prototype.saveCompanie = function (companieDto) {
        var me = this;
        this._companiesService.createCompany(companieDto)
            .subscribe(function (succes) {
            if (companieDto['logoFile']) {
                me.uploadLogoFile(succes, companieDto['logoFile']);
                return;
            }
            me._location.back();
        }, function (error) {
            //me.
        });
    };
    CompanieCreatePage.prototype.uploadLogoFile = function (id, logoFile) {
        var me = this;
        this._companiesService.uploadCompanyLogo(id, logoFile)
            .subscribe(function (succes) {
            me._location.back();
        }, function (error) {
        });
    };
    CompanieCreatePage = __decorate([
        core_1.Component({
            selector: 'companies-edit-page',
            template: template,
            directives: [companiesEditComponent_1.CompaniesEditComponent]
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.Router, companiesService_1.CompaniesService, notificationService_1.NotificationService, localizationService_1.LocalizationService])
    ], CompanieCreatePage);
    return CompanieCreatePage;
}(companiesEditBase_1.CompaniesEditBase));
exports.CompanieCreatePage = CompanieCreatePage;
//# sourceMappingURL=companiesCreatePage.js.map