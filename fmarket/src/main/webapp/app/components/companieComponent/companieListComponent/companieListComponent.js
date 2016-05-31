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
 * Created by nick_ on 5/6/2016.
 */
var core_1 = require("@angular/core");
var CompanieListComponent = (function () {
    function CompanieListComponent() {
        this._companieSelectedEmitter = new core_1.EventEmitter();
    }
    CompanieListComponent.prototype.selectCompanie = function (companie) {
        this._companieSelectedEmitter.emit(companie);
    };
    CompanieListComponent.prototype.getImageTitle = function (companie) {
        return "<img src=\"" + companie.logoSrc + "\" class=\"companie-logo\" />";
    };
    __decorate([
        core_1.Input('companies-list'), 
        __metadata('design:type', Array)
    ], CompanieListComponent.prototype, "_companieList", void 0);
    __decorate([
        core_1.Output('companie-selected'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompanieListComponent.prototype, "_companieSelectedEmitter", void 0);
    CompanieListComponent = __decorate([
        core_1.Component({
            selector: 'companie-list-component',
            templateUrl: '/app/components/companieComponent/companieListComponent/companieListComponent.html',
        }), 
        __metadata('design:paramtypes', [])
    ], CompanieListComponent);
    return CompanieListComponent;
}());
exports.CompanieListComponent = CompanieListComponent;
//# sourceMappingURL=companieListComponent.js.map