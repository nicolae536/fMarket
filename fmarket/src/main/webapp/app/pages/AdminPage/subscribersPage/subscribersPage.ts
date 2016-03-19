import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

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

	constructor() {
		// code...
	}

	ngOnInit(){

	}
}