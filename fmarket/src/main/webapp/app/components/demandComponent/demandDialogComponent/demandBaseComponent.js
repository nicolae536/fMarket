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
/**
 * Created by nick_ on 4/16/2016.
 */
var core_1 = require('@angular/core');
var modalDialog_1 = require('../../modalDialog/modalDialog');
var demandComponent_1 = require("../demandComponent");
var demand_1 = require("../../../models/demand");
var APPLICATION_PATH = '/app/components/demandComponent/demandDialogComponent';
var DemandBaseComponent = (function (_super) {
    __extends(DemandBaseComponent, _super);
    function DemandBaseComponent() {
        _super.call(this);
        this.positiveLabel = 'Creaza cerere';
        this.cancelLabel = 'Cancel';
        this.loadedEmitter = new core_1.EventEmitter();
        this.confirmAction = new core_1.EventEmitter();
    }
    DemandBaseComponent.prototype.ngOnInit = function () {
        this.responseObject = new demand_1.Demand();
        this.loadedEmitter.emit(this);
    };
    DemandBaseComponent.prototype.referenceDemandComponent = function (_demandComponent) {
        this._demandComponent = _demandComponent;
    };
    DemandBaseComponent.prototype.closeDemandDialog = function () {
        this.responseObject = new demand_1.Demand();
        this.cancelAction();
    };
    DemandBaseComponent.prototype.isValidResponse = function () {
        return this._demandComponent.IsValid();
    };
    DemandBaseComponent.prototype.createDemand = function () {
        if (this._demandComponent.IsValid()) {
            this.responseObject = this._demandComponent.getDemandFormData;
        }
        this.positiveAction();
    };
    __decorate([
        core_1.Input('city-list'), 
        __metadata('design:type', Array)
    ], DemandBaseComponent.prototype, "_cityList", void 0);
    __decorate([
        core_1.Input('domain-List'), 
        __metadata('design:type', Array)
    ], DemandBaseComponent.prototype, "_domainList", void 0);
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], DemandBaseComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('positive-label'), 
        __metadata('design:type', String)
    ], DemandBaseComponent.prototype, "positiveLabel", void 0);
    __decorate([
        core_1.Input('cancel-label'), 
        __metadata('design:type', String)
    ], DemandBaseComponent.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Input('menu-tree-data'), 
        __metadata('design:type', Object)
    ], DemandBaseComponent.prototype, "menuDictionary", void 0);
    __decorate([
        core_1.Output('loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandBaseComponent.prototype, "loadedEmitter", void 0);
    __decorate([
        core_1.Output('action-confirmed'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandBaseComponent.prototype, "confirmAction", void 0);
    DemandBaseComponent = __decorate([
        core_1.Component({
            selector: 'demand-dialog',
            templateUrl: APPLICATION_PATH + '/demandBaseComponent.html',
            directives: [demandComponent_1.DemandComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DemandBaseComponent);
    return DemandBaseComponent;
})(modalDialog_1.ModalDialog);
exports.DemandBaseComponent = DemandBaseComponent;
//# sourceMappingURL=demandBaseComponent.js.map