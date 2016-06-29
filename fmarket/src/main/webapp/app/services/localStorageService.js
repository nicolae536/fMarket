"use strict";
var Subject_1 = require("rxjs/Subject");
/**
 * Created by nick_ on 5/5/2016.
 */
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.storageStateChange = new Subject_1.Subject();
    }
    LocalStorageService.prototype.notifyObservers = function (key) {
        this.storageStateChange.next({ keyChanged: key, newValue: this.getItem(key) });
    };
    LocalStorageService.prototype.setItem = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        this.notifyObservers(key);
    };
    LocalStorageService.prototype.getItem = function (key) {
        var item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        return JSON.parse(item);
    };
    LocalStorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
        this.notifyObservers(key);
    };
    LocalStorageService.prototype.removeItemWithoutNotification = function (key) {
        localStorage.removeItem(key);
    };
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorageService.js.map