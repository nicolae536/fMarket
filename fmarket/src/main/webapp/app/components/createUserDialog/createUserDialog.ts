import {Component, Input, Output, OnInit, EventEmitter} from "@angular/core";
import {FormBuilder, Validators, FORM_DIRECTIVES} from "@angular/common";

import {ModalDialog} from "../modalDialog/modalDialog";
import {User} from "../../models/user";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";

@Component({
    selector: 'create-user-dialog',
    templateUrl: 'app/components/createUserDialog/createUserDialog.html',
    directives:[FORM_DIRECTIVES]
})

export class CreateUserDialog extends ModalDialog implements OnInit {
    modaleMode:string = "newUser";
    @Input('title') title:string = "Add new user";
    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'Create User';
    @Input('status-list') statusList:Array<Object>;
    @Input('city-list') cityList:Array<Object>;
    @Output('loaded') loadedEmitter:EventEmitter<CreateUserDialog> = new EventEmitter<CreateUserDialog>();
    @Output('create-user') createUser:EventEmitter<User> = new EventEmitter<User>();
    _userForm;
    private _formBuilder:FormBuilder;

    constructor(formBuilder:FormBuilder) {
        super();
        this._formBuilder = formBuilder;
        this.responseObject = new User();

    }

    ngOnInit() {
        this._userForm = this._formBuilder.group([]);

        this.buildForm();
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

    submitNewUser(){
        if(!this._userForm.valid){
            return
        }

        this.createUser.emit(this.getValue());
    }

    cancelFormAction(){
        this.rebuildForm();
        this.cancelAction();
    }

    rebuildForm(){
        let me=this;
        this.responseObject = new User();
        let controls=[];
        _.each(this._userForm, (control,name)=>{
            controls[name]=name;
        });
        _.each(controls, (control,name)=>{
            me._userForm.removeControl(name);
        });
        this.buildForm();
    }

    private buildForm() {

        this._userForm.addControl('name', this._formBuilder.control(this.responseObject['name'], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])));
        this._userForm.addControl('email', this._formBuilder.control(this.responseObject['email'], Validators.compose([Validators.required, CustomValidators.validateEmail])));
        this._userForm.addControl('password', this._formBuilder.control(this.responseObject['password'], Validators.compose([Validators.required, CustomValidators.validatePassword])));
        this._userForm.addControl('phone', this._formBuilder.control(this.responseObject['phone'], Validators.compose([Validators.required, Validators.minLength(10), CustomValidators.validatePhoneNumber])));
        this._userForm.addControl('status', this._formBuilder.control(this.responseObject['status'], Validators.compose([Validators.required, CustomValidators.validateAccountStatus])));
        this._userForm.addControl('cityId', this._formBuilder.control(this.responseObject['cityId'], Validators.compose([Validators.required, CustomValidators.validateCityId])));
        this._userForm.addControl('accountDetails', this._formBuilder.control(this.responseObject['accountDetails'], Validators.compose([Validators.required])));
    }
}
