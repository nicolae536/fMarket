/**
 * Created by nick_ on 5/6/2016.
 */
System.register(["angular2/core", "angular2/router", "../../../models/companieDto", "angular2/common"], function(exports_1, context_1) {
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
    var core_1, router_1, companieDto_1, common_1;
    var CompaniesEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (companieDto_1_1) {
                companieDto_1 = companieDto_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            CompaniesEditComponent = (function () {
                function CompaniesEditComponent(formBuilder) {
                    this.saveCompanieEmitter = new core_1.EventEmitter();
                    this.loaded = new core_1.EventEmitter();
                    this._formBuilder = formBuilder;
                }
                CompaniesEditComponent.prototype.ngOnInit = function () {
                    this._companieEditForm = this._formBuilder.group([]);
                    this.buildCompanieEditForm();
                };
                CompaniesEditComponent.prototype.destroyCompanieEditForm = function () {
                    var me = this;
                    _.each(this.getCompanieFormControls(), function (value) {
                        me._companieEditForm.removeControl(value);
                    });
                };
                CompaniesEditComponent.prototype.buildCompanieEditForm = function () {
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
                    this.saveCompanieEmitter.emit(this._companieEditForm.value);
                };
                __decorate([
                    core_1.Input('companie'), 
                    __metadata('design:type', companieDto_1.CompanieDto)
                ], CompaniesEditComponent.prototype, "_companie", void 0);
                __decorate([
                    core_1.Output('save-edited-companie'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CompaniesEditComponent.prototype, "saveCompanieEmitter", void 0);
                __decorate([
                    core_1.Output('reference-companie-edit-component'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CompaniesEditComponent.prototype, "loaded", void 0);
                CompaniesEditComponent = __decorate([
                    core_1.Component({
                        selector: 'companies-edit-componet',
                        templateUrl: '/app/components/companieComponent/companieEditComponent/companieEditComponent.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], CompaniesEditComponent);
                return CompaniesEditComponent;
            }());
            exports_1("CompaniesEditComponent", CompaniesEditComponent);
        }
    }
});
//# sourceMappingURL=companiesEditComponent.js.map