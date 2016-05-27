/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit} from "@angular/core";

import {AccountEditComponent} from "../../../components/accountComponent/accountEditComponent/accountEditComponent";
import {AccountDto} from "../../../models/accountDto";
import {AccountService} from "../../../services/accountService";
import {DemandService} from "../../../services/demandService";
import {Select2Item} from "../../../components/selectComponent/selectComponent";
import {AuthorizationService} from "../../../services/authorizationService";
import * as _ from 'underscore';
import {LocalizationService} from "../../../services/localizationService";
var applicationPath:string = '/app/pages/accountSettingsPage/accountEditPage';

@Component({
    selector: 'account-edit-Page',
    templateUrl: applicationPath + '/accountEditPage.html'
})
export class AccountEditPage implements OnInit{
    private _accountEditComponent;

    private _accountService;
    private _demandService:DemandService;

    private _account:AccountDto;
    private _submitLabel:string = 'Salveaza contul';
    private _cityesList:Array<Select2Item> = new Array<Select2Item>();
    private _localizationService:LocalizationService;

    constructor(accountService:AccountService, demandService:DemandService, localizationService:LocalizationService){
        this._accountService=accountService;
        this._demandService = demandService;
        this._account=new AccountDto();
        this._localizationService = localizationService;
    }

    ngOnInit():any {
        this.getCityList();
    }

    accountEditLoaded(accountEditComponent:AccountEditComponent){
        this._accountEditComponent=accountEditComponent;
    }

    saveEditedAccount(editedAccount:AccountDto){
        let me = this;
        this._accountService.saveEditedAccount(editedAccount)
            .map((response)=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                response =>{
                    me._account = response;
                },
                errr =>{

                }
            )
    }

    private getCityList() {
        let me = this;
        this._localizationService.getCityList()
            .map((response)=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me._cityesList = me._localizationService.mapNameToSelect2Item(response);
                },
                error => {

                }
            )
    }
}