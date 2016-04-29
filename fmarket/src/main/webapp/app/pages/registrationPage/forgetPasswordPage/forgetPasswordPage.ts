/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from "angular2/core";
import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount} from "../../../models/registerAccount";
import {Router} from "angular2/router";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'forget=password-page',
    templateUrl: folderPath + '/registrationPage.html',
    styles: [`
    .forget-password-page{
        padding-top: 14vh;
    }
    `],
    directives: [RegistrationComponent],
    providers: [RegistrationService]
})
export class ForgetPasswordPage implements OnInit {
    private _registrationService:RegistrationService;

    private _formTitle:string;
    private _formButtonLabel:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _showRegisterLink:boolean;
    private _forgetPasswordLabel;
    private _showRememberMeLink;
    private _showLoginLink;
    private _router:Router;

    constructor(router:Router, registrationService:RegistrationService) {
        this._router = router;
        this._registrationService = registrationService;
    }

    ngOnInit():any {
        this._showLoginLink = false;
        this._showRememberMeLink = false;
        this._showRegisterLink = false;
        this._formTitle = 'Resetare parola';
        this._formButtonLabel = 'Reseteaza parola';
        this._showNewsletterField = false;
        this._passwordLabel = 'Parola noua';
        this._showForgetPasswordLink = false;
        this._forgetPasswordLabel = '';
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.resetPassword(account)
            .map((response)=> {
                if (response.text()) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me._router.navigate(['SuccessPasswordReset']);
                },
                error => {

                }
            )
    }
}