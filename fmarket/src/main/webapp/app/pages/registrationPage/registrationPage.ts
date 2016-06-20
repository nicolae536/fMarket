/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit, ElementRef, ViewChild, AfterViewChecked} from "@angular/core";
import {Router} from "@angular/router";

import {RegistrationService} from "../../services/registrationService";
import {NotificationService} from "../../services/notificationService";
import {JqueryService} from "../../services/jqueryService";

import {RegistrationComponent} from "../../components/registrationComponent/registrationComponent";

import {RegisterAccount} from "../../models/registerAccount";
import {FaceBookService} from "../../services/faceBookService";

let template = require('./registrationPage.html');

@Component({
    selector: 'registration-page',
    template: template,
    directives: [RegistrationComponent]
})
export class RegistrationPage implements OnInit, AfterViewChecked {
    //<editor-fold desc="Services">
    private _registrationService:RegistrationService;
    private _registrationComponent:RegistrationComponent;
    private _notificationService:NotificationService;
    private _router:Router;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    @ViewChild('registrationPageRef') _registrationPageRef:ElementRef;
    private _formTitle:string;
    private _formButtonLabel:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _forgetPasswordLabel:string;
    private _showRegisterLink:boolean;
    private _showRememberMeLink:boolean;
    private _showLoginLink:boolean;
    private _loginPage;
    //</editor-fold>

    constructor(router:Router,registrationService:RegistrationService, notificationService:NotificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
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
        this._loginPage = false;
    }

    initFLogin($event){

    }

    ngAfterViewChecked():any {
        JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
        this._notificationService.removeLoading();
    }

    referenceComponent($event){
        this._registrationComponent = $event;
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.createAccount(account)
            .subscribe(
                response => {
                    me._router.navigate(['/success/success-registration']);
                },
                error => {
                    me._registrationComponent.markAllFieldsAsErrors({email:true, password:true});
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Inregistrare invalida!', timeout:5});
                }
            )
    }
}
