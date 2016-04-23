System.register(["angular2/core", "angular2/router"], function(exports_1, context_1) {
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
    var APPLICATION_PATH, DemandListBaseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            APPLICATION_PATH = '/app/components/demandComponent/demandListBase';
            DemandListBaseComponent = (function () {
                function DemandListBaseComponent(router) {
                    this.demandList = new Array();
                    this.domainList = new Array();
                    this.citiesList = new Array();
                    this._router = router;
                }
                DemandListBaseComponent.prototype.navigateToDetails = function (demand) {
                    this._router.navigate(['Admin/Demands/EditDemand', { id: demand.id }]);
                };
                __decorate([
                    core_1.Input('demand-list'), 
                    __metadata('design:type', Array)
                ], DemandListBaseComponent.prototype, "demandList", void 0);
                __decorate([
                    core_1.Input('domains-list'), 
                    __metadata('design:type', Array)
                ], DemandListBaseComponent.prototype, "domainList", void 0);
                __decorate([
                    core_1.Input('cities-list'), 
                    __metadata('design:type', Array)
                ], DemandListBaseComponent.prototype, "citiesList", void 0);
                DemandListBaseComponent = __decorate([
                    core_1.Component({
                        selector: 'demand-list-component',
                        templateUrl: APPLICATION_PATH + '/demandListBase.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], DemandListBaseComponent);
                return DemandListBaseComponent;
            }());
            exports_1("DemandListBaseComponent", DemandListBaseComponent);
        }
    }
});
//# sourceMappingURL=demandListBase.js.map