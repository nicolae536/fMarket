/**
 * Created by NicolaeB on 4/26/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccountStatus;
    return {
        setters:[],
        execute: function() {
            AccountStatus = (function () {
                function AccountStatus() {
                }
                AccountStatus.ACTIVE = "ACTIVE";
                AccountStatus.PENDING = "PENDING";
                AccountStatus.DISABLED = "DISABLED";
                AccountStatus.AUTO = "AUTO";
                return AccountStatus;
            }());
            exports_1("AccountStatus", AccountStatus);
        }
    }
});
//# sourceMappingURL=accountStatus.js.map