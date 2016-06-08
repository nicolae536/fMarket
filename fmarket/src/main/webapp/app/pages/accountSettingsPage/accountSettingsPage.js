/**
 * Created by nick_ on 4/26/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var notificationService_1 = require("../../services/notificationService");
var jqueryService_1 = require("../../services/jqueryService");
var accountEditPage_1 = require("./accountEditPage/accountEditPage");
var accountDemandsPage_1 = require("./accountDemandsPage/accountDemandsPage");
var authorizationService_1 = require("../../services/authorizationService");
var applicationConstansts_1 = require("../../models/applicationConstansts");
var tabsRoutingComponent_1 = require("../../components/tabsComponent/tabsRoutingComponent");
var Roles_1 = require("../../models/Roles");
var template = require('./accountSettingsPage.html');
var AccountSettingsPage = (function () {
    //</editor-fold>
    function AccountSettingsPage(router, notificationService) {
        this.router = router;
        this.tabPagesList = [{ name: 'Contul meu', link: '/account/details', enableMarker: false, markerContent: "" },
            { name: 'Cererile mele', link: '/account/demands', enableMarker: false, markerContent: "" }];
        this._notificationService = notificationService;
        jqueryService_1.JqueryService.removeElementWithAnimation(document.getElementById(applicationConstansts_1.ApplicationConstants.LOADING_SPINNER));
    }
    AccountSettingsPage.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        if (!(authorizationService_1.AuthorizationService.isLoggedIn() && !authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN))) {
            this.router.navigate(['/login']);
            this._notificationService.e("Nu aveti access la acest modul !!!", 5);
        }
    };
    AccountSettingsPage = __decorate([
        core_1.Component({
            selector: 'account-settings-Page',
            template: template,
            directives: [router_1.ROUTER_DIRECTIVES, tabsRoutingComponent_1.TabsRoutingComponent]
        }),
        router_1.Routes([
            new router_1.Route({
                path: '/details',
                component: accountEditPage_1.AccountEditPage,
            }),
            new router_1.Route({
                path: '/demands',
                component: accountDemandsPage_1.AccountDemandsPage,
            })
        ]), 
        __metadata('design:paramtypes', [router_1.Router, notificationService_1.NotificationService])
    ], AccountSettingsPage);
    return AccountSettingsPage;
})();
exports.AccountSettingsPage = AccountSettingsPage;
//# sourceMappingURL=accountSettingsPage.js.map