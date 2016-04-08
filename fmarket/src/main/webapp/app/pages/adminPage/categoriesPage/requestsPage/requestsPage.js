System.register(['angular2/core', 'angular2/http', '../../../../models/requestType', '../../../../services/requestTypeService'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
            })();
            exports_1("RequestsPage", RequestsPage);
        }
    }
});
//# sourceMappingURL=requestsPage.js.map