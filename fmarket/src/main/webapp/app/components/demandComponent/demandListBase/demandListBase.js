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
 * Created by nick_ on 4/20/2016.
 */
var core_1 = require("@angular/core");
var template = require('./demandListBase.html');
var DemandListBaseComponent = (function () {
    function DemandListBaseComponent() {
        this.demandList = new Array();
        this.selectDemandEmitter = new core_1.EventEmitter();
        this.removeDemanddEmitter = new core_1.EventEmitter();
    }
    DemandListBaseComponent.prototype.selectDemand = function (demand) {
        this.selectDemandEmitter.emit(demand);
    };
    DemandListBaseComponent.prototype.removeDemand = function ($event, companie) {
        this.removeDemanddEmitter.emit(companie);
    };
    __decorate([
        core_1.Input('demand-list'), 
        __metadata('design:type', Array)
    ], DemandListBaseComponent.prototype, "demandList", void 0);
    __decorate([
        core_1.Input('hide-operation'), 
        __metadata('design:type', Boolean)
    ], DemandListBaseComponent.prototype, "hideOperation", void 0);
    __decorate([
        core_1.Output('demand-selected'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandListBaseComponent.prototype, "selectDemandEmitter", void 0);
    __decorate([
        core_1.Output('remove-demand'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DemandListBaseComponent.prototype, "removeDemanddEmitter", void 0);
    DemandListBaseComponent = __decorate([
        core_1.Component({
            selector: 'demand-list-component',
            template: template,
        }), 
        __metadata('design:paramtypes', [])
    ], DemandListBaseComponent);
    return DemandListBaseComponent;
}());
exports.DemandListBaseComponent = DemandListBaseComponent;
//# sourceMappingURL=demandListBase.js.map