import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {provide} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy, ROUTER_PROVIDERS} from 'angular2/router';

//console.log(HTTP_PROVIDERS);
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);