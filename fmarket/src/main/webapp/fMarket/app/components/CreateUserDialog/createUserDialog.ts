import {Component, Injectable, View, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog} from '../ModalDialog/modalDialog';
import {User} from '../../models/user';

@Component({
  selector: 'create-user-dialog'
})
@View({
  templateUrl: 'app/components/CreateUserDialog/createUserDialog.html'
})

export class CreateUserDialog extends ModalDialog{
  modaleMode: string = "newUser";
  @Input('title') title: string = "Add new user";
  @Input('cancel-label') cancelLabel: string = 'Cancel';
  @Input('positive-label') positiveLabel: string = 'Create User';
  @Output('loaded') loadedEmitter: EventEmitter<CreateUserDialog> = new EventEmitter<CreateUserDialog>();
  newUser: User = new User();

  constructor() {
  	super();
  }

  editUser(user: User){    
    this.title = "Name: " + user.name;
    this.positiveLabel = 'Edit';
    this.setValue(user);
    return this.show();
  }

  setValue(user: User){
    this.newUser = user;
  }

  getValue():User{
    return this.newUser;
  }
}
