System.register(['angular2/core', 'angular2/http', '../../../../models/requestType', '../../../../services/requestTypeService'], function(exports_1, context_1) {
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
    var core_1, http_1, requestType_1, requestTypeService_1;
    var applicationPath, RequestsPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (requestType_1_1) {
                requestType_1 = requestType_1_1;
            },
            function (requestTypeService_1_1) {
                requestTypeService_1 = requestTypeService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage/requestsPage';
            RequestsPage = (function () {
                function RequestsPage(requestTypeService) {
                    this.requestTypes = new Array(new requestType_1.RequestType("", "test", 1), new requestType_1.RequestType("", "test", 3), new requestType_1.RequestType("", "test", 2));
                    this.searchQuery = "";
                    this._requestTypeService = requestTypeService;
                }
                RequestsPage.prototype.ngOnInit = function () {
                    this.getRequestTypesWithFilters();
                };
                RequestsPage.prototype.getRequestTypesWithFilters = function () {
                    var _this = this;
                    this._requestTypeService.getRequestTypesWithFilters(this.searchQuery === "" ? null : this.searchQuery)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.requestTypes = response.data;
                    }, function (error) {
                        _this.requestTypes = [];
                    });
                };
                RequestsPage.prototype.addRequestType = function () {
                    var _this = this;
                    this._requestTypeService.addRequestType(this.newRequestType)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.getRequestTypesWithFilters();
                        _this.newRequestType = "";
                        _this.toggleAddRequestType(false);
                    }, function (error) {
                        //make the field red
                        //this.companieTypes = [];
                    });
                };
                RequestsPage.prototype.deleteRequestType = function (requestType) {
                    var _this = this;
                    this._requestTypeService.deleteRequestType(requestType.id)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        _this.requestTypes = response.data;
                    }, function (error) {
                        _this.requestTypes = [];
                    });
                };
                RequestsPage.prototype.editRequestType = function (requestType) {
                    this._requestTypeService.editRequestType(requestType)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) {
                        requestType.isInEditMode = false;
                        requestType;
                        //this.companieTypes = response.data;
                    }, function (error) {
                        //this.companieTypes = [];
                    });
                };
                RequestsPage.prototype.toggleAddRequestType = function (value) {
                    this.showAddRequestRow = value;
                };
                RequestsPage.prototype.toggleEditMode = function (requestType) {
                    requestType.isInEditMode = true;
                };
                RequestsPage = __decorate([
                    core_1.Component({
                        selector: 'companies-Page',
                        templateUrl: applicationPath + '/requestsPage.html',
                        styleUrls: [applicationPath + '/requestsPage.css'],
                        //encapsulation: ViewEncapsulation.None, 
                        providers: [requestTypeService_1.RequestTypeService, http_1.HTTP_PROVIDERS],
                    }), 
                    __metadata('design:paramtypes', [requestTypeService_1.RequestTypeService])
                ], RequestsPage);
                return RequestsPage;
            }());
            exports_1("RequestsPage", RequestsPage);
        }
    }
});
//# sourceMappingURL=requestsPage.js.map