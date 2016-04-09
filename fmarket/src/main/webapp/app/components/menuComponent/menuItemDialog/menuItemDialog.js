System.register(['angular2/core', '../../selectComponent/selectComponent'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                    this.cancelLabel = 'Cancel';
                    this.value = {};
                    this._disabledV = '0';
                    this.disabled = false;
                }
                MenuItemDialog.prototype.ngOnInit = function () {
                    this.modalLoaded.emit(this);
                    this.selectItems = [
                        { displayName: 'Amsterdam', boundItem: {} },
                        { displayName: 'Antwerp', boundItem: {} },
                        { displayName: 'Athens', boundItem: {} },
                        { displayName: 'Barcelona', boundItem: {} },
                        { displayName: 'Berlin', boundItem: {} },
                        { displayName: 'Antwerp', boundItem: {} },
                        { displayName: 'Athens', boundItem: {} },
                        { displayName: 'Barcelona', boundItem: {} },
                        { displayName: 'Berlin', boundItem: {} },
                        { displayName: 'Antwerp', boundItem: {} },
                        { displayName: 'Athens', boundItem: {} },
                        { displayName: 'Barcelona', boundItem: {} },
                        { displayName: 'Berlin', boundItem: {} },
                        { displayName: 'Antwerp', boundItem: {} },
                        { displayName: 'Athens', boundItem: {} },
                        { displayName: 'Barcelona', boundItem: {} },
                        { displayName: 'Berlin', boundItem: {} },
                        { displayName: 'Antwerp', boundItem: {} },
                        { displayName: 'Athens', boundItem: {} },
                        { displayName: 'Barcelona', boundItem: {} },
                        { displayName: 'Berlin', boundItem: {} }];
                    this.selectedItem = this.selectItems[0];
                };
                MenuItemDialog.prototype.show = function (newModal) {
                    var _this = this;
                    this.fatchModel(newModal);
                    this.showModal = true;
                    return new Promise(function (resolve, reject) {
                        _this.deferendModal = { resolve: resolve, reject: reject };
                    });
                };
                MenuItemDialog.prototype.update = function (newModal) {
                    var _this = this;
                    this.fatchUpdateModel(newModal);
                    this.showModal = true;
                    return new Promise(function (resolve, reject) {
                        _this.deferendModal.resolve = resolve;
                        _this.deferendModal.reject = reject;
                    });
                };
                MenuItemDialog.prototype.hide = function () {
                    this.clearModal();
                    this.showModal = false;
                    this.deferendModal.reject();
                };
                MenuItemDialog.prototype.positiveAction = function () {
                    switch (this.operationType) {
                        case 'new':
                            this.deferendModal.resolve({ parentId: this.parentId, name: this.name, orderNr: this.orderNr, domainId: this.domainId });
                            break;
                        case 'update':
                            this.deferendModal.resolve({ id: this.id, newName: this.name, orderNr: this.orderNr });
                            break;
                    }
                };
                MenuItemDialog.prototype.cancelAction = function () {
                    console.log('sending close event');
                    this.showModal = false;
                    this.deferendModal.reject();
                };
                MenuItemDialog.prototype.stopPropagation = function ($event) {
                    $event.stopPropagation();
                };
                MenuItemDialog.prototype.clearModal = function () {
                    this.parentId = -1;
                    this.id = "";
                    this.name = "";
                    this.orderNr = "";
                    this.domainId = -1;
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
                    this.id = newModal.menuModel.id;
                    this.name = newModal.menuModel.newName;
                    this.orderNr = newModal.menuModel.orderNr;
                    this.positiveLabel = newModal.positiveLabel;
                    this.operationType = newModal.operationType;
                };
                Object.defineProperty(MenuItemDialog.prototype, "disabledV", {
                    get: function () {
                        return this._disabledV;
                    },
                    set: function (value) {
                        this._disabledV = value;
                        this.disabled = this._disabledV === '1';
                    },
                    enumerable: true,
                    configurable: true
                });
                MenuItemDialog.prototype.selected = function (value) {
                    console.log('Selected value is: ', value);
                };
                MenuItemDialog.prototype.removed = function (value) {
                    console.log('Removed value is: ', value);
                };
                MenuItemDialog.prototype.typed = function (value) {
                    console.log('New search input: ', value);
                };
                MenuItemDialog.prototype.refreshValue = function (value) {
                    this.value = value;
                };
                __decorate([
                    core_1.Output('modal-loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MenuItemDialog.prototype, "modalLoaded");
                MenuItemDialog = __decorate([
                    core_1.Component({
                        selector: 'menu-item-dialog',
                        templateUrl: '/app/components/menuComponent/menuItemDialog/menuItemDialog.html',
                        directives: [selectComponent_1.SelectComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MenuItemDialog);
                return MenuItemDialog;
            })();
            exports_1("MenuItemDialog", MenuItemDialog);
        }
    }
});
//# sourceMappingURL=menuItemDialog.js.map