/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit, ElementRef, ViewChild, AfterViewChecked} from "@angular/core";
import {Router} from "@angular/router-deprecated";

import {RegistrationComponent} from "../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../services/registrationService";
import {RegisterAccount} from "../../models/registerAccount";
import {NotificationService} from "../../services/notificationService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {JqueryService} from "../../services/jqueryService";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'registration-page',
    templateUrl: folderPath + '/registrationPage.html',
    directives: [RegistrationComponent]
})
export class RegistrationPage implements OnInit, AfterViewChecked {
    private _registrationService:RegistrationService;
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
    private _router:Router;
    private _registrationComponent:RegistrationComponent;
    private _notificationService:NotificationService;
    private _loginPage;
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

    ngAfterViewChecked():any {
        JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
        this._notificationService.removeLoading();

    }

    referenceComponent($event){
        this._registrationComponent = $event;
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        if(!account){
            me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Va rugam sa completati toate campurile!', timeout:5});
            return;
        }

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
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Inregistrare invalida!', timeout:5});
                }
            )
    }
}
