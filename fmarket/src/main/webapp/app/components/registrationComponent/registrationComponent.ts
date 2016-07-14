/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, EventEmitter, Input, Output, OnChanges} from "@angular/core";
import { ControlGroup} from "@angular/common";
import {FORM_DIRECTIVES, FormGroup, FormControl, Validators} from '@angular/forms';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {RegisterAccount, Field} from "../../models/forms/registerAccount";
import {ValidatorsCollection} from "../../models/forms/validatorsCollection";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";

import * as template from './registrationComponent.html';

@Component({
    selector: 'registration-component',
    templateUrl: '/app/components/registrationComponent/registrationComponent.html',//template,
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RegistrationComponent implements OnInit, OnChanges {
    @Input('form-title') formTitle:string;
    @Input('button-label') buttonLabel:string;
    @Input('password-label') passwordLabel:string;
    @Input('forget-password-label') _forgetPasswordLabel:string;

    @Input('login-page') _loginPage:boolean;
    @Input('rest-password-page') _restPasswordPage:boolean;
    @Input('create-account-page') _createAccountPage:boolean;

    @Output('registration-form') $registrationForm:EventEmitter<RegisterAccount> = new EventEmitter<RegisterAccount>();    
    @Output('reference-component') loaded:EventEmitter<RegistrationComponent> = new EventEmitter<RegistrationComponent>();

    private registrationForm;
    private reapeatPasswordControl:boolean = true;
    private showNotMatchPasswordField:boolean;
    private passwordFieldsError:boolean;

    private accountModel: RegisterAccount = new RegisterAccount();
    //Property used to recheck all the form fields when we set the server error
    public recheckAfterFirstChange: boolean = false;
    
    constructor() {}

    ngOnInit():any {
        this.loaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('_loginPage') && changes['_loginPage'].currentValue) {
            this.reapeatPasswordControl = false;
        }
    }

    setFieldsAsErrors(configuration:Array<Field>) {
        for(var f of configuration){
            this.accountModel[f.key].valid = f.valid; 
        }
    }

    checkIfPasswordIsMarked(){
        return this.accountModel.password.valid && this.accountModel.password.value !== this.accountModel.repeat.value;
    }

    //TODO remove this after angular2 form model validator is checking the value after update
    syncModel(newValue, key, control){
        if(this.recheckAfterFirstChange){
            this.checkFullModel();
            this.recheckAfterFirstChange = false;
            return;
        }

        //Trigger another value check for the form validator
        this.accountModel[key].value = newValue;
        this.accountModel[key].valid = control.valid ? control.valid : this.accountModel[key].validate(newValue);
        
        //Only for passwords are not the same field
        this.showNotMatchPasswordField = this.accountModel.password.valid && this.accountModel.password.value !== this.accountModel.repeat.value;
    }

    checkFullModel(){
        for(var f in this.accountModel){
            if (this._loginPage && f !== 'repeat'){
                this.accountModel[f].valid = this.accountModel[f].validate(this.accountModel[f].value);                 
            }
            else if(this._restPasswordPage || this._createAccountPage){
                this.accountModel[f].valid = this.accountModel[f].validate(this.accountModel[f].value);                 
            }
        }
    }

    //TODO remove form submit hack after angular2 form is not submiting the page
    registrationFormSubmit($event) {
        if(!this.hasNoErrors()){
            return;
        }

        this.$registrationForm.emit(this.accountModel);
    }

    hasNoErrors(){
        for(let key in this.accountModel){
            if(!this.accountModel[key].valid){
                return false;
            }
        }

        return true;
    }

}
