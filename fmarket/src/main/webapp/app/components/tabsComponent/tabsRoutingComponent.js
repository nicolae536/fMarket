var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 4/21/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var applicationPath = '/app/components/tabsComponent';
var TabsRoutingComponent = (function () {
    function TabsRoutingComponent(router) {
        this.router = router;
    }
    TabsRoutingComponent.prototype.checkRoute = function (link) {
        return JSON.stringify(this.router.createUrlTree([link])) == JSON.stringify(this.router.urlTree) ? 'active' : '';
    };
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
})();
exports.TabsRoutingComponent = TabsRoutingComponent;
//# sourceMappingURL=tabsRoutingComponent.js.map