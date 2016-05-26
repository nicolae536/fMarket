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
var modalDialog_1 = require("../../modalDialog/modalDialog");
var menuTreeComponent_1 = require("../menuTreeComponent");
var MenuTreeDialog = (function (_super) {
    __extends(MenuTreeDialog, _super);
    function MenuTreeDialog() {
        _super.call(this);
        this.positiveLabel = 'OK';
        this.cancelLabel = 'Cancel';
        this.loadedEmitter = new core_1.EventEmitter();
        this.confirmAction = new core_1.EventEmitter();
    }
    MenuTreeDialog.prototype.ngOnInit = function () {
        this.loadedEmitter.emit(this);
    };
    MenuTreeDialog.prototype.selectMenuItem = function (menuItem) {
        if (!menuItem.hasChildrens && menuItem.domainId) {
            this.responseObject = menuItem;
            this.positiveAction();
            this.hide();
        }
    };
    MenuTreeDialog.prototype.referenceMenuTreeCompoent = function ($event) {
        this.menuTreeComponent = $event;
    };
    MenuTreeDialog.prototype.showMenuTreeDialog = function () {
        this.menuTreeComponent.reinitMenuSelection();
        this.show();
    };
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], MenuTreeDialog.prototype, "title", void 0);
    __decorate([
        core_1.Input('positive-label'), 
        __metadata('design:type', String)
    ], MenuTreeDialog.prototype, "positiveLabel", void 0);
    __decorate([
        core_1.Input('cancel-label'), 
        __metadata('design:type', String)
    ], MenuTreeDialog.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Input('menu-tree-data'), 
        __metadata('design:type', Object)
    ], MenuTreeDialog.prototype, "menuDictionary", void 0);
    __decorate([
        core_1.Input('enable-operations'), 
        __metadata('design:type', Boolean)
    ], MenuTreeDialog.prototype, "enableOperations", void 0);
    __decorate([
        core_1.Output('loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeDialog.prototype, "loadedEmitter", void 0);
    __decorate([
        core_1.Output('action-confirmed'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuTreeDialog.prototype, "confirmAction", void 0);
    MenuTreeDialog = __decorate([
        core_1.Component({
            selector: 'menu-tree-dialog',
            templateUrl: '/app/components/menuComponent/menuTreeDialog/menuTreeDialog.html',
            directives: [menuTreeComponent_1.MenuTreeComponent],
            styles: ["\n        .modal-dialog .modal-body .menu-dialog-container{\n            padding-right: 40px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuTreeDialog);
    return MenuTreeDialog;
}(modalDialog_1.ModalDialog));
exports.MenuTreeDialog = MenuTreeDialog;
//# sourceMappingURL=menuTreeDialog.js.map