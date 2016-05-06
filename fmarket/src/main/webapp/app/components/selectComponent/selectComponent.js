System.register(["angular2/core", "ng2-bootstrap/ng2-bootstrap", "./filterPipe"], function(exports_1, context_1) {
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
    var core_1, ng2_bootstrap_1, filterPipe_1;
    var SelectComponent, Select2Item;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (filterPipe_1_1) {
                filterPipe_1 = filterPipe_1_1;
            }],
        execute: function() {
            SelectComponent = (function () {
                function SelectComponent() {
                    this.loadedSelect = new core_1.EventEmitter();
                    this._chooseItemValue = { displayName: 'Choose...', boundItem: null };
                    this.searchQuery = "";
                    this._dropdownStatus = { isopen: false };
                }
                SelectComponent.prototype.ngOnChanges = function (changes) {
                    if (changes.hasOwnProperty('_selectedItem')) {
                        // this._selectedItem=
                        console.log('selected item change', this._selectedItem);
                    }
                };
                SelectComponent.prototype.ngOnInit = function () {
                    this.loadedSelect.emit(this);
                    this._selectedItem = this._selectedItem ? this._selectedItem : this._chooseItemValue;
                    this._selectedItems = this._selectedItems ? this._selectedItems : [];
                };
                Object.defineProperty(SelectComponent.prototype, "selectedItem", {
                    get: function () {
                        return this._selectedItem;
                    },
                    set: function (item) {
                        this._selectedItem = item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectComponent.prototype, "multiselectItems", {
                    get: function () {
                        return this._selectedItems;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectComponent.prototype, "multiselectSelectedItems", {
                    set: function (items) {
                        this._selectedItems = items ? items : [];
                    },
                    enumerable: true,
                    configurable: true
                });
                SelectComponent.prototype.checkItems = function () {
                    return !this.items || this.items.length < 1;
                };
                SelectComponent.prototype.checkItemInDataSource = function (item) {
                    for (var i = 0; i < this.items.length; i++) {
                        var currentItem = this.items[i];
                        if (currentItem.displayName === item.displayName && currentItem.boundItem === item.boundItem) {
                            return true;
                        }
                    }
                    return false;
                };
                SelectComponent.prototype.removeSearchQuery = function () {
                    this.searchQuery = "";
                };
                SelectComponent.prototype.getCarretClass = function () {
                    return this._dropdownStatus.isopen ? "glyphicon glyphicon-chevron-up pull-right ui-select2-subscribeDatePicker-icon" : "glyphicon glyphicon-chevron-down pull-right ui-select2-subscribeDatePicker-icon";
                };
                SelectComponent.prototype.removeSelection = function ($event) {
                    $event.stopPropagation();
                    this._selectedItem = this._chooseItemValue;
                    this._selectedItems = [];
                };
                SelectComponent.prototype.removeItemFromSelection = function ($event, item) {
                    $event.stopPropagation();
                    var index = this._selectedItems.indexOf(item);
                    if (index === -1) {
                        return;
                    }
                    this._selectedItems.splice(index, 1);
                };
                SelectComponent.prototype.selectItem = function (item) {
                    this._selectedItem = item;
                    this._selectedItems.push(item);
                };
                __decorate([
                    core_1.Input('select-items'), 
                    __metadata('design:type', Array)
                ], SelectComponent.prototype, "items", void 0);
                __decorate([
                    core_1.Input('single-item-selected'), 
                    __metadata('design:type', Select2Item)
                ], SelectComponent.prototype, "_selectedItem", void 0);
                __decorate([
                    core_1.Input('selected-items'), 
                    __metadata('design:type', Array)
                ], SelectComponent.prototype, "_selectedItems", void 0);
                __decorate([
                    core_1.Input('multi-select'), 
                    __metadata('design:type', Boolean)
                ], SelectComponent.prototype, "muliSelect", void 0);
                __decorate([
                    core_1.Output('loaded'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SelectComponent.prototype, "loadedSelect", void 0);
                SelectComponent = __decorate([
                    core_1.Component({
                        selector: 'select-component',
                        template: "\n            <div dropdown [(isOpen)]=\"_dropdownStatus.isopen\"class=\"bs-ui-select-2 dropdown clearfix\">\n                <span *ngIf=\"!muliSelect\" dropdownToggle [style.pointerEvents]=\"checkItems()? 'none' : 'auto'\" [disabled]=\"checkItems()\" \n                    class=\"btn btn-default btn-secondary form-control ui-select-toggle dropdown-toggle\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                        <span *ngIf=\"!_selectedItem\">Choose...</span>\n                        <span *ngIf=\"_selectedItem && _selectedItem.displayName\">{{_selectedItem.displayName}}</span>\n                        <span [class]=\"getCarretClass()\"></span>\n                        <span class=\"glyphicon glyphicon-remove pull-right simple-dropdown\" *ngIf=\"_selectedItem !== _chooseItemValue\"(click)=\"removeSelection($event)\"></span>\n                </span>\n                \n                <button *ngIf=\"muliSelect\" dropdownToggle [style.pointerEvents]=\"checkItems()? 'none' : 'auto'\" [disabled]=\"checkItems()\" \n                    class=\"btn btn-default btn-secondary form-control ui-select-toggle multiselect dropdown-toggle\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <div class=\"col-xs-10 col-md-10 clearfix\">\n                        <span *ngIf=\"_selectedItems.length < 1\">Choose...</span>\n                        <span class=\"label label-info pull-left\" *ngFor=\"#item of _selectedItems\">{{item.displayName}} <span (click)=\"removeItemFromSelection($event,item)\">&times;</span></span>\n                    </div>\n                    <div class=\"col-xs-2 col-md-2\">\n                        <span [class]=\"getCarretClass()\"></span>\n                        <span *ngIf=\"_selectedItems.length > 0\" class=\"glyphicon glyphicon-remove pull-right\" (click)=\"removeSelection($event)\"></span>\n                    </div>\n                </button>\n                <div dropdownMenu class=\"ui-select2-list-container dropdown-menu\" >\n                        <div class=\"ui-select2-search\">\n                            <div *ngIf=\"searchQuery.length > 0\" class=\"ui-select2-search-right-icon\">\n                                <span class=\"glyphicon glyphicon-remove\" (click)=\"removeSearchQuery()\"></span>\n                            </div>\n                            <input class=\"form-control\" [(ngModel)]=\"searchQuery\" placeholder=\"Search..\"/>\n                        </div>\n                        <div class=\"ui-select2-list\">\n                            <div *ngIf=\"!muliSelect\" class=\"ui-select2-list-item\" (click)=\"selectItem(_chooseItemValue)\">{{_chooseItemValue.displayName}}</div>\n                            <div class=\"ui-select2-list-item\" *ngFor=\"#i of items|filterItems:searchQuery\" (click)=\"selectItem(i)\">{{i.displayName}}</div>\n                        </div>\n                </div>\n            </div>\n    ",
                        styles: ["\n        .bs-ui-select-2{\n            border-radius: 5px;\n            position:relative;\n            margin-bottom:10px;\n        }\n\n        .ui-select-toggle{\n            text-align: left;\n        }\n        \n        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect{\n            padding-top: 7px;        \n            height: auto;\n            min-height: 34px;\n        }\n        \n        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.dropdown-toggle .glyphicon.glyphicon-remove.pull-right{\n            margin-right: 7px;\n        }\n        \n        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .label.label-info{\n            margin-left: 5px;\n            top: 2px;\n            margin-bottom: 4px;\n        }\n        \n        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .col-xs-10,.col-md-10{\n            padding-left: 0px;\n        }\n        \n        .bs-ui-select-2 .btn.btn-default.btn-secondary.form-control.ui-select-toggle.multiselect .col-xs-2,.col-md-2{\n            padding-right: 0px;\n        }\n        \n        .bs-ui-select-2.dropdown .btn-default.active, .btn-default:active, .open>.dropdown-toggle.btn-default{\n            background-color: white;\n        }\n        \n        .ui-select2-list-container{            \n            width:100%;\n            padding-left: 5px;\n            padding-right: 5px;\n        }\n\n        .ui-select2-list-container .ui-select2-list{\n            max-height: 200px;\n            overflow: auto;\n        }\n\n        .ui-select2-list-item{\n            position: relative;\n            display: block;\n            padding: 10px 15px;\n            margin-bottom: -1px;\n            background-color: #fff;\n        }\n\n        .ui-select2-list-item:hover{\n            background-color: lightgray;\n            cursor: pointer;\n        }        \n\n        .ui-select2-search{\n            padding: 3px 0px 5px 0px;\n            border-bottom:1px solid #ccc;\n            position: relative;\n        }\n\n        .ui-select2-search-right-icon{\n            position: absolute;\n            right: 10px;\n            top: 12px;\n            cursor: pointer;\n        }\n    "],
                        pipes: [filterPipe_1.FilterPipe],
                        directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SelectComponent);
                return SelectComponent;
            }());
            exports_1("SelectComponent", SelectComponent);
            //This definition will remain here so the component may be exported with his types
            Select2Item = (function () {
                function Select2Item() {
                }
                return Select2Item;
            }());
            exports_1("Select2Item", Select2Item);
        }
    }
});
//# sourceMappingURL=selectComponent.js.map