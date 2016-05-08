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
var core_1 = require('@angular/core');
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var requestType_1 = require('../../../../models/requestType');
var requestTypeService_1 = require('../../../../services/requestTypeService');
var authorizationService_1 = require("../../../../services/authorizationService");
var Roles_1 = require("../../../../models/Roles");
var applicationPath = '/app/pages/adminPage/categoriesPage/domainsPage';
var DomainsPage = (function () {
    function DomainsPage(requestTypeService, formBuilder) {
        this.domainsTypes = [new requestType_1.RequestType("", "test", 1), new requestType_1.RequestType("", "test", 3), new requestType_1.RequestType("", "test", 2)];
        this.searchQuery = "";
        this._requestTypeService = requestTypeService;
        this._formBuilder = formBuilder;
    }
    DomainsPage.prototype.ngOnInit = function () {
        this._newDomainForm = this._formBuilder.group([]);
        this.getRequestTypesWithFilters();
        this.buildForm();
    };
    DomainsPage.prototype.getRequestTypesWithFilters = function () {
        var _this = this;
        this._requestTypeService.getRequestTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
            .map(function (response) {
            if (response.text().length) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            _this.domainsTypes = response;
        }, function (error) {
            _this.domainsTypes = [];
        });
    };
    DomainsPage.prototype.addRequestType = function () {
        var _this = this;
        if (!this._newDomainForm.valid) {
            return;
        }
        this._requestTypeService.addRequestType(this.newRequestType)
            .map(function (response) {
            if (response.text().length) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            _this.getRequestTypesWithFilters();
            _this.newRequestType = "";
            _this.toggleAddRequestType(false);
        }, function (error) {
            //make the field red
            //this.companieTypes = [];
        });
    };
    DomainsPage.prototype.deleteRequestType = function (requestType) {
        var _this = this;
        this._requestTypeService.deleteRequestType(requestType.id)
            .map(function (response) {
            if (response.text().length) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            _this.domainsTypes = response;
        }, function (error) {
            _this.domainsTypes = [];
        });
    };
    DomainsPage.prototype.editRequestType = function (requestType) {
        this._requestTypeService.editRequestType(requestType)
            .map(function (response) {
            if (response.text().length) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            requestType.isInEditMode = false;
            //this.companieTypes = response.data;
        }, function (error) {
            //this.companieTypes = [];
        });
    };
    DomainsPage.prototype.toggleAddRequestType = function (value) {
        this.showAddRequestRow = value;
        if (!value) {
            this.rebuildForm();
        }
    };
    DomainsPage.prototype.toggleEditMode = function (requestType) {
        requestType.isInEditMode = true;
        requestType.backupRequestType = JSON.parse(JSON.stringify(requestType));
    };
    DomainsPage.prototype.revertEdit = function (requestType) {
        requestType.isInEditMode = false;
        requestType.id = requestType.backupRequestType.id;
        requestType.companies = requestType.backupRequestType.companies;
        requestType.name = requestType.backupRequestType.name;
    };
    DomainsPage.prototype.rebuildForm = function () {
        this._newDomainForm.removeControl('newRequestType');
        this.buildForm();
    };
    DomainsPage.prototype.buildForm = function () {
        this._newDomainForm.addControl('newRequestType', this._formBuilder.control(this.newRequestType, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])));
    };
    DomainsPage = __decorate([
        core_1.Component({
            selector: 'companies-Page',
            templateUrl: applicationPath + '/domainsPage.html',
            styleUrls: [applicationPath + '/domainsPage.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }),
        router_deprecated_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN); }), 
        __metadata('design:paramtypes', [requestTypeService_1.RequestTypeService, common_1.FormBuilder])
    ], DomainsPage);
    return DomainsPage;
}());
exports.DomainsPage = DomainsPage;
//# sourceMappingURL=domainsPage.js.map