System.register(["angular2/core", "angular2/router", "../../../models/Roles", "../../../services/authorizationService", "../../../components/companieComponent/createCompanieDialog/createCompanieDialog", "../../../services/companiesService", "../../../models/paginationWrapper", "../../../services/notificationService"], function(exports_1, context_1) {
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
    var core_1, router_1, Roles_1, authorizationService_1, createCompanieDialog_1, companiesService_1, paginationWrapper_1, notificationService_1;
    var applicationPath, CompaniesPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (createCompanieDialog_1_1) {
                createCompanieDialog_1 = createCompanieDialog_1_1;
            },
            function (companiesService_1_1) {
                companiesService_1 = companiesService_1_1;
            },
            function (paginationWrapper_1_1) {
                paginationWrapper_1 = paginationWrapper_1_1;
            },
            function (notificationService_1_1) {
                notificationService_1 = notificationService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/companiesPage';
            CompaniesPage = (function () {
                function CompaniesPage(router, companiesService, notificationService) {
                    this._paginationWrapper = new paginationWrapper_1.PaginationWrapper();
                    this._router = router;
                    this._companiesService = companiesService;
                    this._notificationService = notificationService;
                }
                CompaniesPage.prototype.ngOnInit = function () {
                    this._paginationWrapper.currentPage = 1;
                    this.getCompaniesWithFilters();
                };
                CompaniesPage.prototype.referenceCompaniesDialog = function (_createCompanieDialog) {
                    this._createCompanieDialog = _createCompanieDialog;
                };
                CompaniesPage.prototype.requestNewCompanie = function ($event) {
                };
                CompaniesPage.prototype.removeCompanie = function (companie) {
                    //this._companiesService.
                };
                CompaniesPage.prototype.getNewPage = function (page) {
                    this._paginationWrapper.currentPage = page;
                    this.getCompaniesWithFilters();
                };
                CompaniesPage.prototype.getCompaniesWithFilters = function () {
                    var me = this;
                    this._companiesService.getCompanies({ domainId: this.domainId, name: this.name, page: this._paginationWrapper.currentPage })
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._companiesList = response;
                    }, function (error) {
                        me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Eroare companiile nu pot fi afisate!' });
                    });
                };
                CompaniesPage.prototype.editCompanie = function (id) {
                    this._router.navigate(['Admin/CompanieDetails', { id: id }]);
                };
                CompaniesPage = __decorate([
                    core_1.Component({
                        selector: 'compnaies-Page',
                        templateUrl: applicationPath + '/companiesPage.html',
                        styleUrls: [applicationPath + '/companiesPage.css'],
                        directives: [createCompanieDialog_1.CreateCompanieDialog]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
                    __metadata('design:paramtypes', [router_1.Router, companiesService_1.CompaniesService, notificationService_1.NotificationService])
                ], CompaniesPage);
                return CompaniesPage;
            }());
            exports_1("CompaniesPage", CompaniesPage);
        }
    }
});
//# sourceMappingURL=companiesPage.js.map