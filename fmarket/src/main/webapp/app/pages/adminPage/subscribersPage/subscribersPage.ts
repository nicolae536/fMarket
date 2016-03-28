import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {Subscriber} from '../../../models/subscriber'
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {SubscribersService} from '../../../services/subscribersService';
import {DialogActionResult} from  '../../../components/modalDialog/modalDialog';
import {PageWithNavigation} from  '../../../components/pageWithNavigation/pageWithNavigation';
import {CreateSubscriberDialog} from '../../../components/createSubscriberDialog/createSubscriberDialog';


//import mocks
import {CITYES} from '../../../services/mock-providers/mock-City';

var applicationPath: string = '/app/pages/adminPage/subscribersPage';

@Component({
	selector: 'subscribers-Page',
	templateUrl: applicationPath + '/subscribersPage.html',
	styleUrls:[	applicationPath + '/subscribersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[SubscribersService,HTTP_PROVIDERS],
	directives:[CreateSubscriberDialog ,ActionDialog, NgForm]
})

export class SubscribersPage extends PageWithNavigation implements OnInit{
	_subscribersService:SubscribersService;
	actionDialog:ActionDialog;

	orderList:Array<Object> =  new Array<Object>(
		{value:-1 , text:"Chose..."}, 
		{value:1 , text:"Ascending"}, 
		{value:2 , text:"Descending"});

	cityList:  Array<Object>;         

    sortKey = "email";
    sortOrder = true;

	emailFilter = "";
	emailOrder = true;
	subscribeDateFilter = "";
	subscribeDateOrder = true;
	unsubscribeDateFilter = "";
	unsubscribeDateOrder = true;
	subscriberBackup :Subscriber;
	createSubscriberDialog:CreateSubscriberDialog;
    subscribersList: Array<Subscriber> = new Array<Subscriber>();

    constructor(subscribersService: SubscribersService) {
        super();
        this._subscribersService = subscribersService;
    }

    ngOnInit(){
        this.cityList = CITYES;
        this.getSubscribersWithFilters();
    }

    referenceActionDialogInComponent(modal: ActionDialog){
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateSubscriberDialogInComponent(modal: CreateSubscriberDialog){
        this.createSubscriberDialog = modal;
    }

    createSubscriber(){
        var me = this;
        this.createSubscriberDialog.show().then(response=>{
            if(response == DialogActionResult.CANCEL){
                return;
            }

            this._subscribersService.subscribe(this.createSubscriberDialog.getValue().email)
            .map((response) => response.json())
            .subscribe(
                response => {
                    me.getSubscribersWithFilters();
                },
                error =>{
                    
                });;
        });
    }

    getSubscribersWithFilters(){
    	var me=this;
    	this._subscribersService.getSubscribersWithFilters(null,this.emailFilter,this.currentPageIndex, this.sortKey, this.sortOrder)
    	.map((response) => response.json())
    	.subscribe(
    		response => {
    			me.subscribersList = response.data;
    			me.mapPageIndexes(response.totalPages, response.page);
    		},
    		error =>{

    		});
    }

    subscribe(subscriber:Subscriber){
    	this._subscribersService.subscribe(subscriber.email)
    	.map((response) => response.json())
    	.subscribe(
    		response => {
    		},error=>{

    		})
    }

    unsubscribe(subscriber:Subscriber){
    	this._subscribersService.unsubscribe(subscriber.id)
    	.map((response) => response.json())
    	.subscribe(
    		response => {
    		},error=>{

    		})
    }


    delete(subscriber:Subscriber){
    	var me=this;

    	this.actionDialog.show("Are you sure that you want to delete this subscriber ?").then(response => {
    		if(response && response.data == DialogActionResult.CANCEL){
    			return;
    		}

    		this._subscribersService.delete(subscriber.id)
    		.map((response) => response.json())
    		.subscribe(
    			response => {
    				var subscriberIndex = me.subscribersList.indexOf(subscriber);
                    if(subscriberIndex !== -1)
                    {
                        me.subscribersList.splice(subscriberIndex,1);
                    }
                },error=>{

                });
    	});
    }

    getClassForSorting(orderColum){
        switch (orderColum) {
            case "email":
                return this.emailOrder ? "glyphicon glyphicon-sort-by-attributes" : "glyphicon glyphicon-sort-by-attributes-alt";
                break;
            case "subscribeOrderDate":
                return this.subscribeDateOrder ? "glyphicon glyphicon-sort-by-attributes" : "glyphicon glyphicon-sort-by-attributes-alt";
                break;
            case "unSubscribeOrderDate":
                return this.unsubscribeDateOrder ? "glyphicon glyphicon-sort-by-attributes" : "glyphicon glyphicon-sort-by-attributes-alt";
                break;
        }
    }

    sortByEmail(){
        this.emailOrder = !this.emailOrder;        
        this.subscribeDateOrder = true;
        this.unsubscribeDateOrder = true;

        this.sortKey = "email";
        this.sortOrder = this.emailOrder;

        this.getSubscribersWithFilters();
    }

    sortBySubscribeDate(){
        this.subscribeDateOrder = !this.subscribeDateOrder;
        this.emailOrder = true;
        this.unsubscribeDateOrder = true;

        this.sortKey = "subscribeDate";
        this.sortOrder = this.subscribeDateOrder;
        
        this.getSubscribersWithFilters();
    }

    sortByUnSubscribeDate(){
        this.unsubscribeDateOrder = !this.unsubscribeDateOrder;
        this.emailOrder = true;
        this.subscribeDateOrder = true;

        this.sortKey = "unsubscribeDate";
        this.sortOrder = this.unsubscribeDateOrder;

        this.getSubscribersWithFilters();
    }

    toggleEditMode(subscriber: Subscriber){
    	subscriber.isInEditMode = true;
    }

    saveEditedSubscriber(subscriber: Subscriber){
    	subscriber.isInEditMode = false;
    }

    applyFilters(){
    	this.getSubscribersWithFilters();
    }
}