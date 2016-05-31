/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit} from "@angular/core";
import {AccountEditComponent} from "../../../components/accountComponent/accountEditComponent/accountEditComponent";
import {AccountDto} from "../../../models/accountDto";
import {AccountService} from "../../../services/accountService";
import {DemandService} from "../../../services/demandService";
import {Select2Item} from "../../../components/selectComponent/selectComponent";
import {LocalizationService} from "../../../services/localizationService";
var applicationPath:string = '/app/pages/accountSettingsPage/accountEditPage';

@Component({
    selector: 'account-edit-Page',
    templateUrl: applicationPath + '/accountEditPage.html',
    directives: [AccountEditComponent]
})
export class AccountEditPage implements OnInit {
    private _accountEditComponent;

    private _accountService:AccountService;
    private _demandService:DemandService;

    private _account:AccountDto;
    private _submitLabel:string = 'Salveaza contul';
    private _cityesList:Array<Select2Item> = new Array<Select2Item>();
    private _localizationService:LocalizationService;

    constructor(accountService:AccountService, demandService:DemandService, localizationService:LocalizationService) {
        this._accountService = accountService;
        this._demandService = demandService;
        this._account = AccountDto.getEmptyInstance();
        this._localizationService = localizationService;
    }

    ngOnInit():any {
        this.getCityList();
        this.getAccountData();
    }

    accountEditLoaded(accountEditComponent:AccountEditComponent) {
        this._accountEditComponent = accountEditComponent;
    }

    saveEditedAccount(editedAccount:AccountDto) {
        let me = this;
        this._accountService.saveEditedAccount(editedAccount)
            .subscribe(
                response => {
                    me._account = response;
                },
                errr => {

                }
            )
    }

    private getCityList() {
        let me = this;
        this._localizationService.getCityList()
            .subscribe(
                response => {
                    me._cityesList = me._localizationService.mapNameToSelect2Item(response);
                },
                error => {

                }
            )
    }

    private getAccountData() {
        let me = this;
        
        this._accountService.getAccount()
            .subscribe(
                success=> {
                    me._account = success;
                },
                error=> {
                    me._account = AccountDto.getEmptyInstance();
                }
            )
    }
}