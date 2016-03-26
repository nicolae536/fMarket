import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {Subscriber} from '../../../models/subscriber'
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {SubscribersService} from '../../../services/subscribersService';
import {DialogActionResult} from  '../../../components/modalDialog/modalDialog';
import {PageWithNavigation} from  '../../../components/pageWithNavigation/pageWithNavigation';

//import mocks
import {CITYES} from '../../../services/mock-providers/mock-City';

var applicationPath: string = '/app/pages/adminPage/subscribersPage';

@Component({
	selector: 'subscribers-Page',
	templateUrl: applicationPath + '/subscribersPage.html',
	styleUrls:[	applicationPath + '/subscribersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[SubscribersService,HTTP_PROVIDERS],
	directives:[ActionDialog, NgForm]
})

export class SubscribersPage extends PageWithNavigation implements OnInit{
	_subscribersService:SubscribersService;
	actionDialog:ActionDialog;

	orderList:Array<Object> =  new Array<Object>(
		{value:-1 , text:"Chose..."}, 
		{value:1 , text:"Ascending"}, 
		{value:2 , text:"Descending"});

	cityList:  Array<Object>;         

	emailFilter = "";
	emailOrder = -1;
	subscribeDateFilter = "";
	subscribeDateOrder = -1;
	unsubscribeDateFilter = "";
	unsubscribeDateOrder = -1;
	subscriberBackup :Subscriber;
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

    getSubscribersWithFilters(){
    	var me=this;
    	this._subscribersService.getSubscribersWithFilters(null,this.emailFilter,this.currentPageIndex)
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

    	this.actionDialog.show().then(response => {
    		if(response && response.actionResult == DialogActionResult.CANCEL){
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

    toggleEditMode(subscriber: Subscriber){
    	subscriber.isInEditMode = true;
    }

    saveEditedSubscriber(subscriber: Subscriber){
    	subscriber.isInEditMode = false;
    }
}