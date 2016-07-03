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
 * Created by NicolaeB on 4/27/2016.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var selectComponent_1 = require("../../selectComponent/selectComponent");
var _ = require("underscore");
var Angular2ExtensionValidators_1 = require("../../../models/Angular2ExtensionValidators");
var accountUser_1 = require("../../../models/accountUser");
var template = require('./accountEditComponent.html');
var AccountEditComponent = (function () {
    function AccountEditComponent(formBuilder) {
        this._saveAccountEmitter = new core_1.EventEmitter();
        this._changePasswordEmitter = new core_1.EventEmitter();
        this._formBuilder = formBuilder;
        this._accountFormModel = this._formBuilder.group([{}]);
        this._changePasswordFormModel = this._formBuilder.group([{}]);
    }
    AccountEditComponent.prototype.referenceCitySelectorComponent = function (citySelector) {
        this._citySelector = citySelector;
    };
    AccountEditComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    AccountEditComponent.prototype.saveEditedAccount = function () {
        var account = this.getFormData;
        this._saveAccountEmitter.emit(account);
    };
    AccountEditComponent.prototype.changePassword = function () {
        var account = null;
        if (this._changePasswordFormModel.valid) {
            account = _.clone(this._accountModel);
        }
        this._changePasswordEmitter.emit(account);
    };
    Object.defineProperty(AccountEditComponent.prototype, "getFormData", {
        get: function () {
            var response = {};
            if (this._accountFormModel.valid) {
                response = _.clone(this._accountModel);
                response['cityId'] = this._citySelector && this._citySelector.selectedItem && this._citySelector.selectedItem.boundItem ? this._citySelector.selectedItem.boundItem['id'] : null;
                return response;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AccountEditComponent.prototype.checkIfPasswordIsMarked = function (controll) {
        switch (controll) {
            case 'password':
                return this._changePasswordFormModel.controls['passwords']
                    && this._changePasswordFormModel.controls['passwords']['controls']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']['errors']
                    && this._changePasswordFormModel.controls['passwords']['controls']['password']['errors']['key'] == 'validatePassword';
            case 'repeat':
                return this._changePasswordFormModel.controls['passwords']
                    && this._changePasswordFormModel.controls['passwords']['controls']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']['errors']
                    && this._changePasswordFormModel.controls['passwords']['controls']['repeat']['errors']['key'] == 'validatePassword';
        }
    };
    AccountEditComponent.prototype.buildForm = function () {
        this._accountFormModel.addControl('name', this._formBuilder.control(this._accountModel.name, common_1.Validators.required));
        this._accountFormModel.addControl('phone', this._formBuilder.control(this._accountModel.phone, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePhoneNumber, common_1.Validators.maxLength(12)])));
        // this._accountFormModel.addControl('cityItem', this._formBuilder.control(this._accountModel.cityItem));
        this._changePasswordFormModel.addControl('lastPassword', this._formBuilder.control(this._accountModel.lastPassword, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePassword, common_1.Validators.minLength(6)])));
        this._changePasswordFormModel.addControl('passwords', this._formBuilder.group({}, { validator: Angular2ExtensionValidators_1.CustomValidators.checkPasswords }));
        this._changePasswordFormModel.controls['passwords']['addControl']('password', this._formBuilder.control(this._accountModel.newPassword, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePassword, common_1.Validators.minLength(6)])));
        this._changePasswordFormModel.controls['passwords']['addControl']('repeat', this._formBuilder.control(this._accountModel.confirmNewPassword, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePassword, common_1.Validators.minLength(6)])));
    };
    AccountEditComponent.prototype.updateErrorField = function () {
        this.showNotMatchPasswordField = this._changePasswordFormModel
            && this._changePasswordFormModel.controls['passwords']
            && this._changePasswordFormModel.controls['passwords']['errors']
            && this._changePasswordFormModel.controls['passwords']['errors']['checkPasswords']
            && !this._changePasswordFormModel.controls['passwords']['errors']['checkPasswords']['valid'];
    };
    __decorate([
        core_1.Input('account-form-model'), 
        __metadata('design:type', accountUser_1.AccountUser)
    ], AccountEditComponent.prototype, "_accountModel", void 0);
    __decorate([
        core_1.Input('city-list'), 
        __metadata('design:type', Object)
    ], AccountEditComponent.prototype, "_cities", void 0);
    __decorate([
        core_1.Input('submit-label'), 
        __metadata('design:type', Object)
    ], AccountEditComponent.prototype, "submitLabel", void 0);
    __decorate([
        core_1.Output('save-edited-account'), 
        __metadata('design:type', core_1.EventEmitter)
    ], AccountEditComponent.prototype, "_saveAccountEmitter", void 0);
    __decorate([
        core_1.Output('change-password'), 
        __metadata('design:type', core_1.EventEmitter)
    ], AccountEditComponent.prototype, "_changePasswordEmitter", void 0);
    AccountEditComponent = __decorate([
        core_1.Component({
            selector: 'account-edit-component',
            template: template,
            directives: [common_1.FORM_DIRECTIVES, selectComponent_1.SelectComponent],
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], AccountEditComponent);
    return AccountEditComponent;
})();
exports.AccountEditComponent = AccountEditComponent;
//# sourceMappingURL=accountEditComponent.js.map