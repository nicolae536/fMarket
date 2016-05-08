/**
 * Created by nick_ on 5/6/2016.
 */
"use strict";
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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var modalDialog_1 = require("../../modalDialog/modalDialog");
var companieDto_1 = require("../../../models/companieDto");
var CreateCompanieDialog = (function (_super) {
    __extends(CreateCompanieDialog, _super);
    function CreateCompanieDialog(formBuilder) {
        _super.call(this);
        this.loaded = new core_1.EventEmitter();
        this._formBuilder = formBuilder;
        this.responseObject = new companieDto_1.CompanieDto();
    }
    CreateCompanieDialog.prototype.ngOnInit = function () {
        this._createCompanieForm = this._formBuilder.group([]);
        this.buildCompanieForm();
        this.loaded.emit(this);
    };
    CreateCompanieDialog.prototype.cancelCreateCompanie = function () {
        this.destroyCompanieForm();
        this.cancelAction();
        this.responseObject = new companieDto_1.CompanieDto();
    };
    CreateCompanieDialog.prototype.submitNewCompanie = function () {
        if (!this._createCompanieForm.valid) {
            return;
        }
        this.positiveAction();
    };
    CreateCompanieDialog.prototype.destroyCompanieForm = function () {
        var me = this;
        _.each(this.getCompanieFormControls(), function (value) {
            me._createCompanieForm.removeControl(value);
        });
    };
    CreateCompanieDialog.prototype.getCompanieFormControls = function () {
        var colector = [];
        _.each(this._createCompanieForm.controls, function (control, name) {
            colector[name] = name;
        });
        return colector;
    };
    CreateCompanieDialog.prototype.buildCompanieForm = function () {
    };
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], CreateCompanieDialog.prototype, "title", void 0);
    __decorate([
        core_1.Output('reference-component'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CreateCompanieDialog.prototype, "loaded", void 0);
    CreateCompanieDialog = __decorate([
        core_1.Component({
            selector: 'create-companie-dialog',
            templateUrl: 'app/components/companieComponent/createCompanieDialog/createCompanieDialog.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], CreateCompanieDialog);
    return CreateCompanieDialog;
}(modalDialog_1.ModalDialog));
exports.CreateCompanieDialog = CreateCompanieDialog;
//# sourceMappingURL=createCompanieDialog.js.map