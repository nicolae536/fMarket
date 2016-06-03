var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var modalDialog_1 = require("../modalDialog/modalDialog");
var user_1 = require("../../models/user");
var Angular2ExtensionValidators_1 = require("../../models/Angular2ExtensionValidators");
var _ = require('underscore');
var CreateUserDialog = (function (_super) {
    __extends(CreateUserDialog, _super);
    function CreateUserDialog(formBuilder) {
        _super.call(this);
        this.modaleMode = "newUser";
        this.title = "Adauga utilizator nou";
        this.cancelLabel = 'Cancel';
        this.positiveLabel = 'Creeaza utilizator';
        this.loadedEmitter = new core_1.EventEmitter();
        this.createUser = new core_1.EventEmitter();
        this._formBuilder = formBuilder;
        this.responseObject = new user_1.User();
    }
    CreateUserDialog.prototype.ngOnInit = function () {
        this._userForm = this._formBuilder.group([]);
        this.buildForm();
        this.loadedEmitter.emit(this);
    };
    CreateUserDialog.prototype.editUser = function (user, cityList, statusList) {
        this.title = "Name: " + user.name;
        this.positiveLabel = 'Edit';
        this.show("", user);
        this.setValue(user);
    };
    CreateUserDialog.prototype.clearData = function () {
        this.responseObject = new user_1.User();
    };
    CreateUserDialog.prototype.setValue = function (user) {
        this.responseObject = user;
    };
    CreateUserDialog.prototype.getValue = function () {
        return this.responseObject;
    };
    CreateUserDialog.prototype.submitNewUser = function () {
        if (!this._userForm.valid) {
            return;
        }
        this.createUser.emit(this.getValue());
    };
    CreateUserDialog.prototype.cancelFormAction = function () {
        this.rebuildForm();
        this.cancelAction();
    };
    CreateUserDialog.prototype.rebuildForm = function () {
        var me = this;
        this.responseObject = new user_1.User();
        var controls = [];
        _.each(this._userForm, function (control, name) {
            controls[name] = name;
        });
        _.each(controls, function (control, name) {
            me._userForm.removeControl(name);
        });
        this.buildForm();
    };
    CreateUserDialog.prototype.buildForm = function () {
        this._userForm.addControl('name', this._formBuilder.control(this.responseObject['name'], common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(20)])));
        this._userForm.addControl('email', this._formBuilder.control(this.responseObject['email'], common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
        this._userForm.addControl('password', this._formBuilder.control(this.responseObject['password'], common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePassword])));
        this._userForm.addControl('phone', this._formBuilder.control(this.responseObject['phone'], common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(10), Angular2ExtensionValidators_1.CustomValidators.validatePhoneNumber])));
        this._userForm.addControl('status', this._formBuilder.control(this.responseObject['status'], common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateAccountStatus])));
        this._userForm.addControl('cityId', this._formBuilder.control(this.responseObject['cityId'], common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateCityId])));
        this._userForm.addControl('accountDetails', this._formBuilder.control(this.responseObject['accountDetails'], common_1.Validators.compose([common_1.Validators.required])));
    };
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], CreateUserDialog.prototype, "title", void 0);
    __decorate([
        core_1.Input('cancel-label'), 
        __metadata('design:type', String)
    ], CreateUserDialog.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Input('positive-label'), 
        __metadata('design:type', String)
    ], CreateUserDialog.prototype, "positiveLabel", void 0);
    __decorate([
        core_1.Input('status-list'), 
        __metadata('design:type', Array)
    ], CreateUserDialog.prototype, "statusList", void 0);
    __decorate([
        core_1.Input('city-list'), 
        __metadata('design:type', Array)
    ], CreateUserDialog.prototype, "cityList", void 0);
    __decorate([
        core_1.Output('loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CreateUserDialog.prototype, "loadedEmitter", void 0);
    __decorate([
        core_1.Output('create-user'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CreateUserDialog.prototype, "createUser", void 0);
    CreateUserDialog = __decorate([
        core_1.Component({
            selector: 'create-user-dialog',
            templateUrl: 'app/components/createUserDialog/createUserDialog.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], CreateUserDialog);
    return CreateUserDialog;
})(modalDialog_1.ModalDialog);
exports.CreateUserDialog = CreateUserDialog;
//# sourceMappingURL=createUserDialog.js.map