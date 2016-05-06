/**
 * Created by nick_ on 5/6/2016.
 */
System.register(["angular2/core", "../../../../services/companiesService", "angular2/router", "../../../../services/notificationService", "../../../../components/companieComponent/companieEditComponent/companiesEditComponent", "../../../../services/authorizationService", "../../../../models/Roles"], function(exports_1, context_1) {
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
    var core_1, companiesService_1, router_1, notificationService_1, companiesEditComponent_1, authorizationService_1, Roles_1;
    var CompaniesEditPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (companiesService_1_1) {
                companiesService_1 = companiesService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (notificationService_1_1) {
                notificationService_1 = notificationService_1_1;
            },
            function (companiesEditComponent_1_1) {
                companiesEditComponent_1 = companiesEditComponent_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            }],
        execute: function() {
            CompaniesEditPage = (function () {
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
                        me._notificationService.emitNotificationToRootComponent({ type: 'danger', dismisable: true, message: 'Erroare la incarcarea companiei!' });
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
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
                    __metadata('design:paramtypes', [router_1.Router, companiesService_1.CompaniesService, router_1.RouteParams, notificationService_1.NotificationService])
                ], CompaniesEditPage);
                return CompaniesEditPage;
            }());
            exports_1("CompaniesEditPage", CompaniesEditPage);
        }
    }
});
//# sourceMappingURL=companiesEditPage.js.map