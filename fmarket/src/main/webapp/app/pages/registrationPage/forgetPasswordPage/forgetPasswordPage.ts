/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount} from "../../../models/registerAccount";
import {NotificationService} from "../../../services/notificationService";
import {JqueryService} from "../../../services/jqueryService";

let template = require('../registrationPage.html');

@Component({
    selector: 'forget=password-page',
    template: template,
    styles: [`
    .forget-password-page{
        padding-top: 14vh;
    }
    `],
    directives: [RegistrationComponent]
})
export class ForgetPasswordPage implements OnInit, AfterViewChecked {
    //<editor-fold desc="Services">
    private _registrationService:RegistrationService;
    private _router:Router;
    private _registrationComponent:RegistrationComponent;
    private _notificationService:NotificationService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    @ViewChild('registrationPageRef') _registrationPageRef:ElementRef;
    private _formTitle:string;
    private _formButtonLabel:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _showRegisterLink:boolean;
    private _forgetPasswordLabel;
    private _showRememberMeLink;
    private _showLoginLink;
    private _loginPage;
    //</editor-fold>

    constructor(router:Router, registrationService:RegistrationService, notificationService:NotificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
    }


    ngAfterViewChecked():any {
        JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
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
        this._loginPage = false;

        this._notificationService.removeLoading();
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.resetPassword(account)
            .subscribe(
                response => {
                    me._router.navigate(['/success', {succesOption:'success-rest-password'}]);
                },
                error => {
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Resetare parola invalida!', timeout:5});
                    me._registrationComponent.markAllFieldsAsErrors({email:true, password:true});
                }
            )
    }

    initFLogin($event){

    }
}