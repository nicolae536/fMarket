import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {CreateUserDialog} from '../../../components/CreateUserDialog/createUserDialog';
import {ActionDialog} from '../../../components/ActionDialog/actionDialog';
import {DialogActionResult} from  '../../../components/ModalDialog/modalDialog';
import {UserService} from '../../../services/usersService';
import {User} from '../../../models/user';

var applicationPath: string = '/app/pages/adminPage/usersPage';

@Component({
	selector: 'users-Page',
	templateUrl: applicationPath + '/usersPage.html',
	styleUrls:[	applicationPath + '/usersPage.css'],
	encapsulation: ViewEncapsulation.None, 

	providers:[UserService, HTTP_PROVIDERS],
	directives:[ActionDialog, CreateUserDialog, NgForm]
})

export class UsersPage implements OnInit{
	usersList:  Array<User> = new Array<User>();
	userDialog: CreateUserDialog;
	actionDialog: ActionDialog;

    userPageNumber: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    userPagesSubNumber: Array<number> = new Array<number>();
    currentPageIndex: number = 1;

    cityList:  Array<string> = ["Cluj", "Dorna", "Blaj"];         

    statusList: Array<string> = ["Active", "Inactive", "Pending"];	
    usersPerPage: number =10;    
    emailFilter: string = "";
    nameFilter: string = "";
    cityFilter: string = "";
    selectedStatusFilter: string = "";


    constructor(private _userService: UserService) {		
        this.userPagesSubNumber = this.userPageNumber.slice(0, 5);
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


    //user actions
    toggleEditMode(user){
        user.isInEditMode = true;
    }

    editUser(user: User){
    	this.userDialog.editUser(user, this.cityList, this.statusList).then(actionResult => {
    		// body...
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
        this._userService.getUsersWithFilters(this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityFilter).then(users => {
            this.usersList = users;
        })
    }


    navigateLeft(){
        if(this.currentPageIndex - 1 > this.userPageNumber[0]){
            return;
        }

        this.currentPageIndex = this.currentPageIndex-1;
        this.goToPage(this.currentPageIndex);
    }

    navigateRight(){
        if(this.currentPageIndex + 1 === this.userPageNumber.length){
            return;
        }

        this.currentPageIndex = this.currentPageIndex+1;
        this.goToPage(this.currentPageIndex);
    }

    goToPageUsingIndex(pageIndex: number){
        this.currentPageIndex = pageIndex;
        this.goToPage(this.currentPageIndex);
    }

    isPageActive(page: number){
        if(page === this.currentPageIndex){
            return 'btn btn-default active-page';
        }
        return 'btn btn-default';
    }

    goToPage(pageIndex: number){
        if(this.userPagesSubNumber.length === this.userPageNumber.length){
            //get users with filters from that page
            return;
        }

        var elementIndex = this.userPagesSubNumber.indexOf(this.currentPageIndex) ;
        var auxArray = JSON.parse(JSON.stringify(this.userPagesSubNumber));

        if(elementIndex > 2){
            var lastElement = auxArray[auxArray.length-1];
            var indexOfItemToTake =this.userPageNumber.indexOf(lastElement)+1;
            if(indexOfItemToTake === this.userPageNumber.length){
                this.currentPageIndex = this.userPageNumber[this.userPageNumber.length - 1];
                return;    
            }
            auxArray = auxArray.slice(1,5);
            auxArray[auxArray.length] = this.userPageNumber[indexOfItemToTake]; 
            //get users with filters from that page
        }


        if(elementIndex < 2){
            var firstElement = auxArray[0]
            var indexOfItemToTake =this.userPageNumber.indexOf(firstElement)-1;
            if(indexOfItemToTake === -1){
                this.currentPageIndex = 0;
                return;    
            }
            auxArray = auxArray.slice(0, 4);
            auxArray.unshift(this.userPageNumber[indexOfItemToTake]); 
            //get users with filters from that page
        }

        this.userPagesSubNumber = auxArray;
    }
}