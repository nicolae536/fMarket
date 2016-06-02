import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm, CORE_DIRECTIVES} from '@angular/common';

//import operators
import 'rxjs/add/operator/map';//-map

import {CreateUserDialog} from '../../../components/createUserDialog/createUserDialog';
import {ActionDialog} from '../../../components/actionDialog/actionDialog';
import {UserService} from '../../../services/usersService';
import {User} from '../../../models/user';

//import mocks
import {STATUS} from '../../../services/mock-providers/mock-Status';
import {AccountStatus} from "../../../models/accountStatus";
import {NotificationService} from "../../../services/notificationService";
import {LocalizationService} from "../../../services/localizationService";
import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

var applicationPath:string = '/app/pages/adminPage/usersPage';

@Component({
    selector: 'users-Page',
    templateUrl: applicationPath + '/usersPage.html',
    styleUrls: [applicationPath + '/usersPage.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [ActionDialog, CreateUserDialog, NgForm, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class UsersPage implements OnInit {
    usersList:User[];
    userDialog:CreateUserDialog;
    actionDialog:ActionDialog;
    userBackup:User;

    cityList:Array<Object>;
    statusList:Array<Object> = STATUS;

    usersPerPage:number = 10;
    emailFilter:string = "";
    nameFilter:string = "";
    idFilter:number;
    cityId = -1;
    selectedStatusFilter:AccountStatus = null;
    private _notificationService:NotificationService;
    private _localizationService:LocalizationService;
    
    private pagination:Object = {totalItems:1, currentPage:1, maxSize:7};


    constructor(
        private _userService:UserService,
        private _notificationService:NotificationService,
        private _localizationService:LocalizationService)
    {
        this.getCities();
    }

    ngOnInit() {
        var me = this;
        this.getUsers();
        this._notificationService.removeLoading();
    }

    referenceActionDialogInComponent(modal:ActionDialog) {
        this.actionDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    referenceCreateUserDialogInComponent(modal:CreateUserDialog) {
        this.userDialog = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    getUsers() {
        var me = this;
        this._userService.getUsersWithFilters(this.idFilter, this.emailFilter, this.nameFilter, this.selectedStatusFilter, this.cityId, this.pagination['currentPage'])
            .subscribe(
                response => {
                    me.usersList = response['data'];
                    me.pagination['totalItems']=response['totalPages'];
                    me.pagination['currentPage']=response['page'];
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

    private getCities() {
        let me = this;
        me._localizationService.getCityList()
            .subscribe(
                succesR=>{
                    me['cityList']=[{id: -1, name: "Alege..."}].concat(succesR);
                },
                error=>{
                    me.cityList=[];
                }
            )
    }
    //grid
    createAccount() {
        this.userDialog.show("", new User());
    }

    confirmCreateUser(){
        let me = this;
        //post to backend
        this._userService.createUser(this.userDialog.getValue()).subscribe(resp => {
            me.userDialog.hide();
            me.getUsers();
        }, error => {
            //display message
        });
    }

    applyFilters() {
        this.getUsers();
    }
}