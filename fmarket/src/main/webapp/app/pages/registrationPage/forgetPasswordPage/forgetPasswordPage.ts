/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount} from "../../../models/registerAccount";
import {NotificationService} from "../../../services/notificationService";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'forget=password-page',
    templateUrl: folderPath + '/registrationPage.html',
    styles: [`
    .forget-password-page{
        padding-top: 14vh;
    }
    `],
    directives: [RegistrationComponent]
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
    private _registrationComponent:RegistrationComponent;
    private _notificationService:NotificationService;

    constructor(router:Router, registrationService:RegistrationService, notificationService:NotificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
    }
    
    referenceComponent($event){
        this._registrationComponent = $event;
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
                    me._router.navigate(['SuccessResetPassword']);
                },
                error => {
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Resetare parola invalida!', timeout:5});
                    me._registrationComponent.markAllFieldsAsErrors();
                }
            )
    }
}