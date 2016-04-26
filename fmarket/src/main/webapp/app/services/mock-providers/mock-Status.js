System.register(["../../models/accountStatus"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accountStatus_1;
    var STATUS;
    return {
        setters:[
            function (accountStatus_1_1) {
                accountStatus_1 = accountStatus_1_1;
            }],
        execute: function() {
            exports_1("STATUS", STATUS = [
                { status: null, displayName: "Chose..." },
                { status: accountStatus_1.AccountStatus.AUTO, displayName: "AUTO" },
                { status: accountStatus_1.AccountStatus.ACTIVE, displayName: "ACTIVE" },
                { status: accountStatus_1.AccountStatus.DISABLED, displayName: "DISABLED" },
                { status: accountStatus_1.AccountStatus.DISABLED, displayName: "PENDING" }]);
        }
    }
});
//# sourceMappingURL=mock-Status.js.map