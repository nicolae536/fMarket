/**
 * Created by nick_ on 4/22/2016.
 */
"use strict";
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
var router_deprecated_1 = require("@angular/router-deprecated");
var demandService_1 = require("../../../../services/demandService");
var requestTypeService_1 = require("../../../../services/requestTypeService");
var demandEdit_1 = require("../../../../components/demandComponent/demandEdit/demandEdit");
var Roles_1 = require("../../../../models/Roles");
var authorizationService_1 = require("../../../../services/authorizationService");
var _ = require('underscore');
var applicationPath = '/app/pages/adminPage/demandsPage/demandsEditPage';
var DemandsEditPage = (function () {
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
            directives: [demandEdit_1.DemandEditComponent]
        }),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, demandService_1.DemandService, requestTypeService_1.RequestTypeService])
    ], DemandsEditPage);
    return DemandsEditPage;
}());
exports.DemandsEditPage = DemandsEditPage;
//# sourceMappingURL=demandsEditPage.js.map