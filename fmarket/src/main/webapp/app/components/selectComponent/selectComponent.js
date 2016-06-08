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
var core_1 = require("@angular/core");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var filterPipe_1 = require("./filterPipe");
var SelectComponent = (function () {
    function SelectComponent() {
        this.loadedSelect = new core_1.EventEmitter();
        this._chooseItemValue = { displayName: 'Alege...', boundItem: null };
        this.searchQuery = "";
        this._dropdownStatus = { isopen: false };
    }
    SelectComponent.prototype.ngOnInit = function () {
        this.loadedSelect.emit(this);
        this._selectedItem = this._selectedItem ? this._selectedItem : this._chooseItemValue;
        this._selectedItems = this._selectedItems ? this._selectedItems : [];
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('_selectedItem')) {
        }
    };
    SelectComponent.prototype.ngDoCheck = function () {
        this.computeSelectView();
    };
    SelectComponent.prototype.computeSelectView = function () {
        var multiSelectRefPosition = null;
        var simpleSelectRefPosition = null;
        var documentHeight = Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]);
        if (this.multiSelectRef) {
            multiSelectRefPosition = this.getOffset(this.multiSelectRef.nativeElement);
        }
        if (this.simpleSelectRef) {
            simpleSelectRefPosition = this.getOffset(this.simpleSelectRef.nativeElement);
        }
        if (multiSelectRefPosition) {
            this.dropUp = multiSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
        if (simpleSelectRefPosition) {
            this.dropUp = simpleSelectRefPosition.top + 305 > documentHeight ? true : false;
        }
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
        if (this._selectedItems.indexOf(item) === -1) {
            this._selectedItems.push(item);
        }
    };
    SelectComponent.prototype.getOffset = function (el) {
        var rect = el.getClientRects();
        rect = rect.length > 0 ? rect[0] : rect;
        var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    };
    __decorate([
        core_1.ViewChild('simpleSelectRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], SelectComponent.prototype, "simpleSelectRef", void 0);
    __decorate([
        core_1.ViewChild('multiSelectRef'), 
        __metadata('design:type', core_1.ElementRef)
    ], SelectComponent.prototype, "multiSelectRef", void 0);
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
            template: "\n            <div dropdown [(isOpen)]=\"_dropdownStatus.isopen\" [class.dropUp]=\"dropUp\" [class.dropdown]=\"!dropUp\" class=\"bs-ui-select-2 clearfix\">\n                <span #simpleSelectRef *ngIf=\"!muliSelect\" dropdownToggle [style.pointerEvents]=\"checkItems()? 'none' : 'auto'\" [disabled]=\"checkItems()\" \n                    class=\"btn btn-default btn-secondary form-control ui-select-toggle dropdown-toggle\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                        <span *ngIf=\"!_selectedItem\">Alege...</span>\n                        <span *ngIf=\"_selectedItem && _selectedItem.displayName\">{{_selectedItem.displayName}}</span>\n                        <span [class]=\"getCarretClass()\" style=\"margin-top: 2px;\"></span>\n                        <span style=\"margin-top: 2px;\" class=\"glyphicon glyphicon-remove pull-right simple-dropdown\" *ngIf=\"_selectedItem !== _chooseItemValue\"(click)=\"removeSelection($event)\"></span>\n                </span>\n                \n                <button #multiSelectRef *ngIf=\"muliSelect\" dropdownToggle [style.pointerEvents]=\"checkItems()? 'none' : 'auto'\" [disabled]=\"checkItems()\" \n                    class=\"btn btn-default btn-secondary form-control ui-select-toggle multiselect dropdown-toggle position-relative\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <div class=\"pull-left clearfix remove-right-padding\">\n                        <div *ngIf=\"_selectedItems && _selectedItems.length < 1\" style=\"margin-top: 4px;\">\n                            <span>Alege...</span>\n                        </div>                    \n                        <span class=\"label label-info pull-left\" *ngFor=\"let item of _selectedItems\">{{item.displayName}} <span class=\"remove-selected glyphicon glyphicon-remove\" (click)=\"removeItemFromSelection($event,item)\"></span></span>\n                    </div>\n                    <div class=\"options-container\">\n                        <span [class]=\"getCarretClass()\"></span>\n                        <span *ngIf=\"_selectedItems.length > 0\" class=\"glyphicon glyphicon-remove pull-right\" (click)=\"removeSelection($event)\"></span>\n                    </div>\n                </button>\n                <div dropdownMenu class=\"ui-select2-list-container dropdown-menu\" [class.dropdown-open]=\"_dropdownStatus.isopen\">\n                        <div class=\"ui-select2-search\">\n                            <div *ngIf=\"searchQuery.length > 0\" class=\"ui-select2-search-right-icon\">\n                                <span class=\"glyphicon glyphicon-remove\" (click)=\"removeSearchQuery()\"></span>\n                            </div>\n                            <input class=\"form-control\" [(ngModel)]=\"searchQuery\" placeholder=\"Search..\"/>\n                        </div>\n                        <div class=\"ui-select2-list\">\n                            <div *ngIf=\"!muliSelect\" class=\"ui-select2-list-item\" (click)=\"selectItem(_chooseItemValue)\">{{_chooseItemValue.displayName}}</div>\n                            <div class=\"ui-select2-list-item\" *ngFor=\"let i of items|filterItems:searchQuery\" (click)=\"selectItem(i)\">{{i.displayName}}</div>\n                        </div>\n                </div>\n            </div>\n    ",
            pipes: [filterPipe_1.FilterPipe],
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SelectComponent);
    return SelectComponent;
})();
exports.SelectComponent = SelectComponent;
//This definition will remain here so the component may be exported with his types
var Select2Item = (function () {
    function Select2Item() {
    }
    return Select2Item;
})();
exports.Select2Item = Select2Item;
//# sourceMappingURL=selectComponent.js.map