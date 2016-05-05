System.register(["angular2/core", "../../../models/accountDto", "../../../services/accountService", "../../../services/demandService", "../../../services/authorizationService", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, accountDto_1, accountService_1, demandService_1, authorizationService_1, router_1;
    var applicationPath, AccountEditPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (accountDto_1_1) {
                accountDto_1 = accountDto_1_1;
            },
            function (accountService_1_1) {
                accountService_1 = accountService_1_1;
            },
            function (demandService_1_1) {
                demandService_1 = demandService_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/accountSettingsPage/accountEditPage';
            AccountEditPage = (function () {
                function AccountEditPage(accountService, demandService) {
                    this._submitLabel = 'Salveaza contul';
                    this._cityesList = new Array();
                    this._accountService = accountService;
                    this._demandService = demandService;
                    this._account = new accountDto_1.AccountDto();
                }
                AccountEditPage.prototype.ngOnInit = function () {
                    this.getCityList();
                };
                AccountEditPage.prototype.accountEditLoaded = function (accountEditComponent) {
                    this._accountEditComponent = accountEditComponent;
                };
                AccountEditPage.prototype.saveEditedAccount = function (editedAccount) {
                    var me = this;
                    this._accountService.saveEditedAccount(editedAccount)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    })
                        .subscribe(function (response) {
                        me._account = response;
                    }, function (errr) {
                    });
                };
                AccountEditPage.prototype.getCityList = function () {
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
                AccountEditPage = __decorate([
                    core_1.Component({
                        selector: 'account-edit-Page',
                        templateUrl: applicationPath + '/accountEditPage.html',
                        providers: [accountService_1.AccountService, demandService_1.DemandService]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.isLoggedIn(); }), 
                    __metadata('design:paramtypes', [accountService_1.AccountService, demandService_1.DemandService])
                ], AccountEditPage);
                return AccountEditPage;
            }());
            exports_1("AccountEditPage", AccountEditPage);
        }
    }
});
//# sourceMappingURL=accountEditPage.js.map