System.register(["angular2/core", "../../selectComponent/selectComponent", "../../../models/demandDetailsDTO"], function(exports_1, context_1) {
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
    var core_1, selectComponent_1, demandDetailsDTO_1;
    var APPLICATION_PATH, DemandEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (selectComponent_1_1) {
                selectComponent_1 = selectComponent_1_1;
            },
            function (demandDetailsDTO_1_1) {
                demandDetailsDTO_1 = demandDetailsDTO_1_1;
            }],
        execute: function() {
            APPLICATION_PATH = '/app/components/demandComponent/demandEdit';
            DemandEditComponent = (function () {
                function DemandEditComponent() {
                    this.domainList = new Array();
                    this.citiesList = new Array();
                    this.rejectDemandEvent = new core_1.EventEmitter();
                    this.acceptDemandEvent = new core_1.EventEmitter();
                    this.saveDemandEvent = new core_1.EventEmitter();
                }
                DemandEditComponent.prototype.acceptDemand = function () {
                    this.acceptDemandEvent.emit(this._demand);
                };
                DemandEditComponent.prototype.rejectDemand = function () {
                    this.rejectDemandEvent.emit(Number(this._demand.id));
                };
                DemandEditComponent.prototype.toggleEditMode = function () {
                    this._demand.isInEditMode = true;
                };
                DemandEditComponent.prototype.saveEditedDemand = function () {
                    this._demand.isInEditMode = false;
                    this.saveDemandEvent.emit(this._demand);
                };
                __decorate([
                    core_1.Input('demand'), 
                    __metadata('design:type', demandDetailsDTO_1.DemandDetailsDTO)
                ], DemandEditComponent.prototype, "_demand", void 0);
                __decorate([
                    core_1.Input('domains-list'), 
                    __metadata('design:type', Array)
                ], DemandEditComponent.prototype, "domainList", void 0);
                __decorate([
                    core_1.Input('cities-list'), 
                    __metadata('design:type', Array)
                ], DemandEditComponent.prototype, "citiesList", void 0);
                __decorate([
                    core_1.Output('reject-demand'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DemandEditComponent.prototype, "rejectDemandEvent", void 0);
                __decorate([
                    core_1.Output('accept-demand'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DemandEditComponent.prototype, "acceptDemandEvent", void 0);
                __decorate([
                    core_1.Output('save-demand'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DemandEditComponent.prototype, "saveDemandEvent", void 0);
                DemandEditComponent = __decorate([
                    core_1.Component({
                        selector: 'demand-edit-component',
                        templateUrl: APPLICATION_PATH + '/demandEdit.html',
                        directives: [selectComponent_1.SelectComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DemandEditComponent);
                return DemandEditComponent;
            }());
            exports_1("DemandEditComponent", DemandEditComponent);
        }
    }
});
//# sourceMappingURL=demandEdit.js.map