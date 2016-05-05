System.register(["rxjs/Subject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var LocalStorageService;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            /**
             * Created by nick_ on 5/5/2016.
             */
            LocalStorageService = (function () {
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
                    return JSON.parse(localStorage.getItem(key));
                };
                LocalStorageService.prototype.removeItem = function (key) {
                    localStorage.removeItem(key);
                    this.notifyObservers(key);
                };
                return LocalStorageService;
            }());
            exports_1("LocalStorageService", LocalStorageService);
        }
    }
});
//# sourceMappingURL=localStorageService.js.map