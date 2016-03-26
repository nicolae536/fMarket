import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {Subscriber} from '../../../models/subscriber'
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
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

	providers:[HTTP_PROVIDERS],
	directives:[ActionDialog, NgForm]
})

export class SubscribersPage extends PageWithNavigation implements OnInit{
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

	subscribersList: Array<Subscriber> = new Array<Subscriber> (new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234))

	constructor() {
		super();
	}

	ngOnInit(){
		this.cityList = CITYES;
		this.getSubscribersWithFilters();
	}

	getSubscribersWithFilters(){
		
	}

	toggleEditMode(subscriber: Subscriber){
		subscriber.isInEditMode = true;
	}

	saveEditedSubscriber(subscriber: Subscriber){
		subscriber.isInEditMode = false;
	}
}