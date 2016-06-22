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
 * Created by nick_ on 6/20/2016.
 */
var core_1 = require("@angular/core");
var fMarketApi_1 = require("./fMarketApi");
var FaceBookService = (function () {
    function FaceBookService(fmarketApi) {
        this.fmarketApi = fmarketApi;
    }
    FaceBookService.prototype.login = function () {
        var Headers;
        return this.fmarketApi.post('/connect/facebook', '');
    };
    FaceBookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fMarketApi_1.FMarketApi])
    ], FaceBookService);
    return FaceBookService;
})();
exports.FaceBookService = FaceBookService;
//# sourceMappingURL=faceBookService.js.map