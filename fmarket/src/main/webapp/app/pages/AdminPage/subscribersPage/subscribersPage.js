System.register(['angular2/core', 'angular2/common', 'angular2/http', '../../../components/ActionDialog/actionDialog'], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, actionDialog_1;
    var applicationPath, SubscribersPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (actionDialog_1_1) {
                actionDialog_1 = actionDialog_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/subscribersPage';
            SubscribersPage = (function () {
                function SubscribersPage() {
                    // code...
                }
                SubscribersPage.prototype.ngOnInit = function () {
                };
                SubscribersPage = __decorate([
                    core_1.Component({
                        selector: 'subscribers-Page',
                        templateUrl: applicationPath + '/subscribersPage.html',
                        styleUrls: [applicationPath + '/subscribersPage.css'],
                        encapsulation: core_1.ViewEncapsulation.None,
                        providers: [http_1.HTTP_PROVIDERS],
                        directives: [actionDialog_1.ActionDialog, common_1.NgForm]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SubscribersPage);
                return SubscribersPage;
            }());
            exports_1("SubscribersPage", SubscribersPage);
        }
    }
});
//# sourceMappingURL=subscribersPage.js.map