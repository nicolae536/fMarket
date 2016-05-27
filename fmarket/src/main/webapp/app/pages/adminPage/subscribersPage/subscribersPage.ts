import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NgForm} from "@angular/common";
import {DROPDOWN_DIRECTIVES, DATEPICKER_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import "rxjs/add/operator/map";
import {Subscriber} from "../../../models/subscriber";
import {ActionDialog} from "../../../components/actionDialog/actionDialog";
import {SubscribersService} from "../../../services/subscribersService";
import {PageWithNavigation} from "../../../components/pageWithNavigation/pageWithNavigation";
import {CreateSubscriberDialog} from "../../../components/createSubscriberDialog/createSubscriberDialog";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {LocalizationService} from "../../../services/localizationService";

var applicationPath:string = '/app/pages/adminPage/subscribersPage';

@Component({
    selector: 'subscribers-Page',
    templateUrl: applicationPath + '/subscribersPage.html',
    styleUrls: [applicationPath + '/subscribersPage.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [CreateSubscriberDialog, ActionDialog, NgForm, DATEPICKER_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
export class SubscribersPage extends PageWithNavigation implements OnInit {
    _subscribersService:SubscribersService;
    actionDialog:ActionDialog;
    subscribeDatePicker = {state: false};
    unSubscribeDatePicker = {state: false};

    orderList:Array<Object> = [{value: -1, text: "Chose..."},
        {value: 1, text: "Ascending"},
        {value: 2, text: "Descending"}];

    cityList:Array<Object>;

    sortKey = "EMAIL";
    sortOrder = true;

    //sortOrder true -> ascending
    sortkeyAndFilter = [];

    emailFilter = "";
    subscribeDateFilter = new Date();
    unsubscribeDateFilter = new Date();

    dateTimePlaceHolder:string = ApplicationConstants.getLocaleDateString();
    subscriberFormatedDate:string;
    unsubscriberFormatedDate:string;

    createSubscriberDialog:CreateSubscriberDialog;
    subscribersList:Array<Subscriber> = [];
    private deleteMessage = "Are you sure that you want to delete this subscriber ?";
    private _localizationService:LocalizationService;

    constructor(subscribersService:SubscribersService, localizationService:LocalizationService) {
        super();

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
            })
            .subscribe(
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
    
    updateSubscribeDatePicker(){
        let dateString = ApplicationConstants.getLocaleDateString();

        if(! ApplicationConstants.getLocaleDateRegex().test(this.subscriberFormatedDate)){
            this.subscriberFormatedDate = '';
            return;
        }

        this.subscribeDateFilter = new Date(this.subscriberFormatedDate);
    }

    updateunSubscribeDatePicker(){
        let dateString = ApplicationConstants.getLocaleDateString();

        if(! ApplicationConstants.getLocaleDateRegex().test(this.unsubscriberFormatedDate)){
            this.unsubscriberFormatedDate = '';
            return;
        }

        this.unsubscribeDateFilter = new Date(this.unsubscriberFormatedDate);
    }

    private getCities() {
        let me = this;
        me._localizationService.getCityList()
            .map(response=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                succesR=>{
                    me.cityList=succesR;
                },
                error=>{
                    me.cityList=[];
                }
            )
    }
}