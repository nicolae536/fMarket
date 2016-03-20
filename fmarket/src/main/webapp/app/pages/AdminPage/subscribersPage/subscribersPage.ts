import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {Subscriber} from '../../../models/subscriber'
import {ActionDialog} from '../../../components/ActionDialog/actionDialog';
import {DialogActionResult} from  '../../../components/ModalDialog/modalDialog';

var applicationPath: string = '/app/pages/adminPage/subscribersPage';

@Component({
	selector: 'subscribers-Page',
	templateUrl: applicationPath + '/subscribersPage.html',
	styleUrls:[	applicationPath + '/subscribersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[HTTP_PROVIDERS],
	directives:[ActionDialog, NgForm]
})

export class SubscribersPage implements OnInit{
	orderList:Array<string> =  new Array<string>("Ascending", "Descending");
	subscribersList: Array<Subscriber> = new Array<Subscriber> (new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234),
		new Subscriber("1","asd","asd",new Date(1,1,1,1,1,1,1),new Date(1,1,1,1,1,1,1),1234))

	constructor() {
		// code...
	}

	ngOnInit(){

	}

	toggleEditMode(subscriber: Subscriber){
		subscriber.isInEditMode = true;
	}

	saveEditedSubscriber(subscriber: Subscriber){
		subscriber.isInEditMode = false;
	}
}