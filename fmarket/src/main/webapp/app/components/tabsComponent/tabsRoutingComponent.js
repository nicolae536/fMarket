System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var applicationPath, TabsRoutingComponent, Tab;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            applicationPath = '/app/components/tabsComponent';
            TabsRoutingComponent = (function () {
                function TabsRoutingComponent(router) {
                    this.router = router;
                }
                __decorate([
                    core_1.Input('tabs-pages-list'), 
                    __metadata('design:type', Array)
                ], TabsRoutingComponent.prototype, "tabPagesList", void 0);
                TabsRoutingComponent = __decorate([
                    core_1.Component({
                        selector: 'tabs-component',
                        templateUrl: applicationPath + '/tabsComponent.html',
                        styleUrls: [applicationPath + '/tabsComponent.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], TabsRoutingComponent);
                return TabsRoutingComponent;
            }());
            exports_1("TabsRoutingComponent", TabsRoutingComponent);
            Tab = (function () {
                function Tab() {
                    this.name = "";
                    this.link = "";
                    this.enableMarker = false;
                    this.markerContent = "";
                }
                return Tab;
            }());
            exports_1("Tab", Tab);
        }
    }
});
//# sourceMappingURL=tabsRoutingComponent.js.map