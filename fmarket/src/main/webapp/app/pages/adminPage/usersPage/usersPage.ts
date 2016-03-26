import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

//import operators
import 'rxjs/add/operator/map';

import {PageWithNavigation} from '../../../components/pageWithNavigation/pageWithNavigation';
import {CreateUserDialog} from '../../../components/createUserDialog/createUserDialog';
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {DialogActionResult} from  '../../../components/modalDialog/modalDialog';
import {UserService} from '../../../services/usersService';
import {User} from '../../../models/user';
import {AccountStatus} from '../../../models/user';

var applicationPath: string = '/app/pages/adminPage/usersPage';

@Component({
	selector: 'users-Page',
	templateUrl: applicationPath + '/usersPage.html',
	styleUrls:[	applicationPath + '/usersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[UserService, HTTP_PROVIDERS], 
	directives:[ActionDialog, CreateUserDialog, NgForm]
})

export class UsersPage extends PageWithNavigation implements OnInit{
	usersList:  User[];
	userDialog: CreateUserDialog;
	actionDialog: ActionDialog;

    // userPageNumber: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    // userPagesSubNumber: Array<number> = new Array<number>();
    // currentPageIndex: number = 1;

    cityList:  Array<Object> = [
            {id:-1, name: "Chose..."}, 
            {id:1, name: "Cluj"}, 
            {id:2, name:"Dorna"}, 
            {id:3, name:"Blaj"}];         

    statusList: Array<Object> = [
            {status:null, displayName: "Chose..."},
            {status:AccountStatus.AUTO, displayName: "AUTO"},
            {status:AccountStatus.ACTIVE, displayName: "ACTIVE"},
            {status:AccountStatus.DISABLED, displayName: "DISABLED"},
            {status:AccountStatus.DISABLED, displayName: "PENDING"}];	
    
    usersPerPage: number = 10;    
    emailFilter: string = "";
    nameFilter: string = "";
    cityId = -1;
    selectedStatusFilter: AccountStatus = null;


    constructor(private _userService: UserService) {	
        super();	
    }

    ngOnInit(){
        var me= this;
        this.getUsers();        
    }

    referenceActionDialogInComponent(modal: ActionDialog){
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateUserDialogInComponent(modal: CreateUserDialog) {
    	this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    getUsers(){
    	var me= this;
        this._userService.getUsersWithFilters("", this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.currentPageIndex)
        .map((response) => response.json())
        .subscribe(
            response => {
                me.usersList = response.data;
                me.mapPageIndexes(response.totalPages, response.page);
                console.log(response);   
            },
            error => {
                console.log(error);
                //todo handler
            });
    }


    //user actions
    toggleEditMode(user){
        user.isInEditMode = true;
    }

    editUser(user: User){
        var me =this;
        this.userDialog.editUser(user, this.cityList, this.statusList).then(actionResult => {
            me._userService.updateUser(user);
        });
    }

    deleteUser(user: User){
    	this.actionDialog.show().then(actionResult => {
    		if(response && response.actionResult == DialogActionResult.CANCEL){
    			return;
    		}

    		var userIndex = this.usersList.indexOf(user);
    		if(userIndex !== -1)
    		{
    			this.usersList.splice(userIndex,1);
    		}
    	})    	
    }

    saveEditedUser(user: User){
        user.isInEditMode = false;
    }

    //grid
    createAccount(){
    	this.userDialog.show(this.cityList, this.statusList).then(response => {
    		if(response && response.actionResult == DialogActionResult.CANCEL){
                this.userDialog.clearData();
                return;
            }
    		//post to backend
    		this._userService.createUser(this.userDialog.getValue()).subscribe(resp => {
                //todo do something with the response
            });
    	});
    }

    sortUsers(user: User){

    }

    applyFilters(){
        this.getUsers();
    }
}