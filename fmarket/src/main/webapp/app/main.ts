import 'zone.js';
import 'reflect-metadata';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
import {provide, enableProdMode} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {HTTP_PROVIDERS} from '@angular/http';
import {AccountService} from "./services/accountService";
import {CategoriesMenuService} from "./services/categoriesMenuService";
import {CompanieTypeService} from "./services/companieTypesService";
import {DemandService} from "./services/demandService";
import {RequestTypeService} from "./services/requestTypeService";
import {SubscribersService} from "./services/subscribersService";
import {UserService} from "./services/usersService";
import {CompaniesService} from "./services/companiesService";
import {FMarketApi} from "./services/fMarketApi";
import {LocalizationService} from "./services/localizationService";
import {FormBuilder} from "@angular/common";
import {NotificationService} from "./services/notificationService";
import {LocalStorageService} from "./services/localStorageService";
import {AuthorizationService} from "./services/authorizationService";
import {RegistrationService} from "./services/registrationService";

enableProdMode();
//console.log(HTTP_PROVIDERS);
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),

    FormBuilder,
    FMarketApi,
    NotificationService,
    LocalStorageService,
    RegistrationService,
    AccountService,
    AuthorizationService,
    CategoriesMenuService,
    CompanieTypeService,
    DemandService,
    RequestTypeService,
    SubscribersService,
    UserService,
    CompaniesService,
    LocalizationService,
]);