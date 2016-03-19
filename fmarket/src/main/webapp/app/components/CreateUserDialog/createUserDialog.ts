import {Component, Injectable, View, Input, Output, EventEmitter} from 'angular2/core';
import {ModalDialog, DialogAction} from '../ModalDialog/modalDialog';
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
  cityList:  Array<string> = ["Cluj", "Dorna", "Blaj"];         

  statusList: Array<string> = ["Active", "Inactive", "Pending"];  
  newUser: User = new User();

  constructor() {
  	super();
  }

  editUser(user: User, cityList, statusList){    
    this.title = "Name: " + user.name;
    this.positiveLabel = 'Edit';
    this.setValue(user);
    return this.show(cityList, statusList);
  }

  setValue(user: User){
    this.newUser = user;
  }

  getValue():User{
    return this.newUser;
  }

  show(cityList, statusList):Promise<DialogAction> {
    this.showModal = true;
    this.cityList = cityList;
    this.statusList = statusList;
    var me=this;
    return new Promise<DialogAction>((resolve, reject)=>{
      me.resolveModal =  resolve;
    });    
  }  
}
