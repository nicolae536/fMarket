/**
 * Created by NicolaeB on 4/27/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from "@angular/common";
import {AccountDto} from "../../../models/accountDto";
import {SelectComponent} from "../../selectComponent/selectComponent";
import * as _ from 'underscore'

const APPLICATION_PATH:string = '/app/components/accountComponent/accountEditComponent';

@Component({
    selector: 'account-edit-component',
    templateUrl: APPLICATION_PATH + '/accountEditComponent.html',
    directives: [FORM_DIRECTIVES, SelectComponent],
})
export class AccountEditComponent implements OnInit{

    @Input('account-form-model') _accountModel:AccountDto;
    @Input('city-list') _cities;
    @Input('submit-label') submitLabel;
    @Output('save-edited-account') _saveAccountEmitter:EventEmitter<AccountDto>=new EventEmitter<AccountDto>();
    @Output('account-edit-loaded') _accountEditComponentLoaded:EventEmitter<AccountEditComponent>=new EventEmitter<AccountEditComponent>();

    private _accountFormModel;
    private _formBuilder:FormBuilder;
    private _citySelector:SelectComponent;

    constructor(formBuilder:FormBuilder){
        this._formBuilder = formBuilder;
        this._accountFormModel = this._formBuilder.group([{}]);
    }

    referenceCitySelectorComponent(citySelector:SelectComponent){
        this._citySelector = citySelector;
    }

    ngOnInit():any {
        this.buildForm();

        this._accountEditComponentLoaded.emit(this);
    }

    saveEditedAccount(){
        let accountDto = this.getFormData as AccountDto;

        if(accountDto !== null) {
            this._saveAccountEmitter.emit(accountDto);
        }
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

    private buildForm() {
        this._accountFormModel.addControl('email', this._formBuilder.control(this._accountModel.email, Validators.required));
        this._accountFormModel.addControl('name', this._formBuilder.control(this._accountModel.name, Validators.required));
        this._accountFormModel.addControl('cityItem', this._formBuilder.control(this._accountModel.cityItem));
    }
}