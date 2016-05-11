"use strict";
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
var selectComponent_1 = require("../selectComponent/selectComponent");
var demand_1 = require("../../models/demand");
var Angular2ExtensionValidators_1 = require("../../models/Angular2ExtensionValidators");
var authorizationService_1 = require("../../services/authorizationService");
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
var APPLICATION_PATH = '/app/components/demandComponent';
var DemandComponent = (function () {
    function DemandComponent(_formBuilder) {
        this._componentLoaded = new core_1.EventEmitter();
        this._componentSubmit = new core_1.EventEmitter();
        this._formBuilder = _formBuilder;
        this._demandForm = this._formBuilder.group([]);
        this.foobarItems = [
            {
                displayName: 'name',
                boundItem: null
            },
            {
                displayName: 'name1',
                boundItem: null
            },
            {
                displayName: 'name2',
                boundItem: null
            }];
    }
    DemandComponent.prototype.ngOnInit = function () {
        this.fetchUserEmail();
        this._demandForm.addControl('title', this._formBuilder.control(this._demandData.title, common_1.Validators.required));
        this._demandForm.addControl('message', this._formBuilder.control(this._demandData.message, common_1.Validators.required));
        this._demandForm.addControl('email', this._formBuilder.control(this._demandData.email, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateEmail])));
        this._demandForm.addControl('cities', this._formBuilder.control(this._demandData.cities));
        this._demandForm.addControl('domain', this._formBuilder.control(this._demandData.domain));
        this._demandForm.addControl('termsAgreed', this._formBuilder.control(this._demandData.termsAgreed, common_1.Validators.required));
        this._demandForm.addControl('phone', this._formBuilder.control(this._demandData.phone, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(10), Angular2ExtensionValidators_1.CustomValidators.validatePhoneNumber])));
        this._demandForm.addControl('name', this._formBuilder.control(this._demandData.name, common_1.Validators.required));
        // this._demandForm.addControl('agreePhoneContact', this._formBuilder.control(this._demandData.agreePhoneContact));
        // this._demandForm.addControl('agreeEmailContact', this._formBuilder.control(this._demandData.agreeEmailContact));
        this._demandForm.addControl('allCities', this._formBuilder.control(this._demandData.allCities));
        this._componentLoaded.emit(this);
    };
    DemandComponent.prototype.ngOnChanges = function (changes) {
        if (authorizationService_1.AuthorizationService.isLoggedIn() && changes['_demandData']) {
            this.fetchUserEmail();
        }
    };
    DemandComponent.prototype.fetchUserEmail = function () {
        var user = authorizationService_1.AuthorizationService.getActiveUserState();
        this.isUserLoggedIn = false;
        if (user) {
            this.isUserLoggedIn = user.loggedIn;
            this._demandData.email = user.email;
        }
    };
    DemandComponent.prototype.demandFormSubmit = function () {
        //toDo take domain from select the two way binding does not work properly
        if (this._demandForm.valid) {
            var formValue = this._demandForm.value;
            formValue.domain = this._selectDomainCompnent._selectedItem;
            this._componentSubmit.emit(formValue);
        }
    };
    DemandComponent.prototype.referenceCitiesComponent = function (_selectCityCompnent) {
        this._selectCityCompnent = _selectCityCompnent;
    };
    DemandComponent.prototype.referenceDomainComponent = function (_selectDomainCompnent) {
        this._selectDomainCompnent = _selectDomainCompnent;
    };
    DemandComponent.prototype.IsValid = function () {
        return this._demandForm.valid || _.isEmpty(this._selectDomainCompnent._selectedItem) || (this._selectDomainCompnent._selectedItem && this._selectDomainCompnent._selectedItem === null) || this._selectDomainCompnent._selectedItems.length > 0;
    };
    Object.defineProperty(DemandComponent.prototype, "getFormData", {
        get: function () {
            if (this._demandForm.valid) {
                var formValue = this._demandForm.value;
                formValue.domain = this._selectDomainCompnent._selectedItem;
                formValue.cities = this._selectCityCompnent._selectedItems;
                return formValue;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DemandComponent.prototype, "demandForm", {
        get: function () {
            return this._demandForm;
        },
        enumerable: true,
        configurable: true
    });
    DemandComponent.prototype.checkIfUserIsLoggedId = function () {
    };
    __decorate([
        core_1.Input('city-list'), 
        __metadata('design:type', Array)
    ], DemandComponent.prototype, "_cityList", void 0);
    __decorate([
        core_1.Input('domain-List'), 
        __metadata('design:type', Array)
    ], DemandComponent.prototype, "_domainList", void 0);
    __decorate([
        core_1.Input('demand-data'), 
        __metadata('design:type', demand_1.Demand)
    ], DemandComponent.prototype, "_demandData", void 0);
    __decorate([
        core_1.Output('loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandComponent.prototype, "_componentLoaded", void 0);
    __decorate([
        core_1.Output('submit'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandComponent.prototype, "_componentSubmit", void 0);
    DemandComponent = __decorate([
        core_1.Component({
            selector: 'demand-component',
            templateUrl: APPLICATION_PATH + '/demandComponent.html',
            directives: [common_1.FORM_DIRECTIVES, selectComponent_1.SelectComponent]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], DemandComponent);
    return DemandComponent;
}());
exports.DemandComponent = DemandComponent;
//# sourceMappingURL=demandComponent.js.map