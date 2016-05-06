System.register(['angular2/core', 'angular2/router', "../../../components/tabsComponent/tabsRoutingComponent", "./demandsListPage/newDemandsListPage", "./demandsListPage/allDemandsListPage", "../../../models/Roles", "../../../services/authorizationService"], function(exports_1, context_1) {
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
    var core_1, router_1, tabsRoutingComponent_1, newDemandsListPage_1, allDemandsListPage_1, Roles_1, authorizationService_1;
    var applicationPath, DemandsPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tabsRoutingComponent_1_1) {
                tabsRoutingComponent_1 = tabsRoutingComponent_1_1;
            },
            function (newDemandsListPage_1_1) {
                newDemandsListPage_1 = newDemandsListPage_1_1;
            },
            function (allDemandsListPage_1_1) {
                allDemandsListPage_1 = allDemandsListPage_1_1;
            },
            function (Roles_1_1) {
                Roles_1 = Roles_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/demandsPage';
            DemandsPage = (function () {
                function DemandsPage() {
                    this.tabPagesList = [{ name: 'Cereri noi', link: 'Demands/NewDemandsList', enableMarker: false, markerContent: "" },
                        { name: 'Cereri', link: 'Demands/DemandsList', enableMarker: true, markerContent: "" },
                    ];
                }
                DemandsPage = __decorate([
                    core_1.Component({
                        selector: 'demands-page',
                        templateUrl: applicationPath + '/demandsPage.html',
                        styleUrls: [applicationPath + '/demandsPage.css'],
                        directives: [tabsRoutingComponent_1.TabsRoutingComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function () { return authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN) && authorizationService_1.AuthorizationService.isLoggedIn(); }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/newDemands',
                            component: newDemandsListPage_1.NewDemandsListPage,
                            name: 'NewDemandsList',
                            useAsDefault: true
                        }),
                        new router_1.Route({
                            path: '/lista',
                            component: allDemandsListPage_1.AllDemandsListPage,
                            name: 'DemandsList',
                        })
                    ]), 
                    __metadata('design:paramtypes', [])
                ], DemandsPage);
                return DemandsPage;
            }());
            exports_1("DemandsPage", DemandsPage);
        }
    }
});
//# sourceMappingURL=demandsPage.js.map