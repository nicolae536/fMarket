/**
 * Created by nick_ on 4/16/2016.
 */
import {Component, OnInit, EventEmitter, Input, Output} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

const APPLICATION_PATH = '/app/components/registrationComponent';
@Component({
    selector: 'registration-component',
    templateUrl: APPLICATION_PATH + '/registrationComponent.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RegistrationComponent implements OnInit {
    @Input('form-title') formTitle:string;
    @Input('button-label') buttonLabel:string;
    @Input('show-newsletter') showNewsletter:boolean;
    @Input('password-label') passwordLabel:string;
    @Input('show-forget-password-link') showForgetPasswordLink:boolean;
    @Output('registration-form') $registrationForm:EventEmitter<RegisterAccount> = new EventEmitter<RegisterAccount>();

    private _formBuilder:FormBuilder;
    private _registrationForm:ControlGroup;

    constructor(formBuilder:FormBuilder) {
        this._formBuilder = formBuilder;
    }

    ngOnInit():any {
        this._registrationForm = this._formBuilder.group([]);

        this._registrationForm.addControl('email', this._formBuilder.control('', Validators.required));
        this._registrationForm.addControl('password', this._formBuilder.control('', Validators.required));
        this._registrationForm.addControl('subscribe', this._formBuilder.control(''));
    }

    registrationFormSubmit(){
        if(this._registrationForm.valid){
            this.$registrationForm.emit(this._registrationForm.value);
            return;
        }

        this.$registrationForm.emit(null);
    }

}

export class RegisterAccount {
    password:string = '';
    email:string = '';
    subscribe:boolean = false;
}