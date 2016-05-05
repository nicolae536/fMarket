System.register(["angular2/core", "angular2/router", "ng2-bootstrap/ng2-bootstrap", "../../services/authorizationService"], function(exports_1, context_1) {
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
    var core_1, router_1, ng2_bootstrap_1, authorizationService_1;
    var directoryPath, HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (authorizationService_1_1) {
                authorizationService_1 = authorizationService_1_1;
            }],
        execute: function() {
            directoryPath = '/app/components/headerComponent';
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent.prototype.ngOnInit = function () {
                    this._usersApplicationPages = [
                        { link: 'Home', name: 'Home' },
                        { link: 'Registration', name: 'Registration' },
                        { link: 'Login', name: 'Login' }
                    ];
                    if (authorizationService_1.AuthorizationService.isLoggedIn()) {
                        this._adminApplicationPages = [
                            { link: 'Admin/Users', name: 'Useri' },
                            { link: 'Admin/Subscribers', name: 'Subscriberi' },
                            { link: 'Admin/Categories/CategoriesMenu', name: 'Meniu categorii' },
                            { link: 'Admin/Categories/Companies', name: 'Compani' },
                            { link: 'Admin/Categories/Domains', name: 'Domenii' },
                            { link: 'Admin/Demands/NewDemandsList', name: 'Cereri noi' },
                            { link: 'Admin/Demands/DemandsList', name: 'Cereri' }
                        ];
                    }
                };
                HeaderComponent.prototype.isLoggedIn = function () {
                    return authorizationService_1.AuthorizationService.isLoggedIn();
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'header-component',
                        templateUrl: directoryPath + '/headerComponent.html',
                        directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
                        providers: [authorizationService_1.AuthorizationService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=headerComponent.js.map