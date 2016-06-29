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
var template = require('./companiesAdminListComponent.html');
var CompanieAdmminListComponent = (function () {
    function CompanieAdmminListComponent() {
        this._companieSelectedEmitter = new core_1.EventEmitter();
        this._companieRemovedEmitter = new core_1.EventEmitter();
    }
    CompanieAdmminListComponent.prototype.selectCompanie = function (companie) {
        this._companieSelectedEmitter.emit(companie);
    };
    CompanieAdmminListComponent.prototype.removeCompanie = function ($event, companie) {
        $event.stopPropagation();
        this._companieRemovedEmitter.emit(companie);
    };
    __decorate([
        core_1.Input('admin-companies-list'), 
        __metadata('design:type', Array)
    ], CompanieAdmminListComponent.prototype, "_companieList", void 0);
    __decorate([
        core_1.Output('admin-companie-selected'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompanieAdmminListComponent.prototype, "_companieSelectedEmitter", void 0);
    __decorate([
        core_1.Output('admin-companie-removed'), 
        __metadata('design:type', core_1.EventEmitter)
    ], CompanieAdmminListComponent.prototype, "_companieRemovedEmitter", void 0);
    CompanieAdmminListComponent = __decorate([
        core_1.Component({
            selector: 'companie-admin-list-component',
            template: template,
        }), 
        __metadata('design:paramtypes', [])
    ], CompanieAdmminListComponent);
    return CompanieAdmminListComponent;
}());
exports.CompanieAdmminListComponent = CompanieAdmminListComponent;
//# sourceMappingURL=companiesAdminListComponent.js.map