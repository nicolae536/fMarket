import {Component} from 'angular2/core';
import {RouteConfig, Router, Route, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {HeaderComponent} from './components/headerComponent/headerComponent'
import {AdminPage} from './pages/adminPage/adminPage';
import {HomePage} from "./pages/homePage/homePage";
import {RegistrationPage} from "./pages/registrationPage/registrationPage";

@Component({
    selector: 'my-app',
    template: `
        <header-component></header-component>
        <div class="page-container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles:[`.page-container{
        padding-top:5%;
        padding-left: 5%;
        padding-right: 5%;
    }`],
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
})

@RouteConfig([
    new Route({
        path: '/',
        name: 'Home',
        component: HomePage,
        useAsDefault:true
    }),
    new Route({
        path: '/registration',
        name: 'Registration',
        component: RegistrationPage
    }),
    new Route({
        path: '/admin/...',
        name: 'Admin',
        component: AdminPage
    })])

export class AppComponent {
    router:Router;
    location:Location;

    constructor(router:Router, location:Location) {
        this.router = router;
        this.location = location;
    }

}
