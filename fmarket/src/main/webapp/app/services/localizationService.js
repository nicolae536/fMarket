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
 * Created by NicolaeB on 5/27/2016.
 */
var core_1 = require('@angular/core');
var fMarketApi_1 = require("./fMarketApi");
var _ = require('underscore');
var LocalizationService = (function () {
    function LocalizationService(api) {
        this.api = api;
    }
    LocalizationService.prototype.getCityList = function () {
        return this.api.get('/cities');
    };
    LocalizationService.prototype.mapNameToSelect2Item = function (array) {
        return _.map(array, function (item) {
            return {
                displayName: item['name'],
                boundItem: item
            };
        });
    };
    LocalizationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], LocalizationService);
    return LocalizationService;
})();
exports.LocalizationService = LocalizationService;
//# sourceMappingURL=localizationService.js.map