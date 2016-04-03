System.register(['angular2/core', 'angular2/http', '../../../../models/companieType', '../../../../services/companieTypesService'], function(exports_1, context_1) {
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
    var core_1, http_1, companieType_1, companieTypesService_1;
    var applicationPath, CompaniesPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (companieType_1_1) {
                companieType_1 = companieType_1_1;
            },
            function (companieTypesService_1_1) {
                companieTypesService_1 = companieTypesService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage/companiesPage';
            CompaniesPage = (function () {
                function CompaniesPage(companieTypeService) {
                    this.companieTypes = new Array(new companieType_1.CompanieType("", "test", 1), new companieType_1.CompanieType("", "test", 3), new companieType_1.CompanieType("", "test", 2));
                    this.searchQuery = "";
                    this._companieTypeService = companieTypeService;
                }
                CompaniesPage.prototype.ngOnInit = function () {
                    this.getCompanyTypesWithFilters();
                };
                CompaniesPage.prototype.getCompanyTypesWithFilters = function () {
                    var _this = this;
                    this._companieTypeService.getCompanyTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.companieTypes = response.data;
                    }, function (error) {
                        _this.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.addCompanieDomain = function () {
                    var _this = this;
                    this._companieTypeService.addCompanyType(this.newDomain)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.getCompanyTypesWithFilters();
                    }, function (error) {
                        //this.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.deleteCompanyType = function (companyType) {
                    var _this = this;
                    this._companieTypeService.deleteCompanyType(companyType.id)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.companieTypes = response.data;
                    }, function (error) {
                        _this.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.editCompaniType = function (companyType) {
                    this._companieTypeService.editCompaniType(companyType)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        companyType.isInEditMode = false;
                        companyType;
                        //this.companieTypes = response.data;
                    }, function (error) {
                        //this.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.toggleEditMode = function (companyType) {
                    companyType.isInEditMode = true;
                };
                CompaniesPage.prototype.toggleAddCompanieDomain = function (value) {
                    this.showAddCompanieDomainRow = value;
                };
                CompaniesPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/companiesPage.html',
                        styleUrls: [applicationPath + '/companiesPage.css'],
                        //encapsulation: ViewEncapsulation.None, 
                        providers: [companieTypesService_1.CompanieTypeService, http_1.HTTP_PROVIDERS],
                    }), 
                    __metadata('design:paramtypes', [companieTypesService_1.CompanieTypeService])
                ], CompaniesPage);
                return CompaniesPage;
            }());
            exports_1("CompaniesPage", CompaniesPage);
        }
    }
});
//# sourceMappingURL=companiesPage.js.map