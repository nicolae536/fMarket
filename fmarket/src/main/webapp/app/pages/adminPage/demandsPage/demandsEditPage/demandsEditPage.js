/**
 * Created by nick_ on 4/22/2016.
 */
System.register(["angular2/core", "angular2/router", "../../../../services/demandService", "../../../../services/requestTypeService", "../../../../components/demandComponent/demandEdit/demandEdit", "../../../../models/Roles", "../../../../services/authorizationService"], function(exports_1, context_1) {
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
    var core_1, router_1, demandService_1, requestTypeService_1, demandEdit_1, Roles_1, authorizationService_1;
    var applicationPath, DemandsEditPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (demandService_1_1) {
                demandService_1 = demandService_1_1;
            },
            function (requestTypeService_1_1) {
                requestTypeService_1 = requestTypeService_1_1;
            },
            function (demandEdit_1_1) {
                demandEdit_1 = demandEdit_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/demandsPage/demandsEditPage';
            DemandsEditPage = (function () {
                function DemandsEditPage(router, params, demandService, requestTypeService) {
                    this._router = router;
                    this._demandService = demandService;
                    this._requestTypeService = requestTypeService;
                    this._demandId = Number(params.get('id'));
                }
                DemandsEditPage.prototype.ngOnInit = function () {
                    this.getDemand();
                };
                DemandsEditPage.prototype.getDemand = function () {
                    var me = this;
                    this._demandService.getDemand(this._demandId)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._demand = response;
                    }, function (error) {
                    });
                };
                DemandsEditPage.prototype.getCities = function () {
                    var me = this;
                    this._demandService.getCityList()
                        .subscribe(function (response) {
                        me._cityesList = _.map(response, function (city) {
                            return {
                                displayName: city['name'],
                                boundItem: city
                            };
                        });
                    }, function (error) {
                    });
                };
                DemandsEditPage.prototype.getDomains = function () {
                    var me = this;
                    this._requestTypeService.getRequestTypesWithFilters()
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._domainsList = _.map(response, function (domain) {
                            return {
                                displayName: domain['name'],
                                boundItem: domain
                            };
                        });
                    }, function (error) {
                    });
                };
                DemandsEditPage.prototype.acceptDemand = function (demand) {
                    var me = this;
                    this._demandService.acceptDemand(demand)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._router.navigate(['Admin/Demands/DemandsList']);
                    }, function (error) {
                    });
                };
                DemandsEditPage.prototype.rejectDemand = function (id) {
                    var me = this;
                    this._demandService.declineDemand(id)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._router.navigate(['Admin/Demands/DemandsList']);
                    }, function (error) {
                    });
                };
                DemandsEditPage.prototype.saveEditedDemand = function (demand) {
                    var me = this;
                    this._demandService.saveDemand(demand)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._router.navigate(['Admin/Demands/DemandsList']);
                    }, function (error) {
                    });
                };
                DemandsEditPage = __decorate([
                    core_1.Component({
                        selector: 'demands-edit-page',
                        templateUrl: applicationPath + '/demandsEditPage.html',
                        styleUrls: [applicationPath + '/demandsEditPage.css'],
                        directives: [demandEdit_1.DemandEditComponent],
                        providers: [demandService_1.DemandService, requestTypeService_1.RequestTypeService]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, demandService_1.DemandService, requestTypeService_1.RequestTypeService])
                ], DemandsEditPage);
                return DemandsEditPage;
            }());
            exports_1("DemandsEditPage", DemandsEditPage);
        }
    }
});
//# sourceMappingURL=demandsEditPage.js.map