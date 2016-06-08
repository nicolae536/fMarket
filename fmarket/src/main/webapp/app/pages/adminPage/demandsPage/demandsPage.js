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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tabsRoutingComponent_1 = require("../../../components/tabsComponent/tabsRoutingComponent");
var newDemandsListPage_1 = require("./demandsListPage/newDemandsListPage");
var allDemandsListPage_1 = require("./demandsListPage/allDemandsListPage");
var template = require('./demandsPage.html');
var DemandsPage = (function () {
    function DemandsPage() {
        this.tabPagesList = [{ name: 'Cereri noi', link: '/admin/cereri/newDemands', enableMarker: false, markerContent: "" },
            { name: 'Cereri', link: '/admin/cereri/lista', enableMarker: true, markerContent: "" }
        ];
    }
    DemandsPage = __decorate([
        core_1.Component({
            selector: 'demands-page',
            template: template,
            //styleUrls: [applicationPath + '/demandsPage.css'],
            directives: [tabsRoutingComponent_1.TabsRoutingComponent, router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            new router_1.Route({
                path: '/newDemands',
                component: newDemandsListPage_1.NewDemandsListPage,
            }),
            new router_1.Route({
                path: '/lista',
                component: allDemandsListPage_1.AllDemandsListPage,
            })
        ]), 
        __metadata('design:paramtypes', [])
    ], DemandsPage);
    return DemandsPage;
})();
exports.DemandsPage = DemandsPage;
//# sourceMappingURL=demandsPage.js.map