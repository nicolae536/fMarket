System.register(["angular2/core", "angular2/common", "../../../models/accountDto", "../../selectComponent/selectComponent"], function(exports_1, context_1) {
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
    var core_1, common_1, accountDto_1, selectComponent_1;
    var APPLICATION_PATH, AccountEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (accountDto_1_1) {
                accountDto_1 = accountDto_1_1;
            },
            function (selectComponent_1_1) {
                selectComponent_1 = selectComponent_1_1;
            }],
        execute: function() {
            APPLICATION_PATH = '/app/components/accountComponent/accountEditComponent';
            AccountEditComponent = (function () {
                function AccountEditComponent(formBuilder) {
                    this._saveAccountEmitter = new core_1.EventEmitter();
                    this._accountEditComponentLoaded = new core_1.EventEmitter();
                    this._formBuilder = formBuilder;
                    this._accountFormModel = this._formBuilder.group([{}]);
                }
                AccountEditComponent.prototype.referenceCitySelectorComponent = function (citySelector) {
                    this._citySelector = citySelector;
                };
                AccountEditComponent.prototype.ngOnInit = function () {
                    this._accountFormModel.addControl('email', this._formBuilder.control(this._accountModel.email, common_1.Validators.required));
                    this._accountFormModel.addControl('name', this._formBuilder.control(this._accountModel.name, common_1.Validators.required));
                    this._accountFormModel.addControl('cityItem', this._formBuilder.control(this._accountModel.cityItem, common_1.Validators.required));
                    this._accountFormModel.addControl('type', this._formBuilder.control(this._accountModel.type, common_1.Validators.required));
                    this._accountFormModel.addControl('creationDate', this._formBuilder.control(this._accountModel.creationDate, common_1.Validators.required));
                    this._accountFormModel.addControl('activationDate', this._formBuilder.control(this._accountModel.activationDate, common_1.Validators.required));
                    this._accountFormModel.addControl('lastPasswordChangeDate', this._formBuilder.control(this._accountModel.lastPasswordChangeDate, common_1.Validators.required));
                    this._accountEditComponentLoaded.emit(this);
                };
                AccountEditComponent.prototype.ngOnChanges = function (changes) {
                };
                AccountEditComponent.prototype.saveEditedAccount = function () {
                    var accountDto = this.getFormData;
                    if (accountDto !== null) {
                        this._saveAccountEmitter.emit(this._accountFormModel);
                    }
                };
                Object.defineProperty(AccountEditComponent.prototype, "getFormData", {
                    get: function () {
                        if (this._accountFormModel.valid) {
                            var formValue = this._accountFormModel.value;
                            this._accountModel.cityItem = formValue.cityItem;
                            this._accountModel.cityId = formValue.cityItem.boundItem['id'];
                            this._accountModel.city = formValue.cityItem.boundItem['city'];
                            return this._accountModel;
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input('account-form-model'), 
                    __metadata('design:type', accountDto_1.AccountDto)
                ], AccountEditComponent.prototype, "_accountModel", void 0);
                __decorate([
                    core_1.Input('city-list'), 
                    __metadata('design:type', Object)
                ], AccountEditComponent.prototype, "_cityList", void 0);
                __decorate([
                    core_1.Input('submit-label'), 
                    __metadata('design:type', Object)
                ], AccountEditComponent.prototype, "submitLabel", void 0);
                __decorate([
                    core_1.Output('save-edited-account'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AccountEditComponent.prototype, "_saveAccountEmitter", void 0);
                __decorate([
                    core_1.Output('account-edit-loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AccountEditComponent.prototype, "_accountEditComponentLoaded", void 0);
                AccountEditComponent = __decorate([
                    core_1.Component({
                        selector: 'account-edit-component',
                        templateUrl: APPLICATION_PATH + '/accountEditComponent.html',
                        directives: [common_1.FORM_DIRECTIVES, selectComponent_1.SelectComponent],
                        providers: [common_1.FormBuilder]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], AccountEditComponent);
                return AccountEditComponent;
            }());
            exports_1("AccountEditComponent", AccountEditComponent);
        }
    }
});
//# sourceMappingURL=accountEditComponent.js.map