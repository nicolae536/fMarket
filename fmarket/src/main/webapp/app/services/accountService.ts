/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from "@angular/core";
import {FMarketApi} from "./fMarketApi";
import {AccountUser} from "../models/accountUser";
import {CustomValidators} from "../models/Angular2ExtensionValidators";


@Injectable()
export class AccountService {
    private _AccountController: string = '/accounts';
    private api: FMarketApi;

    constructor(api: FMarketApi) {
        this.api = api;
    }

    getAccount() {
        return this.api.get(this._AccountController + '/user');
    }

    saveEditedAccount(accountDto: AccountUser) {
        return this.api.put(this._AccountController + '/self/update', JSON.stringify({
            name: accountDto.name && accountDto.name.length > 0 ? accountDto.name : null,
            cityId: accountDto.cityId && !isNaN(accountDto.cityId) ? accountDto.cityId : null,
            phone: accountDto.phone && accountDto.phone.length > 0 && CustomValidators.PHONE_REGEX.test(accountDto.phone) ? accountDto.phone : null
        }));
    }

    changePassword(accountDto: AccountUser) {
        return this.api.post(this._AccountController + '/changepassword-1',
            JSON.stringify({
                email: accountDto.email,
                oldPassword: accountDto.lastPassword,
                newPassword: accountDto.newPassword,
                newPasswordConfirm: accountDto.confirmNewPassword
            }));
    }

    changeSelfPassword(accountDto) {
        return this.api.post(this._AccountController + '/self/changepassword', JSON.stringify(accountDto));
    }

    getAccountDetails() {
        return this.api.get<AccountUser>(this._AccountController + '/self/details');
    }
}