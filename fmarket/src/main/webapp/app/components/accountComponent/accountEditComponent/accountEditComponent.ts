/**
 * Created by NicolaeB on 4/27/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/common";
import {SelectComponent} from "../../selectComponent/selectComponent";
import * as _ from "underscore";
import {CustomValidators} from "../../../models/Angular2ExtensionValidators";
import {AccountUser} from "../../../models/accountUser";

let template = require('./accountEditComponent.html');

@Component({
    selector: 'account-edit-component',
    template:template,
    directives: [FORM_DIRECTIVES, SelectComponent],
})
export class AccountEditComponent implements OnInit {

    @Input('account-form-model') _accountModel:AccountUser;
    @Input('city-list') _cities;
    @Input('submit-label') submitLabel;
    @Output('save-edited-account') _saveAccountEmitter:EventEmitter<AccountUser> = new EventEmitter<AccountUser>();
    @Output('change-password') _changePasswordEmitter:EventEmitter<AccountUser> = new EventEmitter<AccountUser>();

    private _accountFormModel;
    private _changePasswordFormModel;

    private _formBuilder:FormBuilder;
    private _citySelector:SelectComponent;
    private showNotMatchPasswordField:boolean;

    constructor(formBuilder:FormBuilder) {
        this._formBuilder = formBuilder;
        this._accountFormModel = this._formBuilder.group([{}]);
        this._changePasswordFormModel = this._formBuilder.group([{}]);
    }

    referenceCitySelectorComponent(citySelector:SelectComponent) {
        this._citySelector = citySelector;
    }

    ngOnInit():any {
        this.buildForm();
    }

    saveEditedAccount() {
        let account = _.clone(this._accountModel);
        this._saveAccountEmitter.emit(account);
    }

    changePassword() {
        let account = null;
        if (this._changePasswordFormModel.valid) {
            account = _.clone(this._accountModel);
        }
        
        this._changePasswordEmitter.emit(account);
    }

    public get getFormData() {
        let response = {};
        if (this._accountFormModel.valid) {
            response = _.clone(this._accountModel);
            response['cityId'] = this._citySelector && this._citySelector.selectedItem ? this._citySelector.selectedItem.boundItem['id'] : -1;

            return response;
        }
        return null;
    }

    checkIfPasswordIsMarked(controll) {
        switch (controll) {
            case 'password':
                return this._changePasswordFormModel.controls['passwords']
                    && this._changePasswordFormModel.controls['passwords']['controls']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']['errors']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']['errors']['key'] == 'validatePassword';
            case 'repeat':
                return this._changePasswordFormModel.controls['passwords']
                    && this._changePasswordFormModel.controls['passwords']['controls']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']['errors']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']['errors']['key'] == 'validatePassword';
        }
    }

    private buildForm() {
        this._accountFormModel.addControl('name', this._formBuilder.control(this._accountModel.name, Validators.required));
        this._accountFormModel.addControl('phone', this._formBuilder.control(this._accountModel.phone, Validators.compose([Validators.required, CustomValidators.validatePhoneNumber, Validators.maxLength(12)])));
        // this._accountFormModel.addControl('cityItem', this._formBuilder.control(this._accountModel.cityItem));

        this._changePasswordFormModel.addControl('lastPassword',
            this._formBuilder.control(this._accountModel.lastPassword, Validators.compose([Validators.required, CustomValidators.validatePassword, Validators.minLength(6)])));

        this._changePasswordFormModel.addControl('passwords', this._formBuilder.group({}, {validator: CustomValidators.checkPasswords}));
        this._changePasswordFormModel.controls['passwords']['addControl']('password',
            this._formBuilder.control(this._accountModel.newPassword, Validators.compose([Validators.required, CustomValidators.validatePassword, Validators.minLength(6)])));
        this._changePasswordFormModel.controls['passwords']['addControl']('repeat',
            this._formBuilder.control(this._accountModel.confirmNewPassword, Validators.compose([Validators.required, CustomValidators.validatePassword, Validators.minLength(6)])));

    }

    updateErrorField() {
        this.showNotMatchPasswordField = this._changePasswordFormModel
            && this._changePasswordFormModel.controls['passwords']
            && this._changePasswordFormModel.controls['passwords']['errors']
            && this._changePasswordFormModel.controls['passwords']['errors']['checkPasswords']
            && !this._changePasswordFormModel.controls['passwords']['errors']['checkPasswords']['valid'];
    }
}