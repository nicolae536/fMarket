System.register(['angular2/core', '../../modalDialog/modalDialog', "../demandComponent", "../../../models/demand"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, modalDialog_1, demandComponent_1, demand_1;
    var APPLICATION_PATH, DemandDialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modalDialog_1_1) {
                modalDialog_1 = modalDialog_1_1;
            },
            function (demandComponent_1_1) {
                demandComponent_1 = demandComponent_1_1;
            },
            function (demand_1_1) {
                demand_1 = demand_1_1;
            }],
        execute: function() {
            APPLICATION_PATH = '/app/components/demandComponent/demandDialogComponent';
            DemandDialogComponent = (function (_super) {
                __extends(DemandDialogComponent, _super);
                function DemandDialogComponent() {
                    _super.call(this);
                    this.positiveLabel = 'Creaza cerere';
                    this.cancelLabel = 'Cancel';
                    this.loadedEmitter = new core_1.EventEmitter();
                    this.confirmAction = new core_1.EventEmitter();
                }
                DemandDialogComponent.prototype.ngOnInit = function () {
                    this.responseObject = new demand_1.Demand();
                    this.loadedEmitter.emit(this);
                };
                DemandDialogComponent.prototype.referenceDemandComponent = function (_demandComponent) {
                    this._demandComponent = _demandComponent;
                };
                DemandDialogComponent.prototype.closeDemandDialog = function () {
                    this.responseObject = new demand_1.Demand();
                    this.cancelAction();
                };
                DemandDialogComponent.prototype.isValidResponse = function () {
                    return this._demandComponent.IsValid();
                };
                DemandDialogComponent.prototype.createDemand = function () {
                    if (this._demandComponent.IsValid()) {
                        this.responseObject = this._demandComponent.getFormData;
                    }
                    this.positiveAction();
                };
                __decorate([
                    core_1.Input('city-list'), 
                    __metadata('design:type', Array)
                ], DemandDialogComponent.prototype, "_cityList", void 0);
                __decorate([
                    core_1.Input('domain-List'), 
                    __metadata('design:type', Array)
                ], DemandDialogComponent.prototype, "_domainList", void 0);
                __decorate([
                    core_1.Input('title'), 
                    __metadata('design:type', String)
                ], DemandDialogComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input('positive-label'), 
                    __metadata('design:type', String)
                ], DemandDialogComponent.prototype, "positiveLabel", void 0);
                __decorate([
                    core_1.Input('cancel-label'), 
                    __metadata('design:type', String)
                ], DemandDialogComponent.prototype, "cancelLabel", void 0);
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DemandDialogComponent.prototype, "loadedEmitter", void 0);
                __decorate([
                    core_1.Output('action-confirmed'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DemandDialogComponent.prototype, "confirmAction", void 0);
                DemandDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'demand-dialog',
                        templateUrl: APPLICATION_PATH + '/demandDialogComponent.html',
                        directives: [demandComponent_1.DemandComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DemandDialogComponent);
                return DemandDialogComponent;
            }(modalDialog_1.ModalDialog));
            exports_1("DemandDialogComponent", DemandDialogComponent);
        }
    }
});
//# sourceMappingURL=demandDialogComponent.js.map