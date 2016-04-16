System.register(['angular2/core', '../../selectComponent/selectComponent'], function(exports_1, context_1) {
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
    var core_1, selectComponent_1;
    var MenuItemDialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (selectComponent_1_1) {
                selectComponent_1 = selectComponent_1_1;
            }],
        execute: function() {
            //used template to not download the same html multiple times
            MenuItemDialog = (function () {
                function MenuItemDialog() {
                    this.modalLoaded = new core_1.EventEmitter();
                    this.newMenuItemEmitter = new core_1.EventEmitter();
                    this.updateMenuItemEmitter = new core_1.EventEmitter();
                }
                MenuItemDialog.prototype.ngOnInit = function () {
                    this.modalLoaded.emit(this);
                    this._validForm = true;
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
                MenuItemDialog.prototype.checkIfIsNumber = function (event) {
                };
                MenuItemDialog.prototype.show = function (newModal) {
                    this.fatchModel(newModal);
                    this.showModal = true;
                };
                MenuItemDialog.prototype.referenceSelectComponent = function (select) {
                    this._select = select;
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
                                domainId: this._select.selectedItem.boundItem ? this._select.selectedItem.boundItem['id'] : null
                            });
                            break;
                        case 'update':
                            this.updateMenuItemEmitter.emit({ id: this.id, newName: this.name, orderNr: this.orderNr });
                            break;
                    }
                };
                MenuItemDialog.prototype.cancelAction = function () {
                    console.log('sending close event');
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
                };
                MenuItemDialog.prototype.fatchModel = function (newModal) {
                    this.parentId = newModal.parentId;
                    this.positiveLabel = newModal.positiveLabel;
                    this.operationType = newModal.operationType;
                    this.id = newModal.id;
                };
                MenuItemDialog.prototype.showErrors = function () {
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
                        templateUrl: '/app/components/menuComponent/menuItemDialog/menuItemDialog.html',
                        directives: [selectComponent_1.SelectComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MenuItemDialog);
                return MenuItemDialog;
            }());
            exports_1("MenuItemDialog", MenuItemDialog);
        }
    }
});
//# sourceMappingURL=menuItemDialog.js.map