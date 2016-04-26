System.register(["angular2/core", "angular2/common", "angular2/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1;
    var APPLICATION_PATH, RegistrationComponent, RegisterAccount;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            APPLICATION_PATH = '/app/components/registrationComponent';
            RegistrationComponent = (function () {
                function RegistrationComponent(formBuilder) {
                    this.$registrationForm = new core_1.EventEmitter();
                    this._formBuilder = formBuilder;
                }
                RegistrationComponent.prototype.ngOnInit = function () {
                    this._registrationForm = this._formBuilder.group([]);
                    this._registrationForm.addControl('email', this._formBuilder.control('', common_1.Validators.required));
                    this._registrationForm.addControl('password', this._formBuilder.control('', common_1.Validators.required));
                    this._registrationForm.addControl('subscribe', this._formBuilder.control(''));
                    this._registrationForm.addControl('rememberMe', this._formBuilder.control(''));
                };
                RegistrationComponent.prototype.registrationFormSubmit = function () {
                    if (this._registrationForm.valid) {
                        this.$registrationForm.emit(this._registrationForm.value);
                        return;
                    }
                    this.$registrationForm.emit(null);
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
                    core_1.Output('registration-form'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RegistrationComponent.prototype, "$registrationForm", void 0);
                RegistrationComponent = __decorate([
                    core_1.Component({
                        selector: 'registration-component',
                        templateUrl: APPLICATION_PATH + '/registrationComponent.html',
                        directives: [common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], RegistrationComponent);
                return RegistrationComponent;
            }());
            exports_1("RegistrationComponent", RegistrationComponent);
            RegisterAccount = (function () {
                function RegisterAccount() {
                    this.password = '';
                    this.email = '';
                    this.subscribe = false;
                    this.rememberMe = false;
                }
                return RegisterAccount;
            }());
            exports_1("RegisterAccount", RegisterAccount);
        }
    }
});
//# sourceMappingURL=registrationComponent.js.map