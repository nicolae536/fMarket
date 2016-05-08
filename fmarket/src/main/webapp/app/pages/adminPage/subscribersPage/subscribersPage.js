"use strict";
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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_deprecated_1 = require("@angular/router-deprecated");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
require("rxjs/add/operator/map");
var subscriber_1 = require("../../../models/subscriber");
var actionDialog_1 = require("../../../components/actionDialog/actionDialog");
var subscribersService_1 = require("../../../services/subscribersService");
var pageWithNavigation_1 = require("../../../components/pageWithNavigation/pageWithNavigation");
var createSubscriberDialog_1 = require("../../../components/createSubscriberDialog/createSubscriberDialog");
var mock_City_1 = require("../../../services/mock-providers/mock-City");
var Roles_1 = require("../../../models/Roles");
var authorizationService_1 = require("../../../services/authorizationService");
var applicationConstansts_1 = require("../../../models/applicationConstansts");
//import operators
//-map
//import mocks
var applicationPath = '/app/pages/adminPage/subscribersPage';
var SubscribersPage = (function (_super) {
    __extends(SubscribersPage, _super);
    function SubscribersPage(subscribersService) {
        _super.call(this);
        this.subscribeDatePicker = { state: false };
        this.unSubscribeDatePicker = { state: false };
        this.orderList = [{ value: -1, text: "Chose..." },
            { value: 1, text: "Ascending" },
            { value: 2, text: "Descending" }];
        this.sortKey = "EMAIL";
        this.sortOrder = true;
        //sortOrder true -> ascending
        this.sortkeyAndFilter = [];
        this.emailFilter = "";
        this.subscribeDateFilter = new Date();
        this.unsubscribeDateFilter = new Date();
        this.dateTimePlaceHolder = applicationConstansts_1.ApplicationConstants.getLocaleDateString();
        this.subscribersList = [];
        this.deleteMessage = "Are you sure that you want to delete this subscriber ?";
        this.sortkeyAndFilter["EMAIL"] = true;
        this.sortkeyAndFilter["SUBSCRIBE_DATE"] = true;
        this.sortkeyAndFilter["UNSUBSCRIBE_DATE"] = true;
        this._subscribersService = subscribersService;
    }
    SubscribersPage.prototype.ngOnInit = function () {
        this.cityList = mock_City_1.CITYES;
        this.matchSortOrderByColumn('');
        this.getSubscribersWithFilters();
    };
    SubscribersPage.prototype.referenceActionDialogInComponent = function (modal) {
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    };
    SubscribersPage.prototype.referenceCreateSubscriberDialogInComponent = function (modal) {
        this.createSubscriberDialog = modal;
    };
    SubscribersPage.prototype.showSubscriberDialog = function () {
        this.createSubscriberDialog.show("", new subscriber_1.Subscriber());
    };
    SubscribersPage.prototype.createSubscriber = function (subscriberValue) {
        var me = this;
        this._subscribersService.subscribe(subscriberValue.email)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me.getSubscribersWithFilters();
        }, function (error) {
        });
    };
    SubscribersPage.prototype.getSubscribersWithFilters = function () {
        var me = this;
        this._subscribersService.getSubscribersWithFilters(null, this.emailFilter, this.currentPageIndex, this.sortKey, this.sortOrder)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            me.subscribersList = response.data;
            me.mapPageIndexes(response.totalPages, response.page);
        }, function (error) {
        });
    };
    SubscribersPage.prototype.subscribe = function (subscriber) {
        this._subscribersService.subscribe(subscriber.email)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
        }, function (error) {
        });
    };
    SubscribersPage.prototype.unsubscribe = function (subscriber) {
        this._subscribersService.unsubscribe(subscriber.id)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(function (response) {
        }, function (error) {
        });
    };
    SubscribersPage.prototype.actionDialogConfirmDelete = function (subscriber) {
        var me = this;
        this.actionDialog.hide();
        this._subscribersService.delete(subscriber.id)
            .map(function (response) {
            if (response.text().length > 0) {
                return response.json();
            }
        })
            .subscribe(function (response) {
            var subscriberIndex = me.subscribersList.indexOf(subscriber);
            if (subscriberIndex !== -1) {
                me.subscribersList.splice(subscriberIndex, 1);
            }
        }, function (error) {
        });
    };
    SubscribersPage.prototype.getClassForSorting = function (columnName) {
        return this.sortkeyAndFilter[columnName] ? "glyphicon glyphicon-sort-by-attributes-alt" : "glyphicon glyphicon-sort-by-attributes";
    };
    SubscribersPage.prototype.sortByColumn = function (columnName) {
        this.matchSortOrderByColumn(columnName);
        this.getSubscribersWithFilters();
    };
    SubscribersPage.prototype.matchSortOrderByColumn = function (columnName) {
        var me = this;
        this.sortKey = columnName;
        for (var sortkey in this.sortkeyAndFilter) {
            if (sortkey === columnName) {
                me.sortOrder = this.sortkeyAndFilter[sortkey] = !this.sortkeyAndFilter[sortkey];
            }
            else {
                //true -> ascending
                this.sortkeyAndFilter[sortkey] = true;
            }
        }
    };
    SubscribersPage.prototype.toggleEditMode = function (subscriber) {
        subscriber.isInEditMode = true;
    };
    SubscribersPage.prototype.saveEditedSubscriber = function (subscriber) {
        subscriber.isInEditMode = false;
    };
    SubscribersPage.prototype.openSubscribeDatePicke = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
        this.subscribeDatePicker.state = true;
        this.subscriberFormatedDate = this.subscribeDateFilter.toLocaleDateString();
    };
    SubscribersPage.prototype.openUnSubscribeDatePicke = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
        this.unSubscribeDatePicker.state = true;
        this.unsubscriberFormatedDate = this.unsubscribeDateFilter.toLocaleDateString();
    };
    SubscribersPage.prototype.updateSubscribeDatePicker = function () {
        var dateString = applicationConstansts_1.ApplicationConstants.getLocaleDateString();
        if (!applicationConstansts_1.ApplicationConstants.getLocaleDateRegex().test(this.subscriberFormatedDate)) {
            this.subscriberFormatedDate = '';
            return;
        }
        this.subscribeDateFilter = new Date(this.subscriberFormatedDate);
    };
    SubscribersPage.prototype.updateunSubscribeDatePicker = function () {
        var dateString = applicationConstansts_1.ApplicationConstants.getLocaleDateString();
        if (!applicationConstansts_1.ApplicationConstants.getLocaleDateRegex().test(this.unsubscriberFormatedDate)) {
            this.unsubscriberFormatedDate = '';
            return;
        }
        this.unsubscribeDateFilter = new Date(this.unsubscriberFormatedDate);
    };
    SubscribersPage = __decorate([
        core_1.Component({
            selector: 'subscribers-Page',
            templateUrl: applicationPath + '/subscribersPage.html',
            styleUrls: [applicationPath + '/subscribersPage.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [createSubscriberDialog_1.CreateSubscriberDialog, actionDialog_1.ActionDialog, common_1.NgForm, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }),
        router_deprecated_1.CanActivate(function () {
            return authorizationService_1.AuthorizationService.isLoggedIn() && authorizationService_1.AuthorizationService.hasRole(Roles_1.Role.ADMIN);
        }), 
        __metadata('design:paramtypes', [subscribersService_1.SubscribersService])
    ], SubscribersPage);
    return SubscribersPage;
}(pageWithNavigation_1.PageWithNavigation));
exports.SubscribersPage = SubscribersPage;
//# sourceMappingURL=subscribersPage.js.map