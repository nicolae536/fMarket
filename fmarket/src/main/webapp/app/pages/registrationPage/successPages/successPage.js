/**
 * Created by nick_ on 5/5/2016.
 */
"use strict";
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
// import {RouteParams} from "@angular/common";
var SuccessPage = (function () {
    function SuccessPage(router) {
        this._router = router;
    }
    SuccessPage.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        var succesOption = curr.getParam('succesOption');
        switch (succesOption) {
            case 'success-registration':
                this.message = 'Ati fost inregistrat cu success. O sa primiti un email pentru a confirma contul creat';
                break;
            case 'success-rest-password':
                this.message = 'Parola a fost resetata cu success. O sa primiti un email pentru a confirma resetarea parolei';
                break;
            case 'create-demand':
                this.message = 'Cererea a fost creata cu success.';
                break;
        }
    };
    SuccessPage = __decorate([
        core_1.Component({
            selector: 'success-register-page',
            templateUrl: 'app/pages/registrationPage/successPages/successPage.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SuccessPage);
    return SuccessPage;
}());
exports.SuccessPage = SuccessPage;
//# sourceMappingURL=successPage.js.map