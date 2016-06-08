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
var menuTreeDialog_1 = require("../menuComponent/menuTreeDialog/menuTreeDialog");
var template = require('./demandComponent.html');
var DemandComponent = (function () {
    function DemandComponent(_formBuilder) {
        this._demandData = new demand_1.Demand();
        this.positiveLabel = 'Creaza cerere';
        this._componentLoaded = new core_1.EventEmitter();
        this._demandFormSubmit = new core_1.EventEmitter();
        this._selectedDomain = {
            id: -1,
            name: 'Alege domeniu...',
            level: -1,
            parentId: -1,
            orderNr: -1,
            domainId: -1,
            hasChildrens: false
        };
        this._formBuilder = _formBuilder;
        this._demandForm = this._formBuilder.group([]);
        this.title = 'Adauga cerere';
    }
    DemandComponent.prototype.ngOnInit = function () {
        this.fetchUserEmail();
        this.buildDemandForm();
        this._componentLoaded.emit(this);
    };
    DemandComponent.prototype.ngOnChanges = function (changes) {
        if (authorizationService_1.AuthorizationService.isLoggedIn() && changes['_demandData']) {
            this.fetchUserEmail();
        }
        if (changes.hasOwnProperty('menuDictionary')) {
            this._treeDictionary = this.menuDictionary;
        }
    };
    DemandComponent.prototype.removeSelectedDomain = function () {
        this._selectedDomain = {
            id: -1,
            name: 'Alege domeniu...',
            level: -1,
            parentId: -1,
            orderNr: -1,
            domainId: -1,
            hasChildrens: false
        };
    };
    DemandComponent.prototype.showDomainsDialog = function () {
        this._menuTreeDialog.showMenuTreeDialog();
    };
    DemandComponent.prototype.getFormControllClass = function (property) {
        var condition = String(this._demandData[property]).length > 0;
        if (this._demandForm.controls[property]) {
            condition = condition && this._demandForm.controls[property].dirty && this._demandForm.controls[property].valid;
        }
        if (!condition && this._demandForm.controls[property].pristine) {
            return '';
        }
        return condition ? 'glyphicon glyphicon-ok pointer-cursor checking-item' : 'glyphicon glyphicon-remove pointer-cursor checking-item';
    };
    DemandComponent.prototype.fetchUserEmail = function () {
        var user = authorizationService_1.AuthorizationService.getActiveUserState();
        this.isUserLoggedIn = false;
        if (user) {
            this.isUserLoggedIn = user.loggedIn;
            this._demandData.email = user.email;
        }
    };
    DemandComponent.prototype.buildDemandForm = function () {
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
    };
    DemandComponent.prototype.removeDemandControls = function () {
        this._demandForm.removeControl('title');
        this._demandForm.removeControl('message');
        this._demandForm.removeControl('email');
        this._demandForm.removeControl('cities');
        this._demandForm.removeControl('domain');
        this._demandForm.removeControl('termsAgreed');
        this._demandForm.removeControl('phone');
        // this._demandForm.removeControl('agreePhoneContact');
        // this._demandForm.removeControl('agreeEmailContact');
        this._demandForm.removeControl('name');
        this._demandForm.removeControl('allCities');
    };
    DemandComponent.prototype.restData = function () {
        this.removeDemandControls();
        this.buildDemandForm();
    };
    DemandComponent.prototype.demandFormSubmit = function () {
        //toDo take domain from select the two way binding does not work properly
        if (this._demandForm.valid && this._selectedDomain.id !== -1) {
            var formValue = this._demandForm.value;
            formValue.domain = this._selectedDomain;
            formValue.cities = this._selectCityCompnent._selectedItems;
            this._demandFormSubmit.emit(formValue);
        }
    };
    DemandComponent.prototype.referenceCitiesComponent = function (_selectCityCompnent) {
        this._selectCityCompnent = _selectCityCompnent;
    };
    DemandComponent.prototype.IsValid = function () {
        return this._demandForm.valid
            || this._selectedDomain.id !== -1
            || (this._selectCityCompnent._selectedItems.length > 0 || this._demandForm.value['allCities']);
    };
    Object.defineProperty(DemandComponent.prototype, "getDemandFormData", {
        get: function () {
            if (this.IsValid()) {
                var formValue = this._demandForm.value;
                formValue.domain = this._selectedDomain;
                formValue.cities = this._selectCityCompnent._selectedItems;
                return formValue;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    DemandComponent.prototype.checkIfUserIsLoggedId = function () {
    };
    DemandComponent.prototype.referenceDialogInDemandComponent = function (menuItemsModal) {
        this._menuTreeDialog = menuItemsModal;
    };
    DemandComponent.prototype.selectItemUsingMenu = function (item) {
        this._selectedDomain = item;
    };
    __decorate([
        core_1.Input('city-list'), 
        __metadata('design:type', Array)
    ], DemandComponent.prototype, "_cityList", void 0);
    __decorate([
        core_1.Input('demand-data'), 
        __metadata('design:type', demand_1.Demand)
    ], DemandComponent.prototype, "_demandData", void 0);
    __decorate([
        core_1.Input('positive-label'), 
        __metadata('design:type', String)
    ], DemandComponent.prototype, "positiveLabel", void 0);
    __decorate([
        core_1.Input('menu-tree-data'), 
        __metadata('design:type', Object)
    ], DemandComponent.prototype, "menuDictionary", void 0);
    __decorate([
        core_1.Output('demand-component-loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandComponent.prototype, "_componentLoaded", void 0);
    __decorate([
        core_1.Output('submit-new-demand'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandComponent.prototype, "_demandFormSubmit", void 0);
    DemandComponent = __decorate([
        core_1.Component({
            selector: 'demand-component',
            template: template,
            directives: [common_1.FORM_DIRECTIVES, selectComponent_1.SelectComponent, menuTreeDialog_1.MenuTreeDialog]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], DemandComponent);
    return DemandComponent;
})();
exports.DemandComponent = DemandComponent;
//# sourceMappingURL=demandComponent.js.map