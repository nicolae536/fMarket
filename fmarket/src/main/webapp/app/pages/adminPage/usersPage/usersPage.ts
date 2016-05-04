import {Component, OnInit, ViewEncapsulation, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

//import operators
import 'rxjs/add/operator/map';//-map

import {PageWithNavigation} from '../../../components/pageWithNavigation/pageWithNavigation';
import {CreateUserDialog} from '../../../components/createUserDialog/createUserDialog';
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {UserService} from '../../../services/usersService';
import {User} from '../../../models/user';

//import mocks
import {CITYES} from '../../../services/mock-providers/mock-City';
import {STATUS} from '../../../services/mock-providers/mock-Status';
import {AccountStatus} from "../../../models/accountStatus";

var applicationPath:string = '/app/pages/adminPage/usersPage';

@Component({
    selector: 'users-Page',
    templateUrl: applicationPath + '/usersPage.html',
    styleUrls: [applicationPath + '/usersPage.css'],
    encapsulation: ViewEncapsulation.None,

    providers: [UserService],
    directives: [ActionDialog, CreateUserDialog, NgForm]
})

export class UsersPage extends PageWithNavigation implements OnInit {
    usersList:User[];
    userDialog:CreateUserDialog;
    actionDialog:ActionDialog;
    userBackup:User;

    cityList:Array<Object> = CITYES;
    statusList:Array<Object> = STATUS;

    usersPerPage:number = 10;
    emailFilter:string = "";
    nameFilter:string = "";
    idFilter:number;
    cityId = -1;
    selectedStatusFilter:AccountStatus = null;


    constructor(private _userService:UserService) {
        super();
    }

    ngOnInit() {
        var me = this;
        this.getUsers();
    }

    referenceActionDialogInComponent(modal:ActionDialog) {
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateUserDialogInComponent(modal:CreateUserDialog) {
        this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    getUsers() {
        var me = this;
        this._userService.getUsersWithFilters(this.idFilter, this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.currentPageIndex)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
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
    toggleEditMode(user) {
        this.userBackup = user;
        user.isInEditMode = true;
    }

    deleteUser(user:User) {
        var me = this;
        this.actionDialog.show("Are you sure that you want to delete this user ?", user);
    }

    actionDialogConfirmDelete(user:User){
        var me = this;

        this.actionDialog.hide();
        this._userService.deleteUser(user)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })    
            .subscribe(
                response => {
                    var userIndex = me.usersList.indexOf(user);
                    if (userIndex !== -1) {
                        me.usersList.splice(userIndex, 1);
                    }
                },
                error=> {
                    //display be message
                });
    }

    saveEditedUser(user:User) {
        user.isInEditMode = false;
        this._userService.updateUser(user)
            .map((response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            })       
            .subscribe(
                response => {
                    //success
                },
                error=> {
                    //display be message
                    var userIndex = this.usersList.indexOf(user);
                    if (userIndex !== -1) {
                        this.usersList[userIndex] = this.userBackup;
                    }
                });
    }

    //grid
    createAccount() {
        this.userDialog.show("", new User());
    }

    confirmCreateUser(){
        //post to backend
        this._userService.createUser(this.userDialog.getValue()).subscribe(resp => {
            //todo do something with the response
        }, error => {
            //display message
        });
    }

    applyFilters() {
        this.getUsers();
    }
}