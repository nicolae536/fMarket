System.register(['angular2/core', './filterPipe'], function(exports_1) {
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
    var core_1, filterPipe_1;
    var SelectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (filterPipe_1_1) {
                filterPipe_1 = filterPipe_1_1;
            }],
        execute: function() {
            SelectComponent = (function () {
                function SelectComponent() {
                    this.selectedItem = this.chooseItemValue;
                    this.chooseItemValue = { displayName: 'Choose..', id: -1 };
                    this.searchQuery = "";
                    this.dropdownState = false;
                }
                SelectComponent.prototype.ngOnInit = function () {
                };
                SelectComponent.prototype.toggleSelectDropdown = function () {
                    this.dropdownState = !this.dropdownState;
                };
                SelectComponent.prototype.removeSearchQuery = function () {
                    this.searchQuery = "";
                };
                SelectComponent.prototype.getCarretClass = function () {
                    return this.dropdownState ? "glyphicon glyphicon-chevron-up pull-right ui-select2-dropdown-icon" : "glyphicon glyphicon-chevron-down pull-right ui-select2-dropdown-icon";
                };
                SelectComponent.prototype.selectItem = function (item) {
                    this.selectedItem = item;
                    this.toggleSelectDropdown();
                };
                __decorate([
                    core_1.Input('select-items'), 
                    __metadata('design:type', Array)
                ], SelectComponent.prototype, "items");
                __decorate([
                    core_1.Input('selected-item'), 
                    __metadata('design:type', Object)
                ], SelectComponent.prototype, "selectedItem");
                SelectComponent = __decorate([
                    core_1.Component({
                        selector: 'select-component',
                        template: "\n            <div class=\"bs-ui-select-2\">\n                <span class=\"btn btn-default btn-secondary form-control ui-select-toggle\" (click)=\"toggleSelectDropdown()\">\n                    <span>{{selectedItem.displayName}}</span>\n                    <span [class]=\"getCarretClass()\"></span>\n                </span>\n                <div class=\"list-group ui-select2-list-container\" [style.display]=\"dropdownState ? 'block' : 'none'\">\n                <div class=\"ui-select2-search\">\n                    <div *ngIf=\"searchQuery.length > 0\" class=\"ui-select2-search-right-icon\">\n                        <span class=\"glyphicon glyphicon-remove\" (click)=\"removeSearchQuery()\"></span>\n                    </div>\n                    <input class=\"form-control\" [(ngModel)]=\"searchQuery\" placeholder=\"Search..\"/>\n                </div>\n                <div class=\"ui-select2-list\">\n                    <div class=\"ui-select2-list-item\" (click)=\"selectItem(chooseItemValue)\">{{chooseItemValue.displayName}}</div>\n                    <div class=\"ui-select2-list-item\" *ngFor=\"#i of items|filterItems:searchQuery\" (click)=\"selectItem(i)\">{{i.displayName}}</div>\n                </div>\n            </div>\n        </div>\n    ",
                        styles: ["\n        .bs-ui-select-2{\n            border-radius: 5px;\n            position:relative;\n            margin-bottom:10px;\n        }\n\n        .ui-select-toggle{\n            text-align: left;\n        }\n\n        .ui-select2-list-container{\n            padding: 0 5px 0 5px;\n            padding-bottom: 6px;\n            position:absolute;\n            border:1px solid #ccc;\n            width:100%;\n            background-color:white;\n            top:32px;\n        }\n\n        .ui-select2-list-container .ui-select2-list{\n            max-height: 200px;\n            overflow: auto;\n        }\n\n.ui-select2-list-item{\n    position: relative;\n    display: block;\n    padding: 10px 15px;\n    margin-bottom: -1px;\n    background-color: #fff;\n}\n\n.ui-select2-list-item:hover{\n    background-color: lightgray;\n    cursor: pointer;\n}\n\n.ui-select2-dropdown-icon{\n    padding-top: 2px;\n}\n\n.ui-select2-search{\n    padding: 3px 0px 5px 0px;\n    border-bottom:1px solid #ccc;\n    position: relative;\n}\n\n.ui-select2-search-right-icon{\n    position: absolute;\n    right: 10px;\n    top: 12px;\n    cursor: pointer;\n}\n        "],
                        //encapsulation: ViewEncapsulation.None,
                        pipes: [filterPipe_1.FilterPipe]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SelectComponent);
                return SelectComponent;
            })();
            exports_1("SelectComponent", SelectComponent);
        }
    }
});
//# sourceMappingURL=selectComponent.js.map