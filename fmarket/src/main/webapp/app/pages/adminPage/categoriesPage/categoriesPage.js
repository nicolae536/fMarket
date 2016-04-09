System.register(['angular2/core', 'angular2/router', "./companiesPage/companiesPage", "./requestsPage/requestsPage", "./categoriesMenuPage/categoriesMenuPage"], function(exports_1) {
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
    var core_1, router_1, companiesPage_1, requestsPage_1, categoriesMenuPage_1;
    var applicationPath, CategoriesPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (companiesPage_1_1) {
                companiesPage_1 = companiesPage_1_1;
            },
            function (requestsPage_1_1) {
                requestsPage_1 = requestsPage_1_1;
            },
            function (categoriesMenuPage_1_1) {
                categoriesMenuPage_1 = categoriesMenuPage_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/categoriesPage';
            CategoriesPage = (function () {
                function CategoriesPage(location, router) {
                    this.tabPagesList = [{ name: 'Categori', link: 'Categories/CategoriesMenu' },
                        { name: 'Companii', link: 'Categories/Companies' },
                        { name: 'Cereri', link: 'Categories/Requests' }];
                    this.location = location;
                    this.router = router;
                }
                CategoriesPage = __decorate([
                    core_1.Component({
                        selector: 'categoryes-page',
                        templateUrl: applicationPath + '/categoriesPage.html',
                        styleUrls: [applicationPath + '/categoriesPage.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/meniu', component: categoriesMenuPage_1.CategoriesMenuPage, name: 'CategoriesMenu' }),
                        new router_1.Route({ path: '/firme', component: companiesPage_1.CompaniesPage, name: 'Companies' }),
                        new router_1.Route({ path: '/cereri', component: requestsPage_1.RequestsPage, name: 'Requests' }),
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location, router_1.Router])
                ], CategoriesPage);
                return CategoriesPage;
            })();
            exports_1("CategoriesPage", CategoriesPage);
        }
    }
});
//# sourceMappingURL=categoriesPage.js.map