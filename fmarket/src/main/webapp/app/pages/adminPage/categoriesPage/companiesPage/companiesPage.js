System.register(["angular2/core", "../../../../models/companieType", "../../../../services/companieTypesService", "angular2/router", "../../../../services/authorizationService", "../../../../models/Roles", "angular2/common"], function(exports_1, context_1) {
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
    var core_1, companieType_1, companieTypesService_1, router_1, authorizationService_1, Roles_1, common_1;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage/companiesPage';
            CompaniesPage = (function () {
                function CompaniesPage(companieTypeService, formBuilder) {
                    this.companieTypes = [new companieType_1.CompanieType("", "test", 1), new companieType_1.CompanieType("", "test", 3), new companieType_1.CompanieType("", "test", 2)];
                    this.searchQuery = "";
                    this._companieTypeService = companieTypeService;
                    this._formBuilder = formBuilder;
                }
                CompaniesPage.prototype.ngOnInit = function () {
                    this.getCompanyTypesWithFilters();
                    this._newDomainForm = this._formBuilder.group([]);
                    this.buildDomainForm();
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
                    if (!this._newDomainForm.valid) {
                        return;
                    }
                    this._companieTypeService.addCompanyType(this.newDomain)
                        .map(function (response) {
                        if (response.text().length) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
                        me.getCompanyTypesWithFilters();
                        me.newDomain = "";
                        me.toggleAddCompanieDomain(false);
                        me.rebuildForm();
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
                    companyType.companieTypeBackup = JSON.parse(JSON.stringify(companyType));
                };
                CompaniesPage.prototype.revertEdit = function (companieType) {
                    companieType.isInEditMode = false;
                    companieType.id = companieType.companieTypeBackup.id;
                    companieType.companies_no = companieType.companieTypeBackup.companies_no;
                    companieType.name = companieType.companieTypeBackup.name;
                };
                CompaniesPage.prototype.toggleAddCompanieDomain = function (value) {
                    this.showAddCompanieDomainRow = value;
                    if (!value) {
                        this.newDomain = '';
                        this.rebuildForm();
                    }
                };
                CompaniesPage.prototype.buildDomainForm = function () {
                    this._newDomainForm.addControl('newDomain', this._formBuilder.control(this.newDomain, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])));
                };
                CompaniesPage.prototype.rebuildForm = function () {
                    this._newDomainForm.removeControl('newDomain');
                    this.buildDomainForm();
                };
                CompaniesPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/companiesPage.html',
                        styleUrls: [applicationPath + '/companiesPage.css'],
                    }),
                    router_1.CanActivate(function () {
                        return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN);
                    }), 
                    __metadata('design:paramtypes', [companieTypesService_1.CompanieTypeService, common_1.FormBuilder])
                ], CompaniesPage);
                return CompaniesPage;
            }());
            exports_1("CompaniesPage", CompaniesPage);
        }
    }
});
//# sourceMappingURL=companiesPage.js.map