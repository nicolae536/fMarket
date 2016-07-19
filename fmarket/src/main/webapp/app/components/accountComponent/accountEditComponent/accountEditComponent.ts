/**
 * Created by NicolaeB on 4/27/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/forms";
import {SelectComponent} from "../../selectComponent/selectComponent";
import * as _ from "underscore";
import {CustomValidators} from "../../../models/Angular2ExtensionValidators";
import {AccountUser} from "../../../models/accountUser";
import { AccountFormModel, AccountPasswordFormModel } from './../../../models/forms/account';
import * as template from './accountEditComponent.html';

@Component({
    selector: 'account-edit-component',
    template:template,
    directives: [FORM_DIRECTIVES, SelectComponent],
})
export class AccountEditComponent implements OnInit {

    @Input('account-form-model') _accountModel:AccountFormModel = new AccountFormModel();
    @Input('city-list') _cities;
    @Input('submit-label') submitLabel;
    @Output('save-edited-account') _saveAccountEmitter:EventEmitter<AccountUser> = new EventEmitter<AccountUser>();
    @Output('change-password') _changePasswordEmitter:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('_accountFormModel') private _accountForm;
    @ViewChild('_changePasswordForm') private _changePasswordForm;

    public changePasswordFormModel: AccountPasswordFormModel = new AccountPasswordFormModel();

    private showNotMatchPasswordField:boolean;

    /**
     *
     */
    constructor() {
        this._accountModel = new AccountFormModel();
        this.changePasswordFormModel = new AccountPasswordFormModel();
    }

    ngOnInit(){
        this._accountModel = new AccountFormModel();
        this.changePasswordFormModel = new AccountPasswordFormModel();
    }

    saveEditedAccount() {
        this._saveAccountEmitter.emit(this._accountModel.getValues());
    }

    changePassword() {
        this._changePasswordEmitter.emit(this.changePasswordFormModel.getValues());
    }

    updateErrorField() {
        let me = this;
        _.defer(()=>{
            me.changePasswordFormModel.lastPassword.valid = me._changePasswordForm.controls['lastPassword'].valid;
            me.changePasswordFormModel.newPassword.valid = me._changePasswordForm.controls['newPassword'].valid;
            me.changePasswordFormModel.confirmNewPassword.valid = me._changePasswordForm.controls['confirmNewPassword'].valid;
            me.showNotMatchPasswordField = (me._changePasswordForm.controls['newPassword'].valid || me._changePasswordForm.controls['confirmNewPassword'].valid)
                                                && me.changePasswordFormModel.newPassword.value !== me.changePasswordFormModel.confirmNewPassword.value;
        })
    }
}