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
 * Created by nick_ on 4/9/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var selectComponent_1 = require('../../selectComponent/selectComponent');
var Angular2ExtensionValidators_1 = require("../../../models/Angular2ExtensionValidators");
var template = require('./menuItemDialog.html');
//used template to not download the same html multiple times
var MenuItemDialog = (function () {
    function MenuItemDialog(formBuilder) {
        this.modalLoaded = new core_1.EventEmitter();
        this.newMenuItemEmitter = new core_1.EventEmitter();
        this.updateMenuItemEmitter = new core_1.EventEmitter();
        this._formBuilder = formBuilder;
        this._menuItem = this._formBuilder.group([]);
    }
    MenuItemDialog.prototype.ngOnInit = function () {
        this.modalLoaded.emit(this);
        this._validForm = true;
        this.buildMenuItemForm();
    };
    MenuItemDialog.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('domainsList') && this.domainsList) {
            this.items = this.domainsList.map(function (domain) {
                return {
                    displayName: domain['name'],
                    boundItem: domain
                };
            });
        }
    };
    MenuItemDialog.prototype.submitMenuItem = function () {
        if (!this._menuItem.valid) {
            return;
        }
        this.positiveAction();
    };
    MenuItemDialog.prototype.show = function (newModal) {
        this.fatchModel(newModal);
        this.showModal = true;
    };
    MenuItemDialog.prototype.referenceSelectComponent = function (select) {
        this._select = select;
        //build the form only when component is ready
    };
    MenuItemDialog.prototype.update = function (newModal) {
        this.fatchUpdateModel(newModal);
        this.showModal = true;
    };
    MenuItemDialog.prototype.hide = function () {
        this.clearModal();
        this.showModal = false;
    };
    MenuItemDialog.prototype.positiveAction = function () {
        switch (this.operationType) {
            case 'new':
                this.newMenuItemEmitter.emit({
                    parentId: this.parentId,
                    name: this.name,
                    orderNr: this.orderNr,
                    domainId: this._select._selectedItem.boundItem ? this._select._selectedItem.boundItem['id'] : null
                });
                break;
            case 'update':
                this.updateMenuItemEmitter.emit({ id: this.id, newName: this.name, orderNr: this.orderNr });
                break;
        }
    };
    MenuItemDialog.prototype.cancelAction = function () {
        this.clearModal();
        this.showModal = false;
    };
    MenuItemDialog.prototype.stopPropagation = function ($event) {
        $event.stopPropagation();
    };
    MenuItemDialog.prototype.clearModal = function () {
        this.parentId = -1;
        this.id = "";
        this.name = "";
        this.orderNr = "";
        this._select.selectItem(this._select._chooseItemValue);
        this.rebuildFormControls();
    };
    MenuItemDialog.prototype.fatchModel = function (newModal) {
        this.parentId = newModal.parentId;
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
        this.id = newModal.id;
    };
    MenuItemDialog.prototype.fatchUpdateModel = function (newModal) {
        this.id = newModal.menuModel['id'];
        this.name = newModal.menuModel['name'];
        this.orderNr = newModal.menuModel['orderNr'];
        this.selectItemById(newModal.menuModel['domainId']);
        this.positiveLabel = newModal.positiveLabel;
        this.operationType = newModal.operationType;
    };
    MenuItemDialog.prototype.selectItemById = function (domainId) {
        var i = 0;
        while (i < this.items.length) {
            if (this.items[i].boundItem && this.items[i].boundItem['id'] === domainId) {
                this._select._selectedItem = this.items[i];
                return;
            }
            i++;
        }
    };
    MenuItemDialog.prototype.buildMenuItemForm = function () {
        this._menuItem.addControl('orderNr', this._formBuilder.control(this.orderNr, common_1.Validators.compose([common_1.Validators.required, Angular2ExtensionValidators_1.CustomValidators.validateInteger])));
        this._menuItem.addControl('name', this._formBuilder.control(this.orderNr, common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])));
    };
    MenuItemDialog.prototype.rebuildFormControls = function () {
        this._menuItem.removeControl('orderNr');
        this._menuItem.removeControl('name');
        this.buildMenuItemForm();
    };
    __decorate([
        core_1.Output('modal-loaded'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuItemDialog.prototype, "modalLoaded", void 0);
    __decorate([
        core_1.Output('add-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuItemDialog.prototype, "newMenuItemEmitter", void 0);
    __decorate([
        core_1.Output('update-menu-item'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuItemDialog.prototype, "updateMenuItemEmitter", void 0);
    __decorate([
        core_1.Input('domains-list'), 
        __metadata('design:type', Array)
    ], MenuItemDialog.prototype, "domainsList", void 0);
    MenuItemDialog = __decorate([
        core_1.Component({
            selector: 'menu-item-dialog',
            template: template,
            styles: ["\n        .ng-dirty.ng-invalid.ng-touched {\n            border-color: #ab2424;\n        \n        }\n        \n        .ng-dirty.ng-invalid.ng-touched:focus {\n            border-color: #ab2424;\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px #ab2424;\n        }\n    "],
            directives: [common_1.FORM_DIRECTIVES, selectComponent_1.SelectComponent]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], MenuItemDialog);
    return MenuItemDialog;
}());
exports.MenuItemDialog = MenuItemDialog;
//# sourceMappingURL=menuItemDialog.js.map