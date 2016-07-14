import 'zone.js';
import 'reflect-metadata';

import {bootstrap}    from '@angular/platform-browser-dynamic';


import {AppComponent} from './app.component';
import {LocationStrategy, HashLocationStrategy, CORE_DIRECTIVES} from '@angular/common'
import {HTTP_PROVIDERS} from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {APP_ROUTER_PROVIDERS} from './app.routes';
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
import {ApplicationStateService} from "./services/applicationStateService";

import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {AuthorizationFilter} from "./services/AuthorizationFilter";

//enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    PAGINATION_DIRECTIVES,
    CORE_DIRECTIVES,
    disableDeprecatedForms(),
    provideForms(),
    {provide:LocationStrategy, useClass: HashLocationStrategy},
    GOOGLE_MAPS_PROVIDERS,

    FormBuilder,
    ApplicationStateService,
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
    AuthorizationFilter
]);