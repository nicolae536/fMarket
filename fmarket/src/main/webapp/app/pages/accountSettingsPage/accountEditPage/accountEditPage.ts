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
import {AccountUser} from "../../../models/accountUser";
import {NotificationService} from "../../../services/notificationService";
import {Router} from "@angular/router";
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
    private _notificationService:NotificationService;
    private _router:Router;

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

        this._accountService.changePassword(editedAccount)
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
                    me._account = response;
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