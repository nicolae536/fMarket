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
 * Created by nick_ on 6/8/2016.
 */
var core_1 = require("@angular/core");
var jqueryService_1 = require("../../../services/jqueryService");
var applicationConstansts_1 = require("../../../models/applicationConstansts");
// let template = require('./companieDetailPage.html');
var CompanieDetailPage = (function () {
    function CompanieDetailPage() {
    }
    CompanieDetailPage.prototype.ngOnInit = function () {
        jqueryService_1.JqueryService.removeElementWithAnimation('#' + applicationConstansts_1.ApplicationConstants.LOADING_SPINNER);
    };
    CompanieDetailPage = __decorate([
        core_1.Component({
            selector: 'compnaie-details-Page',
            // template:template,
            templateUrl: '/app/pages/companiesPage/companieDetailPage/companieDetailPage.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CompanieDetailPage);
    return CompanieDetailPage;
})();
exports.CompanieDetailPage = CompanieDetailPage;
//# sourceMappingURL=companieDetailPage.js.map