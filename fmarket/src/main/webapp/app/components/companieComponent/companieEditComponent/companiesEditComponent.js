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
 * Created by nick_ on 5/6/2016.
 */
var _ = require('underscore');
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var newCompanyRequest_1 = require("../../../models/newCompanyRequest");
var Angular2ExtensionValidators_1 = require("../../../models/Angular2ExtensionValidators");
var selectComponent_1 = require("../../selectComponent/selectComponent");
var CompaniesEditComponent = (function () {
    function CompaniesEditComponent(formBuilder) {
        this.saveCompanieEmitter = new core_1.EventEmitter();
        this.loaded = new core_1.EventEmitter();
        this.discardChangesEmitter = new core_1.EventEmitter();
        this._formBuilder = formBuilder;
    }
    CompaniesEditComponent.prototype.ngOnInit = function () {
        this._companieEditForm = this._formBuilder.group([]);
        if (!this._companieEditFormModel) {
            this._companieEditFormModel = newCompanyRequest_1.NewCompanyRequest.getEmptyCompany();
        }
        this.buildCompanieEditForm();
        this.loaded.emit(this);
    };
    CompaniesEditComponent.prototype.destroyCompanieEditForm = function () {
        var me = this;
        _.each(this.getCompanieFormControls(), function (value) {
            me._companieEditForm.removeControl(value);
        });
    };
    CompaniesEditComponent.prototype.buildCompanieEditForm = function () {
        this._companieEditForm.addControl('name', this._formBuilder.control(this._companieEditFormModel.name, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])));
        this._companieEditForm.addControl('email', this._formBuilder.control(this._companieEditFormModel.email, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
        this._companieEditForm.addControl('phone', this._formBuilder.control(this._companieEditFormModel.phone, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validatePhoneNumber])));
        this._companieEditForm.addControl('contactPerson', this._formBuilder.control(this._companieEditFormModel.contactPerson, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])));
        this._companieEditForm.addControl('address', this._formBuilder.control(this._companieEditFormModel.address, common_1.Validators.required));
        this._companieEditForm.addControl('cityId', this._formBuilder.control(this._companieEditFormModel.cityId));
        this._companieEditForm.addControl('companyDomain', this._formBuilder.control(this._companieEditFormModel.companyDomain));
        this._companieEditForm.addControl('demandDomains', this._formBuilder.control(this._companieEditFormModel.demandDomains));
    };
    CompaniesEditComponent.prototype.getCompanieFormControls = function () {
        var colector = [];
        _.each(this._companieEditForm.controls, function (control, name) {
            colector[name] = name;
        });
        return colector;
    };
    CompaniesEditComponent.prototype.saveEditedCompanie = function () {
        if (!this._companieEditForm.valid) {
            return;
        }
        this._companieEditFormModel.cityId = this.selectCity._selectedItem.boundItem['id'];
        this._companieEditFormModel.companyDomainId = this.selectCompanyDomain._selectedItem.boundItem['id'];
        this._companieEditFormModel.demandDomains = this.getDemandDomains(this.selectDemandDomain._selectedItems);
        this.saveCompanieEmitter.emit(this._companieEditFormModel);
    };
    CompaniesEditComponent.prototype.referenceSelectCityComponent = function ($event) {
        this.selectCity = $event;
    };
    CompaniesEditComponent.prototype.referenceSelectCompanyDomainComponent = function ($event) {
        this.selectCompanyDomain = $event;
    };
    CompaniesEditComponent.prototype.referenceSelectDemandDomainComponent = function ($event) {
        this.selectDemandDomain = $event;
    };
    CompaniesEditComponent.prototype.goToPreviousPage = function () {
        this.discardChangesEmitter.emit(null);
    };
    CompaniesEditComponent.prototype.getDemandDomains = function (_selectedItems) {
        return _.map(_selectedItems, function (item) {
            if (item) {
                return item['boundItem']['id'];
            }
        });
    };
    __decorate([
        core_1.Input('companie-model'), 
        __metadata('design:type', newCompanyRequest_1.NewCompanyRequest)
    ], CompaniesEditComponent.prototype, "_companieEditFormModel", void 0);
    __decorate([
        core_1.Input('company-domains'), 
        __metadata('design:type', Array)
    ], CompaniesEditComponent.prototype, "_companyDomains", void 0);
    __decorate([
        core_1.Input('cities'), 
        __metadata('design:type', Array)
    ], CompaniesEditComponent.prototype, "_cities", void 0);
    __decorate([
        core_1.Input('domains'), 
        __metadata('design:type', Array)
    ], CompaniesEditComponent.prototype, "_domains", void 0);
    __decorate([
        core_1.Output('save-edited-companie'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompaniesEditComponent.prototype, "saveCompanieEmitter", void 0);
    __decorate([
        core_1.Output('reference-companie-edit-component'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompaniesEditComponent.prototype, "loaded", void 0);
    __decorate([
        core_1.Output('discard-changes-companie'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompaniesEditComponent.prototype, "discardChangesEmitter", void 0);
    CompaniesEditComponent = __decorate([
        core_1.Component({
            selector: 'companies-edit-componet',
            templateUrl: '/app/components/companieComponent/companieEditComponent/companieEditComponent.html',
            directives: [selectComponent_1.SelectComponent]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], CompaniesEditComponent);
    return CompaniesEditComponent;
})();
exports.CompaniesEditComponent = CompaniesEditComponent;
//# sourceMappingURL=companiesEditComponent.js.map