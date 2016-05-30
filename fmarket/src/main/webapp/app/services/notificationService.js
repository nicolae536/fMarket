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
 * Created by nick_ on 4/24/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var fMarketApi_1 = require("./fMarketApi");
var Subject_1 = require("rxjs/Subject");
var applicationConstansts_1 = require("../models/applicationConstansts");
var NotificationService = (function () {
    // public backgroundUpdate:Subject<string> = new Subject();
    function NotificationService(http) {
        this._NotificationController = '/notify';
        this.notificationFlux = new Subject_1.Subject();
        this.firstLoad = new Subject_1.Subject();
        this.api = new fMarketApi_1.FMarketApi(http);
    }
    NotificationService.prototype.getStatus = function () {
        return this.api.get('/admin/demands/newcount');
    };
    NotificationService.prototype.emitNotificationToRootComponent = function (notification) {
        this.notificationFlux.next(notification);
    };
    NotificationService.prototype.emitSuccessNotificationToRootComponent = function (message, timeout) {
        this.notificationFlux.next({
            message: message,
            type: 'success',
            dismisable: true,
            timeout: timeout
        });
    };
    NotificationService.prototype.emitErrorNotificationToRootComponent = function (message, timeout) {
        this.notificationFlux.next({
            message: message,
            type: 'danger',
            dismisable: true,
            timeout: timeout
        });
    };
    NotificationService.prototype.removeLoading = function () {
        this.firstLoad.next(applicationConstansts_1.ApplicationConstants.FIRST_LOAD);
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NotificationService);
    return NotificationService;
})();
exports.NotificationService = NotificationService;
//# sourceMappingURL=notificationService.js.map