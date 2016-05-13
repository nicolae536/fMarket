/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, EventEmitter, Input, Output, OnChanges} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from "@angular/common";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {RegisterAccount} from "../../models/registerAccount";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";

const APPLICATION_PATH = '/app/components/registrationComponent';
@Component({
    selector: 'registration-component',
    templateUrl: APPLICATION_PATH + '/registrationComponent.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RegistrationComponent implements OnInit, OnChanges {
    @Input('form-title') formTitle:string;
    @Input('button-label') buttonLabel:string;
    @Input('show-newsletter') showNewsletter:boolean;
    @Input('password-label') passwordLabel:string;
    @Input('show-forget-password-link') showForgetPasswordLink:boolean;
    @Input('forget-password-label') _forgetPasswordLabel:string;
    @Input('show-register-link') _showRegisterLink:boolean;
    @Input('show-remember-me-link') showRememberMeField:boolean;
    @Input('show-login-link') _showLoginLink:boolean;
    @Input('login-page') _loginPage:boolean;

    @Output('registration-form') $registrationForm:EventEmitter<RegisterAccount> = new EventEmitter<RegisterAccount>();

    @Output('reference-component') loaded:EventEmitter<RegistrationComponent> = new EventEmitter<RegistrationComponent>();

    private _formBuilder:FormBuilder;
    private _registrationForm:ControlGroup;
    private reapeatPasswordControl:boolean = true;

    constructor(formBuilder:FormBuilder) {
        this._formBuilder = formBuilder;
    }

    ngOnInit():any {
        this._registrationForm = this._formBuilder.group([]);

        this._registrationForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])));

        this._registrationForm.addControl('passwords', this._formBuilder.group({}, {validator: CustomValidators.checkPasswords}));
        this._registrationForm.controls['passwords'].addControl('password', this._formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(6)])));
        if (this.reapeatPasswordControl) {
            this._registrationForm.controls['passwords'].addControl('repeat', this._formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(6)])));
        }

        this._registrationForm.addControl('subscribe', this._formBuilder.control(false));
        this._registrationForm.addControl('rememberMe', this._formBuilder.control(false));

        this.loaded.emit(this);
    }

    ngOnChanges(changes:{}):any {
        if (changes.hasOwnProperty('_loginPage') && changes['_loginPage'].currentValue) {
            this.reapeatPasswordControl = false;
        }
    }

    markAllFieldsAsErrors() {
        this._registrationForm.controls['email'].setErrors({key: 'validateEmail'});
        this._registrationForm.controls['password'].setErrors({key: 'validatePassword'});
    }

    registrationFormSubmit() {
        if (this._registrationForm.valid) {
            this.$registrationForm.emit(this._registrationForm.value);
            return;
        }

        this.$registrationForm.emit(null);
    }

}
