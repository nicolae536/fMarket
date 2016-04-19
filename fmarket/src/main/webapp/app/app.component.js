System.register(['angular2/core', 'angular2/router', './components/headerComponent/headerComponent', './pages/adminPage/adminPage', "./pages/homePage/homePage", "./pages/registrationPage/registrationPage", "./pages/registrationPage/forgetPasswordPage/forgetPasswordPage"], function(exports_1, context_1) {
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
    var core_1, router_1, headerComponent_1, adminPage_1, homePage_1, registrationPage_1, forgetPasswordPage_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (headerComponent_1_1) {
                headerComponent_1 = headerComponent_1_1;
            },
            function (adminPage_1_1) {
                adminPage_1 = adminPage_1_1;
            },
            function (homePage_1_1) {
                homePage_1 = homePage_1_1;
            },
            function (registrationPage_1_1) {
                registrationPage_1 = registrationPage_1_1;
            },
            function (forgetPasswordPage_1_1) {
                forgetPasswordPage_1 = forgetPasswordPage_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, location) {
                    this.router = router;
                    this.location = location;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <header-component></header-component>\n        <div class=\"page-container\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        styles: [".page-container{\n        padding-top:5%;\n        padding-left: 5%;\n        padding-right: 5%;\n    }"],
                        directives: [router_1.ROUTER_DIRECTIVES, headerComponent_1.HeaderComponent],
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/',
                            name: 'Home',
                            component: homePage_1.HomePage,
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/registration',
                            name: 'Registration',
                            component: registrationPage_1.RegistrationPage
                        }),
                        new router_1.Route({
                            path: '/forget-password',
                            name: 'ForgetPassword',
                            component: forgetPasswordPage_1.ForgetPasswordPage
                        }),
                        new router_1.Route({
                            path: '/admin/...',
                            name: 'Admin',
                            component: adminPage_1.AdminPage
                        })]), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map