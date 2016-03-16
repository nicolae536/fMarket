import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {CreateUserDialog} from '../../components/CreateUserDialog/createUserDialog';
import {ActionDialog} from '../../components/ActionDialog/actionDialog';
import {UserService} from '../../services/usersService';
import {DialogAction} from '../../components/ModalDialog/modalDialog'
import {User} from '../../models/user';

var applicationPath: string = '/app/pages/usersPage';

@Component({
	selector: 'users-Page',
	templateUrl: applicationPath + '/usersPage.html',
	styleUrls:[	applicationPath + '/usersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[UserService, HTTP_PROVIDERS],
	directives:[CreateUserDialog, NgForm]
})

export class UsersPage implements OnInit{
	usersList:  Array<User> = new Array<User>();
	selectedUser: User;
	userDialog: CreateUserDialog;
	actionDialog: ActionDialog;
	usersPerPage: number =10;

	constructor(private _userService: UserService) {		
		console.log("page intialized");
	}

	ngOnInit(){
		this.getUsers();
	}

	referenceActionDialogInComponent(modal: ActionDialog){
		this.actionDialog = modal;
	}

	referenceCreateUserDialogInComponent(modal: CreateUserDialog) {
    	this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    getUsers(){
    	this._userService.getUsers().then(users => {
    		this.usersList = users;
    		console.log(users);
    	})
    }

    toggleEditMode(user){
        user.isInEditMode = true;
    }

    editUser(user: User){
    	this.userDialog.editUser(user).then(actionResult => {
    		// body...
    	});
    }

    deleteUser(user: User){
    	this.actionDialog.show().then(actionResult => {
    		if(actionResult == DialogAction.CANCEL){
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

    createAccount(){
    	this.userDialog.show().then(response => {
    		if(response == DialogAction.CANCEL){
    			return;
    		}
    		//post to backend
    		this.userDialog.getValue();
    	});
    }

    sortUsers(user: User){
    	this.userDialog.editUser(user);
    }
}