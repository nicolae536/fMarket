/**
 * Created by NicolaeB on 4/27/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from "angular2/common";
import {AccountDto} from "../../../models/accountDto";
import {SelectComponent} from "../../selectComponent/selectComponent";

const APPLICATION_PATH:string = '/app/components/accountComponent/accountEditComponent';

@Component({
    selector: 'account-edit-component',
    templateUrl: APPLICATION_PATH + '/accountEditComponent.html',
    directives: [FORM_DIRECTIVES, SelectComponent],
})
export class AccountEditComponent implements OnInit, OnChanges{
    @Input('account-form-model') _accountModel:AccountDto;
    @Input('city-list') _cityList;
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
        this._accountFormModel.addControl('email', this._formBuilder.control(this._accountModel.email, Validators.required));
        this._accountFormModel.addControl('name', this._formBuilder.control(this._accountModel.name, Validators.required));
        this._accountFormModel.addControl('cityItem', this._formBuilder.control(this._accountModel.cityItem, Validators.required));
        this._accountFormModel.addControl('type', this._formBuilder.control(this._accountModel.type, Validators.required));
        this._accountFormModel.addControl('creationDate', this._formBuilder.control(this._accountModel.creationDate, Validators.required));
        this._accountFormModel.addControl('activationDate', this._formBuilder.control(this._accountModel.activationDate, Validators.required));
        this._accountFormModel.addControl('lastPasswordChangeDate', this._formBuilder.control(this._accountModel.lastPasswordChangeDate, Validators.required));

        this._accountEditComponentLoaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
    }

    saveEditedAccount(){
        let accountDto = this.getFormData;

        if(accountDto !== null) {
            this._saveAccountEmitter.emit(this._accountFormModel);
        }
    }

    public get getFormData():AccountDto {
        if (this._accountFormModel.valid) {
            let formValue = this._accountFormModel.value;
            this._accountModel.cityItem = formValue.cityItem;
            this._accountModel.cityId = formValue.cityItem.boundItem['id'];
            this._accountModel.city = formValue.cityItem.boundItem['city'];

            return this._accountModel;
        }
        return null;
    }
}