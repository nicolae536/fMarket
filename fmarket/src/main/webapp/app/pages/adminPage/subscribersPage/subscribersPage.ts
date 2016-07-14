import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NgForm, CORE_DIRECTIVES} from "@angular/common";

import {DROPDOWN_DIRECTIVES, DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

import {SubscribersService} from "../../../services/subscribersService";
import {LocalizationService} from "../../../services/localizationService";
import {NotificationService} from "../../../services/notificationService";

import "rxjs/add/operator/map";
import {ActionDialog} from "../../../components/actionDialog/actionDialog";
import {CreateSubscriberDialog} from "../../../components/createSubscriberDialog/createSubscriberDialog";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {Subscriber} from "../../../models/subscriber";

let template = require('./subscribersPage.html');

@Component({
    selector: 'subscribers-Page',
    template:template,
    //styleUrls: [applicationPath + '/subscribersPage.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [CreateSubscriberDialog, ActionDialog, NgForm, DATEPICKER_DIRECTIVES, DROPDOWN_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class SubscribersPage implements OnInit {
    //<editor-fold desc="Services">
    _subscribersService:SubscribersService;
    private _notificationService:NotificationService;
    private _localizationService:LocalizationService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    actionDialog:ActionDialog;
    createSubscriberDialog:CreateSubscriberDialog;

    subscribeDatePicker = {state: false};
    unSubscribeDatePicker = {state: false};

    orderList:Array<Object> = [{value: -1, text: "Chose..."},
        {value: 1, text: "Ascending"},
        {value: 2, text: "Descending"}];

    cityList:Array<Object>;

    sortKey = "EMAIL";

    sortOrder = true;
    sortkeyAndFilter = [];
    emailFilter = "";

    subscribeDateFilter = new Date();
    unsubscribeDateFilter = new Date();
    dateTimePlaceHolder:string = ApplicationConstants.getLocaleDateString();
    subscriberFormatedDate:string;

    unsubscriberFormatedDate:string;
    private pagination:Object = {totalItems: 1, currentPage: 1, maxSize: 7};
    subscribersList:Array<Subscriber> = [];
    private deleteMessage = "Are you sure that you want to delete this subscriber ?";
    //</editor-fold>

    constructor(subscribersService:SubscribersService, localizationService:LocalizationService, _notificationService:NotificationService) {
        this._notificationService = _notificationService;
        this.sortkeyAndFilter["EMAIL"] = true;
        this.sortkeyAndFilter["SUBSCRIBE_DATE"] = true;
        this.sortkeyAndFilter["UNSUBSCRIBE_DATE"] = true;
        this._localizationService = localizationService;
        this._subscribersService = subscribersService;
    }

    ngOnInit() {
        this.getCities();
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
            .subscribe(
                response => {
                    me.getSubscribersWithFilters();
                    me.createSubscriberDialog.close();
                },
                error => {
                    me._notificationService.emitErrorNotificationToRootComponent('Abonatul nu a putut fi adaugat', 5);
                }
            );
    }

    getSubscribersWithFilters() {
        var me = this;
        this._subscribersService.getSubscribersWithFilters(null, this.emailFilter, this.pagination['currentPage'], this.sortKey, this.sortOrder)
            .subscribe(
                response => {
                    me.subscribersList = response.data;
                    me.pagination['totalItems'] = response.totalPages;
                    me.pagination['currentPage'] = response.page;
                },
                error => {

                });
    }

    subscribe(subscriber:Subscriber) {
        let me = this;
        this._subscribersService.subscribe(subscriber.email)
            .subscribe(
                response => {
                    me.getSubscribersWithFilters();
                }, error=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Userul nu se poate abona.', 5)
                })
    }

    unsubscribe(subscriber:Subscriber) {
        let me = this;
        this._subscribersService.unsubscribe(subscriber.id)
            .subscribe(
                response => {
                }, error=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Userul nu se poate dezabona.', 5)
                });
    }

    actionDialogConfirmDelete(subscriber:Subscriber) {
        var me = this;

        this.actionDialog.hide();
        this._subscribersService.delete(subscriber.id)
            .subscribe(
                response => {
                    var subscriberIndex = me.subscribersList.indexOf(subscriber);
                    if (subscriberIndex !== -1) {
                        me.subscribersList.splice(subscriberIndex, 1);
                    }
                }, error=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Abonatul nu poate fi sters.', 5)
                });
    }

    getClassForSorting(columnName) {
        return this.sortkeyAndFilter[columnName] ? "fa fa-sort" : "fa fa-sort";
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

    openSubscribeDatePicke($event) {
        $event.stopPropagation();
        $event.preventDefault();
        this.subscribeDatePicker.state = true;
        this.subscriberFormatedDate = this.subscribeDateFilter.toLocaleDateString();
    }

    openUnSubscribeDatePicke($event) {
        $event.stopPropagation();
        $event.preventDefault();
        this.unSubscribeDatePicker.state = true;
        this.unsubscriberFormatedDate = this.unsubscribeDateFilter.toLocaleDateString();
    }

    updateSubscribeDatePicker() {
        let dateString = ApplicationConstants.getLocaleDateString();

        if (!ApplicationConstants.getLocaleDateRegex().test(this.subscriberFormatedDate)) {
            this.subscriberFormatedDate = '';
            return;
        }

        this.subscribeDateFilter = new Date(this.subscriberFormatedDate);
    }

    updateunSubscribeDatePicker() {
        let dateString = ApplicationConstants.getLocaleDateString();

        if (!ApplicationConstants.getLocaleDateRegex().test(this.unsubscriberFormatedDate)) {
            this.unsubscriberFormatedDate = '';
            return;
        }

        this.unsubscribeDateFilter = new Date(this.unsubscriberFormatedDate);
    }

    private getCities() {
        let me = this;
        me._localizationService.getCityList()
            .subscribe(
                succesR=> {
                    me.cityList = succesR;
                },
                error=> {
                    me.cityList = [];
                }
            )
    }
}