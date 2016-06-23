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
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (value, args) {
        if (!args || args.length < 1) {
            return value;
        }
        else if (value) {
            args = args.toLowerCase();
            return value.filter(function (item) {
                for (var key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].toLowerCase().indexOf(args) !== -1)) {
                        return true;
                    }
                }
            });
        }
    };
    FilterPipe = __decorate([
        core_1.Pipe({
            name: 'filterItems',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=filterPipe.js.map