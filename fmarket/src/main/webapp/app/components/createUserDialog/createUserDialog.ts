import {Component, Injectable, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog, DialogActionResult} from '../modalDialog/modalDialog';
import {User} from '../../models/user';
import {OnInit} from "../../../node_modules/angular2/ts/src/core/linker/interfaces";

@Component({
    selector: 'create-user-dialog',
    templateUrl: 'app/components/createUserDialog/createUserDialog.html'
})

export class CreateUserDialog extends ModalDialog implements OnInit{
    modaleMode:string = "newUser";
    @Input('title') title:string = "Add new user";
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'Create User';
    @Input('_dropdownStatus-list') statusList:Array<Object>;
    @Input('city-list') cityList:Array<Object>;
    @Output('loaded') loadedEmitter:EventEmitter<CreateUserDialog> = new EventEmitter<CreateUserDialog>();

    constructor() {
        super();
        this.responseObject=new User();

    }

    ngOnInit(){
        this.loadedEmitter.emit(this);
    }

    editUser(user:User, cityList, statusList) {
        this.title = "Name: " + user.name;
        this.positiveLabel = 'Edit';
        this.show("", user);
        this.setValue(user);
    }

    clearData() {
        this.responseObject = new User();
    }

    setValue(user:User) {
        this.responseObject = user;
    }

    getValue():User {
        return this.responseObject as User;
    }
}
