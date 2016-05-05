System.register(["angular2/core", "angular2/router", "../../../../components/demandComponent/demandListBase/demandListBase", "../../../../services/demandService", "../../../../services/requestTypeService", "./demandsListPageBase", "../../../../models/Roles", "../../../../services/authorizationService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, router_1, demandListBase_1, demandService_1, requestTypeService_1, demandsListPageBase_1, Roles_1, authorizationService_1;
    var applicationPath, NewDemandsListPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (demandListBase_1_1) {
                demandListBase_1 = demandListBase_1_1;
            },
            function (demandService_1_1) {
                demandService_1 = demandService_1_1;
            },
            function (requestTypeService_1_1) {
                requestTypeService_1 = requestTypeService_1_1;
            },
            function (demandsListPageBase_1_1) {
                demandsListPageBase_1 = demandsListPageBase_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/demandsPage/demandsListPage';
            NewDemandsListPage = (function (_super) {
                __extends(NewDemandsListPage, _super);
                function NewDemandsListPage(_demandService, _requestTypeService) {
                    _super.call(this, _demandService, _requestTypeService);
                    this._demandsRoute = '/new';
                }
                NewDemandsListPage.prototype.ngOnInit = function () {
                    //this.getCities();
                    this.getNewDemandsList();
                };
                NewDemandsListPage.prototype.ngOnChanges = function (changes) {
                    /*if(changes && changes['_demandsList']){
                        this.getDomains();
                    }*/
                };
                NewDemandsListPage = __decorate([
                    core_1.Component({
                        selector: 'new-demands-list-page',
                        templateUrl: applicationPath + '/demandsListPageBase.html',
                        styleUrls: [applicationPath + '/demandsListPageBase.css'],
                        directives: [demandListBase_1.DemandListBaseComponent],
                        providers: [demandService_1.DemandService, requestTypeService_1.RequestTypeService]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
                    __metadata('design:paramtypes', [demandService_1.DemandService, requestTypeService_1.RequestTypeService])
                ], NewDemandsListPage);
                return NewDemandsListPage;
            }(demandsListPageBase_1.DemandsListPageBase));
            exports_1("NewDemandsListPage", NewDemandsListPage);
        }
    }
});
//# sourceMappingURL=newDemandsListPage.js.map