var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by nick_ on 4/16/2016.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var registerAccount_1 = require("../../models/registerAccount");
var Angular2ExtensionValidators_1 = require("../../models/Angular2ExtensionValidators");
var template = require('./registrationComponent.html');
var RegistrationComponent = (function () {
    function RegistrationComponent(formBuilder) {
        this.$registrationForm = new core_1.EventEmitter();
        this.fLoginEmitter = new core_1.EventEmitter();
        this.loaded = new core_1.EventEmitter();
        this.reapeatPasswordControl = true;
        this._formBuilder = formBuilder;
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this._registrationForm = this._formBuilder.group([]);
        this._registrationForm.addControl('email', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
        this._registrationForm.addControl('passwords', this._formBuilder.group({}, { validator: Angular2ExtensionValidators_1.CustomValidators.checkPasswords }));
        this._registrationForm.controls['passwords']['addControl']('password', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(6)])));
        if (this.reapeatPasswordControl) {
            this._registrationForm.controls['passwords']['addControl']('repeat', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(6)])));
        }
        this._registrationForm.addControl('subscribe', this._formBuilder.control(false));
        this._registrationForm.addControl('rememberMe', this._formBuilder.control(false));
        this.loaded.emit(this);
    };
    RegistrationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('_loginPage') && changes['_loginPage'].currentValue) {
            this.reapeatPasswordControl = false;
        }
    };
    RegistrationComponent.prototype.updateErrorFied = function () {
        this.showNotMatchPasswordField = this._registrationForm
            && this._registrationForm.controls['passwords']
            && this._registrationForm.controls['passwords']['errors']
            && this._registrationForm.controls['passwords']['errors']['checkPasswords']
            && !this._registrationForm.controls['passwords']['errors']['checkPasswords']['valid'];
    };
    RegistrationComponent.prototype.markAllFieldsAsErrors = function (configuration) {
        if (configuration['email']) {
            this._registrationForm.controls['email'].setErrors({ key: 'validateEmail' });
        }
        if (configuration['password']) {
            this._registrationForm.controls['passwords']['controls']['password'].setErrors({ key: 'validatePassword' });
            if (this._registrationForm.controls['passwords']['controls']['repeat']) {
                this._registrationForm.controls['passwords']['controls']['repeat'].setErrors({ key: 'validatePassword' });
            }
        }
    };
    RegistrationComponent.prototype.checkIfEmailIsMarked = function () {
        return this._registrationForm.controls['email'] && this._registrationForm.controls['email']['errors'] && this._registrationForm.controls['email']['errors']['key'] == 'validateEmail';
    };
    RegistrationComponent.prototype.checkIfPasswordIsMarked = function (controll) {
        switch (controll) {
            case 'password':
                return this._registrationForm.controls['passwords']
                    && this._registrationForm.controls['passwords']['controls']
                    && this._registrationForm.controls['passwords']['controls']['password']
                    && this._registrationForm.controls['passwords']['controls']['password']['errors']
                    && this._registrationForm.controls['passwords']['controls']['password']['errors']['key'] == 'validatePassword';
            case 'repeat':
                return this._registrationForm.controls['passwords']
                    && this._registrationForm.controls['passwords']['controls']
                    && this._registrationForm.controls['passwords']['controls']['repeat']
                    && this._registrationForm.controls['passwords']['controls']['repeat']['errors']
                    && this._registrationForm.controls['passwords']['controls']['repeat']['errors']['key'] == 'validatePassword';
        }
    };
    RegistrationComponent.prototype.getFormControllClass = function (property) {
        var condition = null;
        if (this._registrationForm.controls[property]) {
            condition = this._registrationForm.controls[property].dirty && this._registrationForm.controls[property].valid;
        }
        if (!condition && this._registrationForm.controls[property].pristine) {
            return '';
        }
        return condition ? 'glyphicon glyphicon-ok pointer-cursor checking-item-registration' : 'glyphicon glyphicon-remove pointer-cursor checking-item';
    };
    RegistrationComponent.prototype.registrationFormSubmit = function () {
        if (this._registrationForm.valid) {
            this.$registrationForm.emit(this._registrationForm.value);
            return;
        }
        var invalidAccount = new registerAccount_1.RegisterAccount();
        invalidAccount.passwords = { password: null, repeat: null };
        this.$registrationForm.emit(invalidAccount);
    };
    RegistrationComponent.prototype.fLogin = function () {
        this.fLoginEmitter.emit('auth');
    };
    __decorate([
        core_1.Input('form-title'), 
        __metadata('design:type', String)
    ], RegistrationComponent.prototype, "formTitle", void 0);
    __decorate([
        core_1.Input('button-label'), 
        __metadata('design:type', String)
    ], RegistrationComponent.prototype, "buttonLabel", void 0);
    __decorate([
        core_1.Input('show-newsletter'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "showNewsletter", void 0);
    __decorate([
        core_1.Input('password-label'), 
        __metadata('design:type', String)
    ], RegistrationComponent.prototype, "passwordLabel", void 0);
    __decorate([
        core_1.Input('show-forget-password-link'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "showForgetPasswordLink", void 0);
    __decorate([
        core_1.Input('forget-password-label'), 
        __metadata('design:type', String)
    ], RegistrationComponent.prototype, "_forgetPasswordLabel", void 0);
    __decorate([
        core_1.Input('show-register-link'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "_showRegisterLink", void 0);
    __decorate([
        core_1.Input('show-remember-me-link'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "showRememberMeField", void 0);
    __decorate([
        core_1.Input('show-login-link'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "_showLoginLink", void 0);
    __decorate([
        core_1.Input('login-page'), 
        __metadata('design:type', Boolean)
    ], RegistrationComponent.prototype, "_loginPage", void 0);
    __decorate([
        core_1.Output('registration-form'), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegistrationComponent.prototype, "$registrationForm", void 0);
    __decorate([
        core_1.Output('flogin-emit'), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegistrationComponent.prototype, "fLoginEmitter", void 0);
    __decorate([
        core_1.Output('reference-component'), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegistrationComponent.prototype, "loaded", void 0);
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'registration-component',
            template: template,
            directives: [common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], RegistrationComponent);
    return RegistrationComponent;
})();
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registrationComponent.js.map