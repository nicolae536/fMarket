/**
 * Created by nick_ on 4/26/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AccountService} from "../../../services/accountService";
import {DemandService} from "../../../services/demandService";
import {LocalizationService} from "../../../services/localizationService";
import {NotificationService} from "../../../services/notificationService";

import {AccountEditComponent} from "../../../components/accountComponent/accountEditComponent/accountEditComponent";
import {AccountDto} from "../../../models/accountDto";
import {Select2Item} from "../../../components/selectComponent/selectComponent";
import {AccountUser} from "../../../models/accountUser";
import {AuthorizationService} from "../../../services/authorizationService";

let template = require('./accountEditPage.html');

@Component({
    selector: 'account-edit-Page',
    template:template,
    directives: [AccountEditComponent]
})
export class AccountEditPage implements OnInit {

    //<editor-fold desc="Services">
    private _accountService:AccountService;
    private _demandService:DemandService;
    private _localizationService:LocalizationService;
    private _notificationService:NotificationService;
    private _router:Router;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _account:AccountDto;
    private _submitLabel:string = 'Salveaza contul';
    private _cityesList:Array<Select2Item> = new Array<Select2Item>();
    //</editor-fold>

    constructor(accountService:AccountService,
                demandService:DemandService,
                localizationService:LocalizationService,
                notificationService:NotificationService,
                router:Router) {
        this._accountService = accountService;
        this._demandService = demandService;
        this._router = router;
        this._account = AccountDto.getEmptyInstance();
        this._localizationService = localizationService;
        this._notificationService = notificationService;
    }

    ngOnInit():any {
        this.getCityList();
        this.getAccountData();
    }

    changePassword(editedAccount:AccountUser) {
        let me = this;
        debugger;
        if(!editedAccount){
            this._notificationService.emitWarningNotificationToRootComponent('Complectati corect toate campurile pentru parole inainte de a salva!', 5)
            return;
        }

        this._accountService.changeSelfPassword(editedAccount)
            .subscribe(
                response => {
                    me._router.navigate(['/success/success-rest-password']);
                },
                errr => {
                    this._notificationService.emitErrorNotificationToRootComponent('Contul nu a putut fi salvat cu success.', 5)
                }
            )
    }

    saveEditedAccount(editedAccount:AccountUser) {
        let me = this;
        if(!editedAccount){
            this._notificationService.emitWarningNotificationToRootComponent('Complectati toate datele inainte sa salvati contul!', 5)
            return;
        }

        this._accountService.saveEditedAccount(editedAccount)
            .subscribe(
                response => {
                    me.getAccountData();
                },
                errr => {
                    this._notificationService.emitErrorNotificationToRootComponent('Contul nu a putut fi salvat cu success.', 5)
                }
            )
    }

    private getCityList() {
        let me = this;
        this._localizationService.getCityList()
            .subscribe(
                response => {
                    me._cityesList = me._localizationService.extractNameToSelect2Item(response);
                },
                error => {

                }
            )
    }

    private getAccountData() {
        let me = this;
        
        this._accountService.getAccountDetails()
            .subscribe(
                success=> {
                    success['cityItem'] = {displayName: success['cityName'],
                                            boundItem:{
                                                id:success['cityId'],
                                                name:success['cityName'],
                                            }};
                    success['email']= AuthorizationService.getUserEmail();
                    me._account = success;
                },
                error=> {
                    me._account = AccountDto.getEmptyInstance();
                }
            )
    }
}