import 'zone.js';
import 'reflect-metadata';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AppComponent} from './app.component';
import {provide, enableProdMode} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {HTTP_PROVIDERS} from '@angular/http';
import * as _ from 'underscore';
// import * as $ from 'jquery';
// import * as animateScroll from 'animateScroll';
//
// _.extend($, {animateScroll: animateScroll});

enableProdMode();
//console.log(HTTP_PROVIDERS);
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
]);