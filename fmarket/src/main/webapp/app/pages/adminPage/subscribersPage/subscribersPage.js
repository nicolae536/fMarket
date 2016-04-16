System.register(['angular2/core', 'angular2/common', 'rxjs/add/operator/map', '../../../models/subscriber', '../../../components/actionDialog/actionDialog', '../../../services/subscribersService', '../../../components/pageWithNavigation/pageWithNavigation', '../../../components/createSubscriberDialog/createSubscriberDialog', '../../../services/mock-providers/mock-City'], function(exports_1) {
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
    var core_1, common_1, subscriber_1, actionDialog_1, subscribersService_1, pageWithNavigation_1, createSubscriberDialog_1, mock_City_1;
    var applicationPath, SubscribersPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_1) {},
            function (subscriber_1_1) {
                subscriber_1 = subscriber_1_1;
            },
            function (actionDialog_1_1) {
                actionDialog_1 = actionDialog_1_1;
            },
            function (subscribersService_1_1) {
                subscribersService_1 = subscribersService_1_1;
            },
            function (pageWithNavigation_1_1) {
                pageWithNavigation_1 = pageWithNavigation_1_1;
            },
            function (createSubscriberDialog_1_1) {
                createSubscriberDialog_1 = createSubscriberDialog_1_1;
            },
            function (mock_City_1_1) {
                mock_City_1 = mock_City_1_1;
            }],
        execute: function() {
            applicationPath = '/app/pages/adminPage/subscribersPage';
            SubscribersPage = (function (_super) {
                __extends(SubscribersPage, _super);
                function SubscribersPage(subscribersService) {
                    _super.call(this);
                    this.orderList = [{ value: -1, text: "Chose..." },
                        { value: 1, text: "Ascending" },
                        { value: 2, text: "Descending" }];
                    this.sortKey = "EMAIL";
                    this.sortOrder = true;
                    //sortOrder true -> ascending
                    this.sortkeyAndFilter = [];
                    this.emailFilter = "";
                    this.subscribeDateFilter = "";
                    this.unsubscribeDateFilter = "";
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
                SubscribersPage.prototype.createSubscriber = function () {
                    var me = this;
                    this._subscribersService.subscribe(this.createSubscriberDialog.getValue().email)
                        .map(function (response) {
                        if (response.text().length > 0) {
                            return response.json();
                        }
                    }).subscribe(function (response) {
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
                    }).subscribe(function (response) {
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
                    }).subscribe(function (response) {
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
                //
                //delete(subscriber:Subscriber) {
                //    var me = this;
                //
                //    this.actionDialog.show("", subscriber);
                //}
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
                SubscribersPage.prototype.applyFilters = function () {
                    this.getSubscribersWithFilters();
                };
                SubscribersPage = __decorate([
                    core_1.Component({
                        selector: 'subscribers-Page',
                        templateUrl: applicationPath + '/subscribersPage.html',
                        styleUrls: [applicationPath + '/subscribersPage.css'],
                        encapsulation: core_1.ViewEncapsulation.None,
                        providers: [subscribersService_1.SubscribersService],
                        directives: [createSubscriberDialog_1.CreateSubscriberDialog, actionDialog_1.ActionDialog, common_1.NgForm]
                    }), 
                    __metadata('design:paramtypes', [subscribersService_1.SubscribersService])
                ], SubscribersPage);
                return SubscribersPage;
            })(pageWithNavigation_1.PageWithNavigation);
            exports_1("SubscribersPage", SubscribersPage);
        }
    }
});
//# sourceMappingURL=subscribersPage.js.map