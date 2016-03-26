System.register(['angular2/core', 'angular2/common', 'angular2/http', '../../../models/subscriber', '../../../components/actionDialog/actionDialog', '../../../components/pageWithNavigation/pageWithNavigation', '../../../services/mock-providers/mock-City'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, subscriber_1, actionDialog_1, pageWithNavigation_1, mock_City_1;
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
            function (subscriber_1_1) {
                subscriber_1 = subscriber_1_1;
            },
            function (actionDialog_1_1) {
                actionDialog_1 = actionDialog_1_1;
            },
            function (pageWithNavigation_1_1) {
                pageWithNavigation_1 = pageWithNavigation_1_1;
            },
            function (mock_City_1_1) {
                mock_City_1 = mock_City_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/subscribersPage';
            SubscribersPage = (function (_super) {
                __extends(SubscribersPage, _super);
                function SubscribersPage() {
                    _super.call(this);
                    this.orderList = new Array({ value: -1, text: "Chose..." }, { value: 1, text: "Ascending" }, { value: 2, text: "Descending" });
                    this.emailFilter = "";
                    this.emailOrder = -1;
                    this.subscribeDateFilter = "";
                    this.subscribeDateOrder = -1;
                    this.unsubscribeDateFilter = "";
                    this.unsubscribeDateOrder = -1;
                    this.subscribersList = new Array(new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234), new subscriber_1.Subscriber("1", "asd", "asd", new Date(1, 1, 1, 1, 1, 1, 1), new Date(1, 1, 1, 1, 1, 1, 1), 1234));
                }
                SubscribersPage.prototype.ngOnInit = function () {
                    this.cityList = mock_City_1.CITYES;
                    this.getSubscribersWithFilters();
                };
                SubscribersPage.prototype.getSubscribersWithFilters = function () {
                };
                SubscribersPage.prototype.toggleEditMode = function (subscriber) {
                    subscriber.isInEditMode = true;
                };
                SubscribersPage.prototype.saveEditedSubscriber = function (subscriber) {
                    subscriber.isInEditMode = false;
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
            }(pageWithNavigation_1.PageWithNavigation));
            exports_1("SubscribersPage", SubscribersPage);
        }
    }
});
//# sourceMappingURL=subscribersPage.js.map