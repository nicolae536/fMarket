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
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var modalDialog_1 = require("../../modalDialog/modalDialog");
var template = require('./rejectDemandDialogComponent.html');
var RejectDemandDialogComponent = (function (_super) {
    __extends(RejectDemandDialogComponent, _super);
    function RejectDemandDialogComponent(_formBuilder) {
        this.title = 'Mesaj';
        this.positiveLabel = 'Refuza';
        this.cancelLabel = 'Cancel';
        this.loadedEmitter = new core_1.EventEmitter();
        this.rejectAction = new core_1.EventEmitter();
        this._formBuilder = _formBuilder;
        this.rejectDemand = this._formBuilder.group([]);
        _super.call(this);
    }
    RejectDemandDialogComponent.prototype.ngOnInit = function () {
        this.rejectDemand.addControl('message', this._formBuilder.control('', common_1.Validators.compose([common_1.Validators.minLength(5), common_1.Validators.required])));
        this.loadedEmitter.emit(this);
    };
    RejectDemandDialogComponent.prototype.rejectDemandSubmit = function () {
        if (this.rejectDemand.valid) {
            this.rejectAction.emit(this.rejectDemand.value);
        }
    };
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], RejectDemandDialogComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('positive-label'), 
        __metadata('design:type', String)
    ], RejectDemandDialogComponent.prototype, "positiveLabel", void 0);
    __decorate([
        core_1.Input('cancel-label'), 
        __metadata('design:type', String)
    ], RejectDemandDialogComponent.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Output('loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], RejectDemandDialogComponent.prototype, "loadedEmitter", void 0);
    __decorate([
        core_1.Output('request-reject'), 
        __metadata('design:type', core_1.EventEmitter)
    ], RejectDemandDialogComponent.prototype, "rejectAction", void 0);
    RejectDemandDialogComponent = __decorate([
        core_1.Component({
            selector: 'reject-demand-dialog',
            template: template,
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], RejectDemandDialogComponent);
    return RejectDemandDialogComponent;
}(modalDialog_1.ModalDialog));
exports.RejectDemandDialogComponent = RejectDemandDialogComponent;
//# sourceMappingURL=rejectDemandDialogComponent.js.map