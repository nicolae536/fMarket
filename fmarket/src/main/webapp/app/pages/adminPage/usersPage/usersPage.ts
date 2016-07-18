import * as _ from "underscore";

import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NgForm, CORE_DIRECTIVES} from "@angular/common";

import "rxjs/add/operator/map";

import {PAGINATION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

import {NotificationService} from "../../../services/notificationService";
import {LocalizationService} from "../../../services/localizationService";
import {UserService} from "../../../services/usersService";

import {CreateUserDialog} from "../../../components/createUserDialog/createUserDialog";
import {ActionDialog} from "../../../components/actionDialog/actionDialog";
import {User} from "../../../models/user";
import {AccountStatus} from "../../../models/accountStatus";
import { Ng2Pagination } from '../../../models/Ng2Pagination';
import { UserForm } from '../../../models/forms/user';
import {AuthorizationFilter} from "../../../services/AuthorizationFilter";
import * as template from './usersPage.html';

@Component({
    selector: 'users-Page',
    template: template,
    //styleUrls: [applicationPath + '/usersPage.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [ActionDialog, CreateUserDialog, NgForm, PAGINATION_DIRECTIVES, CORE_DIRECTIVES]
})
export class UsersPage implements OnInit {

    //<editor-fold desc="Services">
    //</editor-fold>

    //<editor-fold desc="Variables">
    usersList:User[];
    userDialog:CreateUserDialog;
    actionDialog:ActionDialog;

    userBackup:User;
    cityList:Array<Object>;

    statusList:Array<Object>;
    usersPerPage:number = 10;
    emailFilter:string = "";
    nameFilter:string = "";
    idFilter:number;
    cityId = null;

    selectedStatusFilter:AccountStatus = null;
    private pagination:Ng2Pagination = {totalItems:1, currentPage:1, maxSize:7};
    //</editor-fold>

    constructor(
        private _userService:UserService,
        private _notificationService:NotificationService,
        private _localizationService:LocalizationService){}

    ngOnInit() {
        var me = this;
                this.getCities();
        this.getStatusList();
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
                    me.usersList = response.data;
                    me.pagination.totalItems = response.totalPages;
                },
                error => {
                    me._notificationService.emitErrorNotificationToRootComponent('A aparut o eroare, utilizatori nu pot fi afisati.',5);
                });
    }


    //user actions
    toggleEditMode(user) {
        user.userBackup = _.clone(user);
        user.isInEditMode = true;
    }

    closeEditMode(user:User) {
        user.email = user.userBackup.email;
        user.name = user.userBackup.name;
        user.status = user.userBackup.status;
        user.city = user.userBackup.city;
        user.cityId = user.userBackup.cityId;
        user.isInEditMode = false;
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
                    me._notificationService.emitErrorNotificationToRootComponent('Utilizatorul nu pote fi sters.',5);
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
                    me.cityList = [].concat([{id: null, name: "Alege..."}], succesR);
                },
                error=>{
                    me.cityList=[];
                }
            )
    }

    private getStatusList(){
        let me = this;

        this._userService.getStatuese()
            .subscribe(
                resp=>{
                    me.statusList =[].concat({status: null, displayName: "Alege..."},_.map(resp, (v)=>{
                        return {
                            status: v,
                            displayName: v
                        }
                    }));
                },
                error=>{

                }
            );
    }

    //grid
    createAccount() {
        this.userDialog.show("", new UserForm());
    }

    confirmCreateUser(userData){

        this._userService.createUser(userData).subscribe(resp => {
            this.userDialog.hide();
            this.getUsers();
        }, error => {
            this._notificationService.emitErrorNotificationToRootComponent('Utilizatorul nu pote fi creat.',5);
        });
    }
}