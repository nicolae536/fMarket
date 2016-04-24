import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Http} from 'angular2/http';

//import operators
import 'rxjs/add/operator/map';//-map

import {Subscriber} from '../../../models/subscriber'
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {SubscribersService} from '../../../services/subscribersService';
import {DialogActionResult} from  '../../../components/modalDialog/modalDialog';
import {PageWithNavigation} from  '../../../components/pageWithNavigation/pageWithNavigation';
import {CreateSubscriberDialog} from '../../../components/createSubscriberDialog/createSubscriberDialog';

//import mocks
import {CITYES} from '../../../services/mock-providers/mock-City';

var applicationPath:string = '/app/pages/adminPage/subscribersPage';

@Component({
    selector: 'subscribers-Page',
    templateUrl: applicationPath + '/subscribersPage.html',
    styleUrls: [applicationPath + '/subscribersPage.css'],
    encapsulation: ViewEncapsulation.None,

    providers: [SubscribersService],
    directives: [CreateSubscriberDialog, ActionDialog, NgForm]
})

export class SubscribersPage extends PageWithNavigation implements OnInit {
    _subscribersService:SubscribersService;
    actionDialog:ActionDialog;

    orderList:Array<Object> = [{value: -1, text: "Chose..."},
        {value: 1, text: "Ascending"},
        {value: 2, text: "Descending"}];

    cityList:Array<Object>;

    sortKey = "EMAIL";
    sortOrder = true;

    //sortOrder true -> ascending
    sortkeyAndFilter = [];

    emailFilter = "";
    subscribeDateFilter = "";
    unsubscribeDateFilter = "";
    subscriberBackup:Subscriber;
    createSubscriberDialog:CreateSubscriberDialog;
    subscribersList:Array<Subscriber> = [];
    private deleteMessage = "Are you sure that you want to delete this subscriber ?";

    constructor(subscribersService:SubscribersService) {
        super();
        this.sortkeyAndFilter["EMAIL"] = true;
        this.sortkeyAndFilter["SUBSCRIBE_DATE"] = true;
        this.sortkeyAndFilter["UNSUBSCRIBE_DATE"] = true;
        this._subscribersService = subscribersService;
    }

    ngOnInit() {
        this.cityList = CITYES;
        this.matchSortOrderByColumn('');
        this.getSubscribersWithFilters();
    }

    referenceActionDialogInComponent(modal:ActionDialog) {
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateSubscriberDialogInComponent(modal:CreateSubscriberDialog) {
        this.createSubscriberDialog = modal;
    }

    showSubscriberDialog() {
        this.createSubscriberDialog.show("", new Subscriber());
    }

    createSubscriber(subscriberValue:Subscriber) {
        var me = this;

        this._subscribersService.subscribe(subscriberValue.email)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me.getSubscribersWithFilters();
                },
                error => {
                }
            );
    }

    getSubscribersWithFilters() {
        var me = this;
        this._subscribersService.getSubscribersWithFilters(null, this.emailFilter, this.currentPageIndex, this.sortKey, this.sortOrder)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })            .subscribe(
                response => {
                    me.subscribersList = response.data;
                    me.mapPageIndexes(response.totalPages, response.page);
                },
                error => {

                });
    }

    subscribe(subscriber:Subscriber) {
        this._subscribersService.subscribe(subscriber.email)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                }, error=> {

            })
    }

    unsubscribe(subscriber:Subscriber) {
        this._subscribersService.unsubscribe(subscriber.id)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })            .subscribe(
                response => {
                }, error=> {

                })
    }

    //
    //delete(subscriber:Subscriber) {
    //    var me = this;
    //
    //    this.actionDialog.show("", subscriber);
    //}

    actionDialogConfirmDelete(subscriber:Subscriber) {
        var me = this;

        this.actionDialog.hide();
        this._subscribersService.delete(subscriber.id)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    var subscriberIndex = me.subscribersList.indexOf(subscriber);
                    if (subscriberIndex !== -1) {
                        me.subscribersList.splice(subscriberIndex, 1);
                    }
                }, error=> {

                });
    }

    getClassForSorting(columnName) {
        return this.sortkeyAndFilter[columnName] ? "glyphicon glyphicon-sort-by-attributes-alt" : "glyphicon glyphicon-sort-by-attributes";
    }

    sortByColumn(columnName) {
        this.matchSortOrderByColumn(columnName);
        this.getSubscribersWithFilters();
    }

    matchSortOrderByColumn(columnName) {
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
    }

    toggleEditMode(subscriber:Subscriber) {
        subscriber.isInEditMode = true;
    }

    saveEditedSubscriber(subscriber:Subscriber) {
        subscriber.isInEditMode = false;
    }

    applyFilters() {
        this.getSubscribersWithFilters();
    }
}