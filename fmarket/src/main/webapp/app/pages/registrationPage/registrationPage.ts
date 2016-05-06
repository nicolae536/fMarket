/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";

import {RegistrationComponent} from "../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../services/registrationService";
import {RegisterAccount} from "../../models/registerAccount";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'registration-page',
    templateUrl: folderPath + '/registrationPage.html',
    providers: [RegistrationService],
    directives: [RegistrationComponent]
})
export class RegistrationPage implements OnInit {
    private _registrationService:RegistrationService;

    private _formTitle:string;
    private _formButtonLabel:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _forgetPasswordLabel:string;
    private _showRegisterLink:boolean;
    private _showRememberMeLink:boolean;
    private _showLoginLink:boolean;
    private _router:Router;
    private _registrationComponent;

    constructor(router:Router,registrationService:RegistrationService) {
        this._router = router;
        this._registrationService = registrationService;
    }

    ngOnInit():any {
        this._showLoginLink=true;
        this._showRememberMeLink=false;
        this._formTitle = 'Creeaza cont';
        this._formButtonLabel = 'Inregistreaza';
        this._showNewsletterField = true;
        this._passwordLabel = 'Parola';
        this._forgetPasswordLabel = '';
        this._showForgetPasswordLink = false;
        this._showRegisterLink = false;
    }

    referenceComponent($event){
        this._registrationComponent = $event;
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.createAccount(account)
            .map((response)=> {
                if (response.text()) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me._router.navigate(['SuccessRegister']);
                },
                error => {

                }
            )
    }
}