System.register(['angular2/core', '../../../../models/companieType', '../../../../services/companieTypesService'], function(exports_1, context_1) {
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
    var core_1, companieType_1, companieTypesService_1;
    var applicationPath, CompaniesPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.companieTypes = [new companieType_1.CompanieType("", "test", 1), new companieType_1.CompanieType("", "test", 3), new companieType_1.CompanieType("", "test", 2)];
                    this.searchQuery = "";
                    this._companieTypeService = companieTypeService;
                }
                CompaniesPage.prototype.ngOnInit = function () {
                    this.getCompanyTypesWithFilters();
                };
                CompaniesPage.prototype.selectMenuItem = function (data) {
                };
                CompaniesPage.prototype.addMenuItem = function (data) {
                };
                CompaniesPage.prototype.getCompanyTypesWithFilters = function () {
                    var me = this;
                    this._companieTypeService.getCompanyTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
                        .map(function (response) {
                        if (response.text().length) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me.companieTypes = response;
                    }, function (error) {
                        me.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.addCompanieDomain = function () {
                    var me = this;
                    this._companieTypeService.addCompanyType(this.newDomain)
                        .map(function (response) {
                        if (response.text().length) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me.getCompanyTypesWithFilters();
                        me.newDomain = "";
                        me.toggleAddCompanieDomain(false);
                    }, function (error) {
                        //make the field red
                        //this.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.deleteCompanyType = function (companyType) {
                    var me = this;
                    this._companieTypeService.deleteCompanyType(companyType.id)
                        .map(function (response) {
                        if (response.text().length) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me.getCompanyTypesWithFilters();
                    }, function (error) {
                        //me.companieTypes = [];
                    });
                };
                CompaniesPage.prototype.editCompaniType = function (companyType) {
                    var me = this;
                    this._companieTypeService.editCompaniType(companyType)
                        .map(function (response) {
                        if (response.text().length) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        companyType.isInEditMode = false;
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
                        providers: [companieTypesService_1.CompanieTypeService],
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