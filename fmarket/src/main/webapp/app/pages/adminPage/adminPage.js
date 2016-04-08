System.register(['angular2/core', 'angular2/router', './usersPage/usersPage', './subscribersPage/subscribersPage', './categoriesPage/categoriesPage'], function(exports_1) {
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
    var core_1, router_1, usersPage_1, subscribersPage_1, categoriesPage_1;
    var applicationPath, AdminPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (usersPage_1_1) {
                usersPage_1 = usersPage_1_1;
            },
            function (subscribersPage_1_1) {
                subscribersPage_1 = subscribersPage_1_1;
            },
            function (categoriesPage_1_1) {
                categoriesPage_1 = categoriesPage_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage';
            AdminPage = (function () {
                function AdminPage(location, router) {
                    this.location = location;
                    this.router = router;
                }
                AdminPage = __decorate([
                    core_1.Component({
                        selector: 'admin-Page',
                        templateUrl: applicationPath + '/adminPage.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/users', component: usersPage_1.UsersPage, name: 'Users' }),
                        new router_1.Route({ path: '/subscribers', component: subscribersPage_1.SubscribersPage, name: 'Subscribers' }),
                        new router_1.Route({ path: '/categorii/...', component: categoriesPage_1.CategoriesPage, name: 'Categories' }),
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location, router_1.Router])
                ], AdminPage);
                return AdminPage;
            })();
            exports_1("AdminPage", AdminPage);
        }
    }
});
//# sourceMappingURL=adminPage.js.map