"use strict";
require('zone.js');
require('reflect-metadata');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var accountService_1 = require("./services/accountService");
var categoriesMenuService_1 = require("./services/categoriesMenuService");
var companieTypesService_1 = require("./services/companieTypesService");
var demandService_1 = require("./services/demandService");
var requestTypeService_1 = require("./services/requestTypeService");
var subscribersService_1 = require("./services/subscribersService");
var usersService_1 = require("./services/usersService");
var companiesService_1 = require("./services/companiesService");
var fMarketApi_1 = require("./services/fMarketApi");
var localizationService_1 = require("./services/localizationService");
var common_2 = require("@angular/common");
var notificationService_1 = require("./services/notificationService");
var localStorageService_1 = require("./services/localStorageService");
var authorizationService_1 = require("./services/authorizationService");
var registrationService_1 = require("./services/registrationService");
var applicationStateService_1 = require("./services/applicationStateService");
// import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
//enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
    // GOOGLE_MAPS_PROVIDERS,
    common_2.FormBuilder,
    applicationStateService_1.ApplicationStateService,
    fMarketApi_1.FMarketApi,
    notificationService_1.NotificationService,
    localStorageService_1.LocalStorageService,
    registrationService_1.RegistrationService,
    accountService_1.AccountService,
    authorizationService_1.AuthorizationService,
    categoriesMenuService_1.CategoriesMenuService,
    companieTypesService_1.CompanieTypeService,
    demandService_1.DemandService,
    requestTypeService_1.RequestTypeService,
    subscribersService_1.SubscribersService,
    usersService_1.UserService,
    companiesService_1.CompaniesService,
    localizationService_1.LocalizationService
]);
//# sourceMappingURL=main.js.map