System.register(["angular2/core", "../../../../components/demandComponent/demandListBase/demandListBase", "../../../../services/demandService", "../../../../services/requestTypeService"], function(exports_1, context_1) {
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
    var core_1, demandListBase_1, demandService_1, requestTypeService_1;
    var applicationPath, DemandsListPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (demandListBase_1_1) {
                demandListBase_1 = demandListBase_1_1;
            },
            function (demandService_1_1) {
                demandService_1 = demandService_1_1;
            },
            function (requestTypeService_1_1) {
                requestTypeService_1 = requestTypeService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/demandsPage/demandsListPage';
            DemandsListPage = (function () {
                function DemandsListPage(_demandService, _requestTypeService) {
                    this._demandsList = new Array();
                    this._demandService = _demandService;
                    this._requestTypeService = _requestTypeService;
                    this._demandsRoute = "";
                }
                DemandsListPage.prototype.ngOnInit = function () {
                    this.getCities();
                    this.getDemandsList(this._demandsRoute);
                };
                DemandsListPage.prototype.ngOnChanges = function (changes) {
                    if (changes && changes['_demandsList']) {
                        this.getDomains();
                    }
                };
                DemandsListPage.prototype.getDemandsList = function (demandsType) {
                    var me = this;
                    this._demandService.getDemands(demandsType)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._demandsList = response;
                    }, function (error) {
                    });
                };
                DemandsListPage.prototype.getCities = function () {
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
                DemandsListPage.prototype.getDomains = function () {
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
                DemandsListPage = __decorate([
                    core_1.Component({
                        selector: 'demands-list-page',
                        templateUrl: applicationPath + '/demandsListPage.html',
                        styleUrls: [applicationPath + '/demandsListPage.css'],
                        directives: [demandListBase_1.DemandListBaseComponent],
                        providers: [demandService_1.DemandService, requestTypeService_1.RequestTypeService]
                    }), 
                    __metadata('design:paramtypes', [demandService_1.DemandService, requestTypeService_1.RequestTypeService])
                ], DemandsListPage);
                return DemandsListPage;
            }());
            exports_1("DemandsListPage", DemandsListPage);
        }
    }
});
//# sourceMappingURL=demandsListPage.js.map