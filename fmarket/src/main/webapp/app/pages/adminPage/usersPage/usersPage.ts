import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

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
	usersList:  Observable<User[]>;
	userDialog: CreateUserDialog;
	actionDialog: ActionDialog;

    // userPageNumber: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    // userPagesSubNumber: Array<number> = new Array<number>();
    // currentPageIndex: number = 1;

    cityList:  Array<string> = ["Cluj", "Dorna", "Blaj"];         

    statusList: Array<string> = ["Active", "Inactive", "Pending"];	
    usersPerPage: number =10;    
    emailFilter: string = "";
    nameFilter: string = "";
    cityId: number = -1;
    selectedStatusFilter: AccountStatus = AccountStatus.AUTO;


    constructor(private _userService: UserService) {	
        super();	
    }

    ngOnInit(){
        var me= this;
        this.getUsers();
        this.pageNumbsersSubset = this.pageNumbers.slice(0, 5);
    }

    referenceActionDialogInComponent(modal: ActionDialog){
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateUserDialogInComponent(modal: CreateUserDialog) {
    	this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    getUsers(){
    	var me= this;
        this._userService.getUsersWithFilters(-1, this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.currentPageIndex)
            .subscribe(users => {
                me.usersList = []
                console.log(users);
            }
        );
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
    		if(actionResult == DialogActionResult.CANCEL){
    			return;
    		}

    		var index = this.usersList.indexOf(user);
    		if(index)
    		{
    			this.usersList.splice(index,1)
    		}
    	})    	
    }

    saveEditedUser(user: User){
        user.isInEditMode = false;
    }

    //grid
    createAccount(){
    	this.userDialog.show(this.cityList, this.statusList).then(response => {
    		if(response == DialogActionResult.CANCEL){
    			return;
    		}
    		//post to backend
    		this.userDialog.getValue();
    	});
    }

    sortUsers(user: User){

    }

    applyFilters(){
        this.getUsers();
    }
}