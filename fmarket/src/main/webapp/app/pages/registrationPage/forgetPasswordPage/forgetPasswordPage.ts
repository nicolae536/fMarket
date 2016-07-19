/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount, Field} from "../../../models/forms/registerAccount";
import {NotificationService} from "../../../services/notificationService";
import {JqueryService} from "../../../services/jqueryService";
import {SuccessPageOptions} from "../successPages/successPage";

import * as template from '../registrationPage.html';

import {ENTER_LEAVE_ANIMATION} from "../../pageAnimations/enterLeavePage";

@Component({
    selector: 'forget=password-page',
    template: template,
    styles: [`
    .forget-password-page{
        padding-top: 14vh;
    }
    `],
    animations: ENTER_LEAVE_ANIMATION,
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
    private _passwordLabel:string;
    private _forgetPasswordLabel;
    private _loginPage:boolean = false;
    private _restPasswordPage:boolean;
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
        this._formTitle = 'Resetare parola';
        this._formButtonLabel = 'Reseteaza parola';
        this._passwordLabel = 'Parola noua';
        this._forgetPasswordLabel = '';
        this._restPasswordPage = true;

        this._notificationService.removeLoading();
    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.resetPassword(account)
            .subscribe(
                response => {
                    me._router.navigate([`/success/${SuccessPageOptions.SuccessRestPassword}`]);
                },
                error => {                    
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Resetare parola invalida!', timeout:5});
                    
                    me._registrationComponent.setFieldsAsErrors(
                        new Array<Field>(
                            new Field('email', false),
                            new Field('password', false),
                            new Field('repeat', false)
                        )
                    );
                    me._registrationComponent.recheckAfterFirstChange = true;
                }
            )
    }

    initFLogin($event){

    }
}